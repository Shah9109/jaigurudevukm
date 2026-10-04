import { BaseRepository } from './BaseRepository.js';

class ContactEnquiryRepository extends BaseRepository {
  constructor() {
    super('contact_enquiries', {}, []);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isRead !== undefined) doc.isRead = Boolean(doc.isRead);
    return doc;
  }
}

export const ContactEnquiry = new ContactEnquiryRepository();
