import { SiteSettings, ActivityLog, ContactEnquiry } from '../models/index.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

// Get Site Settings
export const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return sendSuccess(res, 'Site settings retrieved', settings);
  } catch (error) {
    next(error);
  }
};

// Update Site Settings
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();

    // Log action
    try {
      await ActivityLog.create({
        adminId: req.admin?._id !== 'admin-root-id' ? req.admin?._id : null,
        adminEmail: req.admin?.email || 'admin@jaigurudev.org',
        action: 'SETTINGS_CHANGE',
        resource: 'SITE_SETTINGS',
        details: 'Updated site configuration & homepage sections',
        ipAddress: req.ip || req.connection?.remoteAddress,
      });
    } catch (e) {}

    return sendSuccess(res, 'Site settings updated successfully', settings);
  } catch (error) {
    next(error);
  }
};

// Get Activity Logs with pagination & action filtering
export const getActivityLogs = async (req, res, next) => {
  try {
    const { action, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (action && action !== 'all') filter.action = action;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      ActivityLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      ActivityLog.countDocuments(filter),
    ]);

    return sendPaginated(res, 'Activity logs retrieved', items, page, limit, total);
  } catch (error) {
    next(error);
  }
};

// Get Contact Enquiries with filtering
export const getEnquiries = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      ContactEnquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      ContactEnquiry.countDocuments(filter),
    ]);

    return sendPaginated(res, 'Contact enquiries retrieved', items, page, limit, total);
  } catch (error) {
    next(error);
  }
};

// Mark Enquiry as Read / Update status
export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { isRead, status, adminNotes } = req.body;
    const enquiry = await ContactEnquiry.findByIdAndUpdate(
      req.params.id,
      { isRead, status, adminNotes },
      { new: true }
    );
    if (!enquiry) return sendError(res, 'Enquiry not found', 404);
    return sendSuccess(res, 'Enquiry updated successfully', enquiry);
  } catch (error) {
    next(error);
  }
};
