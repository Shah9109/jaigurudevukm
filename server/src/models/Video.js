import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Video title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      default: '',
    },
    videoType: {
      type: String,
      enum: ['youtube', 'external', 'upload'],
      default: 'youtube',
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
    },
    youtubeId: {
      type: String,
      trim: true,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'Satsang Discourse',
      trim: true,
      index: true,
    },
    speaker: {
      type: String,
      default: 'Pujya Maharaj Ji',
      trim: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
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

// Helper to extract YouTube ID automatically if provided a full URL
videoSchema.pre('save', function (next) {
  if (this.videoType === 'youtube' && this.videoUrl && !this.youtubeId) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = this.videoUrl.match(regExp);
    if (match && match[2].length === 11) {
      this.youtubeId = match[2];
      if (!this.thumbnailUrl) {
        this.thumbnailUrl = `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
      }
    }
  }
  next();
});

export const Video = mongoose.model('Video', videoSchema);
