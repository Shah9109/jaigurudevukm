import mysql from 'mysql2/promise';

let pool = null;
let isConnected = false;

/**
 * Get MySQL connection configuration from environment variables
 */
export const getDbConfig = () => ({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  database: process.env.DB_NAME || 'jaigurudev_db',
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  dateStrings: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

/**
 * Initialize centralized MySQL connection pool
 */
export const connectDB = async () => {
  if (pool && isConnected) {
    return pool;
  }

  const config = getDbConfig();

  try {
    pool = mysql.createPool(config);

    // Verify connectivity with a lightweight ping
    const [rows] = await pool.query('SELECT 1 + 1 AS healthCheck');
    if (rows && rows.length > 0) {
      isConnected = true;
      console.log(`[Database] MySQL Connected: ${config.host}:${config.port}/${config.database}`);
    }

    return pool;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database Info] MySQL connection not available at ${config.host}:${config.port}/${config.database}. (${error.message}). Running with offline/in-memory fallback.`);
    return null;
  }
};

/**
 * Returns the active MySQL pool instance
 */
export const getPool = () => pool;

/**
 * Check if database is currently connected
 */
export const isDbConnected = () => isConnected;

/**
 * Execute parameterized query using the pool
 * @param {string} sql - Prepared SQL query statement
 * @param {Array} params - Parameter values for placeholders (?)
 */
export const query = async (sql, params = []) => {
  if (!pool) {
    await connectDB();
  }
  if (!pool || !isConnected) {
    throw new Error('Database is not connected');
  }
  const [results] = await pool.query(sql, params);
  return results;
};

/**
 * Execute a transaction block with automatic COMMIT / ROLLBACK
 * @param {Function} callback - Async function receiving the transactional connection
 */
export const transaction = async (callback) => {
  if (!pool) {
    await connectDB();
  }
  if (!pool || !isConnected) {
    throw new Error('Database is not connected');
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Gracefully close the connection pool
 */
export const closeDB = async () => {
  if (pool) {
    try {
      await pool.end();
    } catch (e) {}
    pool = null;
    isConnected = false;
  }
};
