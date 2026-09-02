import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Audio title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      default: '',
    },
    audioUrl: {
      type: String,
      required: [true, 'Audio URL is required'],
      trim: true,
    },
    duration: {
      type: String,
      default: '00:00',
    },
    category: {
      type: String,
      enum: ['Bhajan', 'Naam Dhun', 'Discourse', 'Morning Prayer', 'Evening Aarti', 'Special Satsang'],
      default: 'Bhajan',
      index: true,
    },
    speaker: {
      type: String,
      default: 'Ashram Mandali',
      trim: true,
    },
    coverImageUrl: {
      type: String,
      default: '',
    },
    lyrics: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Audio = mongoose.model('Audio', audioSchema);
