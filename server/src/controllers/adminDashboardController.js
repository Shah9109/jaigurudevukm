import {
  Post,
  Notice,
  Event,
  Satsang,
  Video,
  Audio,
  Gallery,
  Document,
  Adhesh,
  FAQ,
  ChatbotKnowledge,
  ContactEnquiry,
  ActivityLog,
} from '../models/index.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Get Admin Dashboard Overview Statistics
 * GET /api/admin/dashboard-stats
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      postsCount,
      noticesCount,
      eventsCount,
      satsangsCount,
      videosCount,
      audioCount,
      galleryCount,
      documentsCount,
      adheshCount,
      faqCount,
      chatbotKnowledgeCount,
      enquiriesCount,
      recentLogs,
      recentEnquiries,
    ] = await Promise.all([
      Post.countDocuments(),
      Notice.countDocuments({ status: 'active' }),
      Event.countDocuments({ status: 'upcoming' }),
      Satsang.countDocuments({ status: 'upcoming' }),
      Video.countDocuments(),
      Audio.countDocuments(),
      Gallery.countDocuments(),
      Document.countDocuments(),
      Adhesh.countDocuments(),
      FAQ.countDocuments(),
      ChatbotKnowledge.countDocuments(),
      ContactEnquiry.countDocuments({ isRead: false }),
      ActivityLog.find().sort({ createdAt: -1 }).limit(8).lean(),
      ContactEnquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return sendSuccess(res, 'Admin dashboard statistics retrieved', {
      counts: {
        posts: postsCount,
        notices: noticesCount,
        events: eventsCount,
        satsangs: satsangsCount,
        videos: videosCount,
        audio: audioCount,
        gallery: galleryCount,
        documents: documentsCount,
        adhesh: adheshCount,
        faq: faqCount,
        chatbotKnowledge: chatbotKnowledgeCount,
        unreadEnquiries: enquiriesCount,
      },
      recentLogs: recentLogs || [],
      recentEnquiries: recentEnquiries || [],
    });
  } catch (error) {
    next(error);
  }
};
