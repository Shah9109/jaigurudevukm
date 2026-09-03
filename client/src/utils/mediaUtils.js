/**
 * Universal Media & Link Parser for Jaigurudev Platform
 * Handles Google Drive, YouTube, Direct Images, and Web Links
 */

/**
 * Extract Google Drive file ID from any Drive share or view URL
 */
export const getDriveFileId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]{25,})/i) ||
                url.match(/[?&]id=([a-zA-Z0-9_-]{25,})/i) ||
                url.match(/\/d\/([a-zA-Z0-9_-]{25,})/i);
  return match ? match[1] : null;
};

/**
 * Returns direct image preview URL for Google Drive files
 */
export const getDriveDirectImageUrl = (url) => {
  const fileId = getDriveFileId(url);
  if (!fileId) return null;
  // Google Usercontent direct CDN link (high speed, CORS friendly)
  return `https://lh3.googleusercontent.com/d/${fileId}`;
};

/**
 * Extract YouTube 11-character video or live stream ID
 */
export const getYouTubeVideoId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|live\/|shorts\/))([\w-]{11})/i);
  return match ? match[1] : null;
};

/**
 * Returns YouTube video thumbnail URL
 */
export const getYouTubeThumbnail = (url, quality = 'hq') => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/${quality === 'max' ? 'maxresdefault' : 'hqdefault'}.jpg`;
};

/**
 * Returns YouTube embed URL
 */
export const getYouTubeEmbedUrl = (url) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
};

/**
 * Detect media type from URL
 * @returns {'gdrive' | 'youtube' | 'image' | 'external' | null}
 */
export const detectMediaType = (url) => {
  if (!url || typeof url !== 'string' || !url.trim()) return null;
  const clean = url.trim().toLowerCase();

  if (clean.includes('drive.google.com') || clean.includes('docs.google.com')) {
    return 'gdrive';
  }

  if (clean.includes('youtube.com') || clean.includes('youtu.be')) {
    return 'youtube';
  }

  if (/\.(jpeg|jpg|png|webp|gif|svg)(\?.*)?$/i.test(clean) || clean.startsWith('data:image/')) {
    return 'image';
  }

  return 'external';
};

/**
 * Get direct displayable thumbnail / image URL for any media type
 */
export const getDirectPreviewUrl = (url) => {
  const type = detectMediaType(url);
  if (!type) return null;

  if (type === 'gdrive') {
    return getDriveDirectImageUrl(url);
  }

  if (type === 'youtube') {
    return getYouTubeThumbnail(url);
  }

  if (type === 'image') {
    return url;
  }

  return null;
};
