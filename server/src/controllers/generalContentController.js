import { Document } from '../models/Document.js';
import { FAQ } from '../models/FAQ.js';
import { ContactEnquiry } from '../models/ContactEnquiry.js';
import { Post } from '../models/Post.js';
import { Satsang } from '../models/Satsang.js';
import { Notice } from '../models/Notice.js';
import { Event } from '../models/Event.js';
import { Video } from '../models/Video.js';
import { Adhesh } from '../models/Adhesh.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

// Documents / Digital Library
export const getDocuments = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 15 } = req.query;
    const filter = { isDownloadable: true };
    if (category) filter.category = category;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Document.find(filter).sort({ publishDate: -1 }).skip(skip).limit(Number(limit)).lean(),
      Document.countDocuments(filter),
    ]);

    return sendPaginated(res, 'Documents retrieved successfully', items, page, limit, total);
  } catch (error) {
    next(error);
  }
};

// FAQs
export const getFAQs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;

    const items = await FAQ.find(filter).sort({ order: 1, createdAt: 1 }).lean();
    return sendSuccess(res, 'FAQs retrieved successfully', items);
  } catch (error) {
    next(error);
  }
};

// Contact Form Enquiry
export const submitContactEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !message) {
      return sendError(res, 'Please provide both your name and message.', 400);
    }

    const enquiry = await ContactEnquiry.create({
      name: name.trim(),
      email: email ? email.trim() : '',
      phone: phone ? phone.trim() : '',
      subject: subject ? subject.trim() : 'General Enquiry',
      message: message.trim(),
      ipAddress: req.ip || req.connection?.remoteAddress,
    });

    return sendSuccess(
      res,
      'Your message has been submitted to the Ashram office. Jai Gurudev!',
      { id: enquiry._id },
      201
    );
  } catch (error) {
    next(error);
  }
};

// Global Multi-Domain Search
export const globalSearch = async (req, res, next) => {
  try {
    const { q, category } = req.query;

    if (!q || !q.trim()) {
      return sendSuccess(res, 'Empty search query', {
        satsang: [],
        notices: [],
        events: [],
        adhesh: [],
        videos: [],
        documents: [],
        faqs: [],
      });
    }

    const regex = new RegExp(q.trim(), 'i');

    const [satsang, notices, events, adhesh, videos, documents, faqs] = await Promise.all([
      Satsang.find({ $or: [{ title: regex }, { description: regex }, { location: regex }, { speaker: regex }, { city: regex }, { address: regex }] }).limit(6).lean(),
      Notice.find({ $or: [{ title: regex }, { content: regex }, { category: regex }] }).limit(6).lean(),
      Event.find({ $or: [{ title: regex }, { description: regex }, { location: regex }, { city: regex }, { organizer: regex }] }).limit(6).lean(),
      Adhesh.find({ $or: [{ title: regex }, { description: regex }, { referenceNumber: regex }, { signatory: regex }] }).limit(6).lean(),
      Video.find({ $or: [{ title: regex }, { description: regex }, { speaker: regex }, { category: regex }] }).limit(6).lean(),
      Document.find({ $or: [{ title: regex }, { description: regex }, { referenceNumber: regex }, { category: regex }] }).limit(6).lean(),
      FAQ.find({ $or: [{ question: regex }, { answer: regex }, { category: regex }] }).limit(6).lean(),
    ]);

    const totalMatches =
      satsang.length +
      notices.length +
      events.length +
      adhesh.length +
      videos.length +
      documents.length +
      faqs.length;

    return sendSuccess(res, `Found ${totalMatches} results for "${q}"`, {
      query: q,
      totalMatches,
      results: {
        satsang,
        notices,
        events,
        adhesh,
        videos,
        documents,
        faqs,
      },
    });
  } catch (error) {
    next(error);
  }
};
