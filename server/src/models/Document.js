import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Document title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      default: '',
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL is required'],
      trim: true,
    },
    fileType: {
      type: String,
      enum: ['pdf', 'doc', 'image', 'audio', 'other'],
      default: 'pdf',
    },
    fileSize: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Publication', 'Spiritual Literature', 'Ashram Adhesh', 'Devotional Magazine', 'Form', 'Annual Report', 'General'],
      default: 'Publication',
      index: true,
    },
    referenceNumber: {
      type: String,
      trim: true,
      default: '',
    },
    authorOrPublisher: {
      type: String,
      default: 'Jaigurudev Ashram',
    },
    publishDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    downloadsCount: {
      type: Number,
      default: 0,
    },
    isDownloadable: {
      type: Boolean,
      default: true,
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

export const Document = mongoose.model('Document', documentSchema);
