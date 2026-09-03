import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Notice title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Notice content is required'],
    },
    category: {
      type: String,
      enum: ['Ashram Announcement', 'General Notice', 'Important Notice', 'Emergency Notice', 'Adhesh'],
      default: 'General Notice',
      index: true,
    },
    priority: {
      type: String,
      enum: ['Emergency', 'Very Important', 'Important', 'Normal'],
      default: 'Normal',
      index: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    expiryDate: {
      type: Date,
      default: null,
      index: true,
    },
    attachmentUrl: {
      type: String,
      default: '',
    },
    attachmentName: {
      type: String,
      default: '',
    },
    isPopup: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    referenceNumber: {
      type: String,
      trim: true,
      default: '',
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

export const Notice = mongoose.model('Notice', noticeSchema);
