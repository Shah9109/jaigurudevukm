import crypto from 'crypto';
import { query, isDbConnected } from '../config/db.js';

/**
 * Generate a 24-character hexadecimal ObjectId-compatible string
 */
export const generateId = () => crypto.randomBytes(12).toString('hex');

/**
 * Convert camelCase to snake_case
 */
export const toSnakeCase = (str) =>
  str.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * Convert snake_case to camelCase
 */
export const toCamelCase = (str) =>
  str.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase());

/**
 * Transform database row into client-friendly object:
 * Sets both `_id` and `id`, and adds camelCase aliases for all snake_case columns.
 */
export const mapRowToDoc = (row) => {
  if (!row) return null;
  const doc = { ...row };

  const idVal = row.id || row._id || '';
  doc.id = idVal;
  doc._id = idVal;

  for (const [key, value] of Object.entries(row)) {
    const camel = toCamelCase(key);
    if (!(camel in doc)) {
      doc[camel] = value;
    }
  }

  // Common conversions
  if ('created_at' in row && !('createdAt' in doc)) doc.createdAt = row.created_at;
  if ('updated_at' in row && !('updatedAt' in doc)) doc.updatedAt = row.updated_at;

  return doc;
};

/**
 * Build WHERE clause from MongoDB-style query filters
 */
export const buildWhereClause = (filter = {}) => {
  const conditions = [];
  const params = [];

  for (const [key, val] of Object.entries(filter)) {
    if (val === undefined || val === null) continue;

    if (key === '_id' || key === 'id') {
      conditions.push('`id` = ?');
      params.push(val);
      continue;
    }

    if (key === '$or' && Array.isArray(val)) {
      const orClauses = [];
      for (const item of val) {
        for (const [subKey, subVal] of Object.entries(item)) {
          const colName = toSnakeCase(subKey);
          if (subVal instanceof RegExp) {
            orClauses.push(`\`${colName}\` LIKE ?`);
            params.push(`%${subVal.source.replace(/\\/g, '')}%`);
          } else if (typeof subVal === 'string') {
            orClauses.push(`\`${colName}\` LIKE ?`);
            params.push(`%${subVal}%`);
          } else {
            orClauses.push(`\`${colName}\` = ?`);
            params.push(subVal);
          }
        }
      }
      if (orClauses.length > 0) {
        conditions.push(`(${orClauses.join(' OR ')})`);
      }
      continue;
    }

    const col = toSnakeCase(key);

    if (val instanceof RegExp) {
      conditions.push(`\`${col}\` LIKE ?`);
      params.push(`%${val.source.replace(/\\/g, '')}%`);
    } else if (typeof val === 'object' && val !== null) {
      if (val.$regex) {
        conditions.push(`\`${col}\` LIKE ?`);
        params.push(`%${val.$regex}%`);
      } else if (val.$in && Array.isArray(val.$in) && val.$in.length > 0) {
        const placeholders = val.$in.map(() => '?').join(', ');
        conditions.push(`\`${col}\` IN (${placeholders})`);
        params.push(...val.$in);
      } else if (val.$gte) {
        conditions.push(`\`${col}\` >= ?`);
        params.push(val.$gte);
      } else if (val.$lte) {
        conditions.push(`\`${col}\` <= ?`);
        params.push(val.$lte);
      }
    } else if (typeof val === 'boolean') {
      conditions.push(`\`${col}\` = ?`);
      params.push(val ? 1 : 0);
    } else {
      conditions.push(`\`${col}\` = ?`);
      params.push(val);
    }
  }

  const whereSql = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  return { whereSql, params };
};

/**
 * Build ORDER BY clause from sort object
 */
export const buildOrderByClause = (sortObj) => {
  if (!sortObj) return '';
  const parts = [];

  for (const [key, dir] of Object.entries(sortObj)) {
    const col = toSnakeCase(key);
    const direction = dir === 1 || dir === 'asc' || dir === 'ASC' ? 'ASC' : 'DESC';
    parts.push(`\`${col}\` ${direction}`);
  }

  return parts.length > 0 ? `ORDER BY ${parts.join(', ')}` : '';
};

/**
 * Fluent Query Builder to match Mongoose .find() chaining:
 * Supports .sort(), .skip(), .limit(), .select(), .lean()
 */
export class QueryBuilder {
  constructor(model, filter, isSingle = false) {
    this.model = model;
    this.filter = filter;
    this.isSingle = isSingle;
    this._sort = null;
    this._skip = null;
    this._limit = isSingle ? 1 : null;
    this._fields = '*';
    this._selectedFields = null;
  }

  sort(sortObj) {
    this._sort = sortObj;
    return this;
  }

  skip(n) {
    this._skip = Number(n);
    return this;
  }

  limit(n) {
    this._limit = Number(n);
    return this;
  }

  select(fields) {
    if (typeof fields === 'string') {
      this._selectedFields = fields.split(/\s+/).filter(Boolean);
    }
    return this;
  }

  lean() {
    return this;
  }

  async execute() {
    return this.model._executeQuery(this);
  }

  then(resolve, reject) {
    return this.execute().then(resolve, reject);
  }

  catch(reject) {
    return this.execute().catch(reject);
  }
}

/**
 * Base Repository for MySQL Models
 */
export class BaseRepository {
  constructor(tableName, fieldMappings = {}, fallbackItems = []) {
    this.tableName = tableName;
    this.fieldMappings = fieldMappings;
    this.fallbackItems = fallbackItems;
  }

  async _executeQuery(qb) {
    if (!isDbConnected()) {
      return this._executeFallback(qb);
    }

    try {
      const { whereSql, params } = buildWhereClause(qb.filter);
      const orderSql = buildOrderByClause(qb._sort);

      let limitSql = '';
      if (qb._limit !== null && qb._limit !== undefined) {
        limitSql = `LIMIT ${Number(qb._limit)}`;
        if (qb._skip !== null && qb._skip !== undefined) {
          limitSql += ` OFFSET ${Number(qb._skip)}`;
        }
      } else if (qb._skip !== null && qb._skip !== undefined) {
        limitSql = `LIMIT 18446744073709551615 OFFSET ${Number(qb._skip)}`;
      }

      const sql = `SELECT * FROM \`${this.tableName}\` ${whereSql} ${orderSql} ${limitSql}`.trim();
      const rows = await query(sql, params);

      if (qb.isSingle) {
        if (!rows || rows.length === 0) return null;
        return this.hydrate(rows[0]);
      }

      return (rows || []).map((r) => this.hydrate(r));
    } catch (err) {
      console.warn(`[BaseRepository:${this.tableName}] Query failed, using fallback:`, err.message);
      return this._executeFallback(qb);
    }
  }

  _executeFallback(qb) {
    let items = [...this.fallbackItems];

    // Filter
    if (qb.filter && Object.keys(qb.filter).length > 0) {
      items = items.filter((item) => {
        for (const [k, v] of Object.entries(qb.filter)) {
          if (k === '_id' || k === 'id') {
            if ((item._id || item.id) !== v) return false;
          } else if (v instanceof RegExp) {
            const val = item[k] || '';
            if (!v.test(val)) return false;
          } else if (typeof v === 'boolean') {
            if (Boolean(item[k]) !== v) return false;
          } else if (typeof v === 'string') {
            if (item[k] !== v) return false;
          }
        }
        return true;
      });
    }

    if (qb._sort) {
      const [sortKey, sortDir] = Object.entries(qb._sort)[0] || [];
      if (sortKey) {
        items.sort((a, b) => {
          const valA = a[sortKey] || '';
          const valB = b[sortKey] || '';
          const comp = valA > valB ? 1 : valA < valB ? -1 : 0;
          return sortDir === 1 ? comp : -comp;
        });
      }
    }

    if (qb._skip) {
      items = items.slice(qb._skip);
    }
    if (qb._limit) {
      items = items.slice(0, qb._limit);
    }

    if (qb.isSingle) {
      return items[0] ? this.hydrate(items[0]) : null;
    }
    return items.map((i) => this.hydrate(i));
  }

  hydrate(row) {
    const doc = mapRowToDoc(row);
    // Attach .save() method
    doc.save = async () => {
      return this.findByIdAndUpdate(doc.id, doc);
    };
    return doc;
  }

  find(filter = {}) {
    return new QueryBuilder(this, filter, false);
  }

  findOne(filter = {}) {
    return new QueryBuilder(this, filter, true);
  }

  async findById(id) {
    if (!id) return null;
    return this.findOne({ id });
  }

  async countDocuments(filter = {}) {
    if (!isDbConnected()) {
      const res = await this.find(filter);
      return res ? res.length : 0;
    }

    try {
      const { whereSql, params } = buildWhereClause(filter);
      const sql = `SELECT COUNT(*) AS total FROM \`${this.tableName}\` ${whereSql}`.trim();
      const rows = await query(sql, params);
      return rows && rows[0] ? Number(rows[0].total) : 0;
    } catch (e) {
      console.warn(`[BaseRepository:${this.tableName}] Count fallback:`, e.message);
      const res = await this.find(filter);
      return res ? res.length : 0;
    }
  }

  async create(data) {
    const id = data.id || data._id || generateId();
    const record = { ...data, id };
    delete record._id;

    if (!isDbConnected()) {
      const doc = this.hydrate(record);
      this.fallbackItems.unshift(doc);
      return doc;
    }

    const columns = [];
    const placeholders = [];
    const values = [];

    for (const [key, val] of Object.entries(record)) {
      if (typeof val === 'function') continue;
      const col = toSnakeCase(key);

      columns.push(`\`${col}\``);
      placeholders.push('?');

      if (typeof val === 'object' && val !== null && !(val instanceof Date)) {
        values.push(JSON.stringify(val));
      } else if (typeof val === 'boolean') {
        values.push(val ? 1 : 0);
      } else {
        values.push(val);
      }
    }

    const sql = `INSERT INTO \`${this.tableName}\` (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`;
    await query(sql, values);

    return this.findById(id);
  }

  async insertMany(items = []) {
    const created = [];
    for (const item of items) {
      created.push(await this.create(item));
    }
    return created;
  }

  async findByIdAndUpdate(id, updateData, options = {}) {
    if (!id) return null;

    if (!isDbConnected()) {
      const idx = this.fallbackItems.findIndex((i) => i.id === id || i._id === id);
      if (idx !== -1) {
        this.fallbackItems[idx] = this.hydrate({ ...this.fallbackItems[idx], ...updateData });
        return this.fallbackItems[idx];
      }
      return null;
    }

    const setClauses = [];
    const values = [];

    for (const [key, val] of Object.entries(updateData)) {
      if (key === 'id' || key === '_id' || typeof val === 'function') continue;
      const col = toSnakeCase(key);

      setClauses.push(`\`${col}\` = ?`);
      if (typeof val === 'object' && val !== null && !(val instanceof Date)) {
        values.push(JSON.stringify(val));
      } else if (typeof val === 'boolean') {
        values.push(val ? 1 : 0);
      } else {
        values.push(val);
      }
    }

    if (setClauses.length > 0) {
      values.push(id);
      const sql = `UPDATE \`${this.tableName}\` SET ${setClauses.join(', ')} WHERE \`id\` = ?`;
      await query(sql, values);
    }

    return this.findById(id);
  }

  async findByIdAndDelete(id) {
    if (!id) return null;

    const existing = await this.findById(id);
    if (!existing) return null;

    if (!isDbConnected()) {
      this.fallbackItems = this.fallbackItems.filter((i) => i.id !== id && i._id !== id);
      return existing;
    }

    await query(`DELETE FROM \`${this.tableName}\` WHERE \`id\` = ?`, [id]);
    return existing;
  }

  async deleteOne(filter) {
    const item = await this.findOne(filter);
    if (item && item.id) {
      return this.findByIdAndDelete(item.id);
    }
    return null;
  }
}
