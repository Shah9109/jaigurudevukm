import mongoose from 'mongoose';

const satsangSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Satsang title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      required: [true, 'Satsang date is required'],
      index: true,
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      default: '07:00 AM',
    },
    endTime: {
      type: String,
      default: '09:00 AM',
    },
    location: {
      type: String,
      required: [true, 'Location / Venue is required'],
      trim: true,
    },
    address: {
      type: String,
      default: '',
      trim: true,
    },
    city: {
      type: String,
      default: 'Mathura',
      trim: true,
      index: true,
    },
    state: {
      type: String,
      default: 'Uttar Pradesh',
      trim: true,
    },
    speaker: {
      type: String,
      default: 'Pujya Maharaj Ji',
      trim: true,
    },
    posterImage: {
      type: String,
      default: '',
    },
    mapUrl: {
      type: String,
      default: '',
    },
    contactNumber: {
      type: String,
      default: '',
    },
    organizer: {
      type: String,
      default: 'Jaigurudev Sanstha',
    },
    specialInstructions: {
      type: String,
      default: 'All devotees are requested to arrive 15 minutes before the scheduled time.',
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
      index: true,
    },
    isDaily: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    mediaUrl: {
      type: String,
      trim: true,
      default: '',
    },
    displayMode: {
      type: String,
      enum: ['full', 'link_with_details', 'link_only'],
      default: 'full',
    },
  },
  {
    timestamps: true,
  }
);

export const Satsang = mongoose.model('Satsang', satsangSchema);
