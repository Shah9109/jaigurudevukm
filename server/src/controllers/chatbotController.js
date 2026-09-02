import {
  ChatbotKnowledge,
  Satsang,
  Notice,
  Event,
  FAQ,
  SiteSettings,
} from '../models/index.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

/**
 * Chatbot Q&A Message Handler
 * POST /api/chatbot/message
 */
export const handleChatMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return sendError(res, 'Please provide a message or question', 400);
    }

    const cleanQuery = message.trim().toLowerCase();
    const tokens = cleanQuery.split(/[\s,?.!]+/).filter((t) => t.length > 1);

    // 1. Check direct match in ChatbotKnowledge
    let match = await ChatbotKnowledge.findOne({
      $or: [
        { question: { $regex: cleanQuery, $options: 'i' } },
        { keywords: { $in: tokens } },
      ],
      isActive: true,
    }).lean();

    if (match) {
      return sendSuccess(res, 'Answer found from knowledge base', {
        reply: match.answer,
        source: 'knowledge_base',
        category: match.category,
      });
    }

    // 2. Check Satsang Schedule Query
    if (tokens.some((t) => ['satsang', 'सत्संग', 'samagam', 'समागम', 'time', 'समय', 'schedule', 'कार्यक्रम'].includes(t))) {
      const upcoming = await Satsang.find({ status: 'upcoming' })
        .sort({ date: 1 })
        .limit(3)
        .lean();

      if (upcoming.length > 0) {
        let replyText = 'जयगुरुदेव! आगामी सत्संग कार्यक्रम इस प्रकार हैं:\n\n';
        upcoming.forEach((s, idx) => {
          replyText += `${idx + 1}. **${s.title}**\n📅 दिनांक: ${new Date(s.date).toLocaleDateString('hi-IN')} (${s.startTime})\n📍 स्थान: ${s.location}, ${s.city}\n\n`;
        });
        replyText += 'अधिक जानकारी के लिए कृपया वेबसाइट के Satsang पृष्ठ पर जाएं।';
        return sendSuccess(res, 'Answer compiled from satsang schedule', {
          reply: replyText,
          source: 'dynamic_satsang',
          category: 'Satsang',
        });
      }
    }

    // 3. Check Ashram Address / Contact Query
    if (tokens.some((t) => ['contact', 'address', 'phone', 'helpline', 'पता', 'स्थान', 'फोन', 'नंबर', 'मथुरा', 'mathura'].includes(t))) {
      const settings = await SiteSettings.findOne().lean();
      const phone = settings?.contactInfo?.phone || '+91-9876543210';
      const address = settings?.contactInfo?.address || 'जयगुरुदेव आश्रम, मथुरा-दिल्ली राष्ट्रीय राजमार्ग (NH-19), मथुरा (उ.प्र.) 281001';

      const replyText = `जयगुरुदेव! आश्रम का मुख्य पता एवं संपर्क विवरण:\n\n📍 **पता:** ${address}\n📞 **हेल्पलाइन:** ${phone}\n⏰ **कार्यालय समय:** प्रातः 06:00 से सायं 08:00 बजे तक।\n\nआप किसी भी दिन आश्रम पधार सकते हैं। भोजन एवं आवास की निशुल्क व्यवस्था है।`;
      return sendSuccess(res, 'Answer compiled from ashram contact', {
        reply: replyText,
        source: 'dynamic_contact',
        category: 'Ashram Info',
      });
    }

    // 4. Check FAQ Query
    const faqMatch = await FAQ.findOne({
      $or: [
        { question: { $regex: cleanQuery, $options: 'i' } },
        { keywords: { $in: tokens } },
      ],
      isActive: true,
    }).lean();

    if (faqMatch) {
      return sendSuccess(res, 'Answer found from FAQ', {
        reply: faqMatch.answer,
        source: 'faq',
        category: faqMatch.category,
      });
    }

    // 5. Default Devotional Knowledge Fallback
    const fallbackReply = `जयगुरुदेव! आपके प्रश्न का उत्तर खोजने हेतु कृपया निम्नलिखित मुख्य बिंदुओं को देखें:\n\n1. **शाकाहार एवं नशामुक्ति:** संस्था का मुख्य संदेश जीवों पर दया, पूर्ण शाकाहार और सदाचार है।\n2. **नाम-साधना (सुरत-शब्द योग):** अंतर के दिव्य नाद और प्रकाश को सुनने की सरल साधना।\n3. **आश्रम दर्शन:** मथुरा आश्रम में 365 दिन अखंड लंगर एवं साधना की निशुल्क व्यवस्था है।\n\nयदि आपको कोई विशेष जानकारी चाहिए, तो कृपया हमारे संपर्क पृष्ठ से आश्रम कार्यालय को संदेश भेजें। जयगुरुदेव!`;

    return sendSuccess(res, 'Default spiritual response', {
      reply: fallbackReply,
      source: 'general_guidance',
      category: 'General',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get all Knowledge Base items
 * GET /api/admin/knowledge
 */
export const getKnowledgeList = async (req, res, next) => {
  try {
    const list = await ChatbotKnowledge.find().sort({ createdAt: -1 }).lean();
    return sendSuccess(res, 'Knowledge list retrieved', list);
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Create Knowledge item
 * POST /api/admin/knowledge
 */
export const createKnowledge = async (req, res, next) => {
  try {
    const item = await ChatbotKnowledge.create(req.body);
    return sendSuccess(res, 'Knowledge item created', item, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Update Knowledge item
 * PUT /api/admin/knowledge/:id
 */
export const updateKnowledge = async (req, res, next) => {
  try {
    const item = await ChatbotKnowledge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return sendError(res, 'Item not found', 404);
    return sendSuccess(res, 'Knowledge item updated', item);
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Delete Knowledge item
 * DELETE /api/admin/knowledge/:id
 */
export const deleteKnowledge = async (req, res, next) => {
  try {
    const item = await ChatbotKnowledge.findByIdAndDelete(req.params.id);
    if (!item) return sendError(res, 'Item not found', 404);
    return sendSuccess(res, 'Knowledge item deleted');
  } catch (error) {
    next(error);
  }
};
