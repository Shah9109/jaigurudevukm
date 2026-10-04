import bcrypt from 'bcryptjs';
import { BaseRepository, mapRowToDoc } from './BaseRepository.js';

class AdminRepository extends BaseRepository {
  constructor() {
    super('admins', {}, []);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (doc) {
      doc.comparePassword = async function (candidatePassword) {
        if (!candidatePassword || !this.password) return false;
        return bcrypt.compare(candidatePassword, this.password);
      };
    }
    return doc;
  }

  async create(data) {
    const adminData = { ...data };
    if (adminData.password && !adminData.password.startsWith('$2')) {
      const salt = await bcrypt.genSalt(10);
      adminData.password = await bcrypt.hash(adminData.password, salt);
    }
    return super.create(adminData);
  }

  async findByIdAndUpdate(id, updateData, options = {}) {
    const data = { ...updateData };
    if (data.password && !data.password.startsWith('$2')) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    return super.findByIdAndUpdate(id, data, options);
  }
}

export const Admin = new AdminRepository();
