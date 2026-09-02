import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'FAQ question is required'],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, 'FAQ answer is required'],
    },
    category: {
      type: String,
      enum: ['About Sanstha', 'Sadhana & Dhyan', 'Ashram Visit', 'Satsang Programs', 'Literature & Audio', 'Donations & Seva', 'General'],
      default: 'About Sanstha',
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FAQ = mongoose.model('FAQ', faqSchema);
