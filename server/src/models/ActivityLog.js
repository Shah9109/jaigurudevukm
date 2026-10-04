import { BaseRepository } from './BaseRepository.js';

class ActivityLogRepository extends BaseRepository {
  constructor() {
    super('activity_logs', {}, []);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    return doc;
  }
}

export const ActivityLog = new ActivityLogRepository();
