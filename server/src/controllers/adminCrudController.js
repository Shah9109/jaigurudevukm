import {
  Satsang,
  Notice,
  Adhesh,
  Event,
  Video,
  Audio,
  ActivityLog,
} from '../models/index.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// Helper to log audit actions
const logActivity = async (req, action, resource, resourceId, details) => {
  try {
    await ActivityLog.create({
      adminId: req.admin?._id !== 'admin-root-id' ? req.admin?._id : null,
      adminEmail: req.admin?.email || 'admin@jaigurudev.org',
      action,
      resource,
      resourceId: resourceId?.toString() || '',
      details,
      ipAddress: req.ip || req.connection?.remoteAddress,
    });
  } catch (e) {}
};

// ----------------- SATSANG CRUD -----------------
export const createSatsang = async (req, res, next) => {
  try {
    const satsang = await Satsang.create(req.body);
    await logActivity(req, 'CREATE', 'SATSANG', satsang._id, `Created Satsang: ${satsang.title}`);
    return sendSuccess(res, 'Satsang created successfully', satsang, 201);
  } catch (error) {
    next(error);
  }
};

export const updateSatsang = async (req, res, next) => {
  try {
    const satsang = await Satsang.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!satsang) return sendError(res, 'Satsang not found', 404);
    await logActivity(req, 'UPDATE', 'SATSANG', satsang._id, `Updated Satsang: ${satsang.title}`);
    return sendSuccess(res, 'Satsang updated successfully', satsang);
  } catch (error) {
    next(error);
  }
};

export const deleteSatsang = async (req, res, next) => {
  try {
    const satsang = await Satsang.findByIdAndDelete(req.params.id);
    if (!satsang) return sendError(res, 'Satsang not found', 404);
    await logActivity(req, 'DELETE', 'SATSANG', req.params.id, `Deleted Satsang: ${satsang.title}`);
    return sendSuccess(res, 'Satsang deleted successfully');
  } catch (error) {
    next(error);
  }
};

// ----------------- NOTICES CRUD -----------------
export const createNotice = async (req, res, next) => {
  try {
    const notice = await Notice.create(req.body);
    await logActivity(req, 'CREATE', 'NOTICE', notice._id, `Created Notice: ${notice.title}`);
    return sendSuccess(res, 'Notice created successfully', notice, 201);
  } catch (error) {
    next(error);
  }
};

export const updateNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!notice) return sendError(res, 'Notice not found', 404);
    await logActivity(req, 'UPDATE', 'NOTICE', notice._id, `Updated Notice: ${notice.title}`);
    return sendSuccess(res, 'Notice updated successfully', notice);
  } catch (error) {
    next(error);
  }
};

export const deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return sendError(res, 'Notice not found', 404);
    await logActivity(req, 'DELETE', 'NOTICE', req.params.id, `Deleted Notice: ${notice.title}`);
    return sendSuccess(res, 'Notice deleted successfully');
  } catch (error) {
    next(error);
  }
};

// ----------------- ADHESH CRUD -----------------
export const createAdhesh = async (req, res, next) => {
  try {
    const adhesh = await Adhesh.create(req.body);
    await logActivity(req, 'CREATE', 'ADHESH', adhesh._id, `Created Adhesh: ${adhesh.referenceNumber}`);
    return sendSuccess(res, 'Adhesh created successfully', adhesh, 201);
  } catch (error) {
    next(error);
  }
};

export const updateAdhesh = async (req, res, next) => {
  try {
    const adhesh = await Adhesh.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!adhesh) return sendError(res, 'Adhesh not found', 404);
    await logActivity(req, 'UPDATE', 'ADHESH', adhesh._id, `Updated Adhesh: ${adhesh.referenceNumber}`);
    return sendSuccess(res, 'Adhesh updated successfully', adhesh);
  } catch (error) {
    next(error);
  }
};

export const deleteAdhesh = async (req, res, next) => {
  try {
    const adhesh = await Adhesh.findByIdAndDelete(req.params.id);
    if (!adhesh) return sendError(res, 'Adhesh not found', 404);
    await logActivity(req, 'DELETE', 'ADHESH', req.params.id, `Deleted Adhesh: ${adhesh.referenceNumber}`);
    return sendSuccess(res, 'Adhesh deleted successfully');
  } catch (error) {
    next(error);
  }
};

// ----------------- EVENTS CRUD -----------------
export const createEvent = async (req, res, next) => {
  try {
    if (!req.body.slug && req.body.title) {
      req.body.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
    }
    const event = await Event.create(req.body);
    await logActivity(req, 'CREATE', 'EVENT', event._id, `Created Event: ${event.title}`);
    return sendSuccess(res, 'Event created successfully', event, 201);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return sendError(res, 'Event not found', 404);
    await logActivity(req, 'UPDATE', 'EVENT', event._id, `Updated Event: ${event.title}`);
    return sendSuccess(res, 'Event updated successfully', event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return sendError(res, 'Event not found', 404);
    await logActivity(req, 'DELETE', 'EVENT', req.params.id, `Deleted Event: ${event.title}`);
    return sendSuccess(res, 'Event deleted successfully');
  } catch (error) {
    next(error);
  }
};

// ----------------- VIDEOS CRUD -----------------
export const createVideo = async (req, res, next) => {
  try {
    const video = await Video.create(req.body);
    await logActivity(req, 'CREATE', 'VIDEO', video._id, `Created Video: ${video.title}`);
    return sendSuccess(res, 'Video created successfully', video, 201);
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!video) return sendError(res, 'Video not found', 404);
    await logActivity(req, 'UPDATE', 'VIDEO', video._id, `Updated Video: ${video.title}`);
    return sendSuccess(res, 'Video updated successfully', video);
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return sendError(res, 'Video not found', 404);
    await logActivity(req, 'DELETE', 'VIDEO', req.params.id, `Deleted Video: ${video.title}`);
    return sendSuccess(res, 'Video deleted successfully');
  } catch (error) {
    next(error);
  }
};

// ----------------- AUDIO CRUD -----------------
export const createAudio = async (req, res, next) => {
  try {
    const audio = await Audio.create(req.body);
    await logActivity(req, 'CREATE', 'AUDIO', audio._id, `Created Audio: ${audio.title}`);
    return sendSuccess(res, 'Audio created successfully', audio, 201);
  } catch (error) {
    next(error);
  }
};

export const updateAudio = async (req, res, next) => {
  try {
    const audio = await Audio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!audio) return sendError(res, 'Audio not found', 404);
    await logActivity(req, 'UPDATE', 'AUDIO', audio._id, `Updated Audio: ${audio.title}`);
    return sendSuccess(res, 'Audio updated successfully', audio);
  } catch (error) {
    next(error);
  }
};

export const deleteAudio = async (req, res, next) => {
  try {
    const audio = await Audio.findByIdAndDelete(req.params.id);
    if (!audio) return sendError(res, 'Audio not found', 404);
    await logActivity(req, 'DELETE', 'AUDIO', req.params.id, `Deleted Audio: ${audio.title}`);
    return sendSuccess(res, 'Audio deleted successfully');
  } catch (error) {
    next(error);
  }
};
