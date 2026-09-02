import mongoose from 'mongoose';

const chatbotKnowledgeSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question or prompt pattern is required'],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, 'Verified answer is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['About Sanstha', 'Sadhana & Practice', 'Satsang Info', 'Ashram Timing & Rules', 'Contact & Location', 'Adhesh & Notices', 'Spiritual Teachings'],
      default: 'About Sanstha',
      index: true,
    },
    keywords: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    source: {
      type: String,
      default: 'Official Sanstha Guidelines',
      trim: true,
    },
    priority: {
      type: Number,
      default: 1, // Higher priority answers match first
    },
    isOfficial: {
      type: Boolean,
      default: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Text indexing for fast localized keyword search
chatbotKnowledgeSchema.index({ question: 'text', answer: 'text', keywords: 'text' });

export const ChatbotKnowledge = mongoose.model('ChatbotKnowledge', chatbotKnowledgeSchema);
