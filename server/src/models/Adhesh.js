import mongoose from 'mongoose';

const adheshSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Adhesh title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    referenceNumber: {
      type: String,
      required: [true, 'Reference number is required (e.g. JGD/2026/04)'],
      trim: true,
      index: true,
    },
    issueDate: {
      type: Date,
      required: [true, 'Issue date is required'],
      default: Date.now,
      index: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Ashram Order', 'Spiritual Guidance', 'Administrative Directive', 'Bhandara Guidelines', 'Emergency Notice'],
      default: 'Ashram Order',
      index: true,
    },
    priority: {
      type: String,
      enum: ['Emergency', 'Very Important', 'Important', 'Normal'],
      default: 'Important',
    },
    documentUrl: {
      type: String,
      default: '',
    },
    isExternalLink: {
      type: Boolean,
      default: false,
    },
    externalUrl: {
      type: String,
      default: '',
    },
    signatory: {
      type: String,
      default: 'Pujya Maharaj Ji / Sanstha Sachiv',
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

export const Adhesh = mongoose.model('Adhesh', adheshSchema);
