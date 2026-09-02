import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Admin } from '../models/Admin.js';
import { ActivityLog } from '../models/ActivityLog.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// Helper to sign JWT
const signToken = (id, email, role) => {
  const secret = process.env.JWT_SECRET || 'jaigurudev_super_secret_spiritual_jwt_key_2026_secure';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id, email, role }, secret, { expiresIn });
};

/**
 * Admin Login
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Please provide both email and password.', 400);
    }

    const normalizedEmail = email.toLowerCase().trim();
    let admin = null;

    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      try {
        admin = await Admin.findOne({ email: normalizedEmail }).select('+password');
      } catch (dbErr) {
        console.warn('[Auth Controller] DB read failed.');
      }
    }

    // Default Superadmin Auto-Seed if no admin exists in DB or dev fallback
    const defaultEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@jaigurudev.org').toLowerCase().trim();
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'JaigurudevAdmin@2026';

    if (!admin && normalizedEmail === defaultEmail) {
      if (password === defaultPassword) {
        // Create initial Superadmin in DB if connected
        try {
          admin = await Admin.create({
            name: 'Jaigurudev Super Admin',
            email: defaultEmail,
            password: defaultPassword,
            role: 'superadmin',
            isActive: true,
          });
        } catch (createErr) {
          // If DB is offline, continue with virtual admin object
          admin = {
            _id: 'admin-root-id',
            name: 'Jaigurudev Super Admin',
            email: defaultEmail,
            role: 'superadmin',
          };
        }
      }
    }

    if (!admin) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    // Check password if admin was found from DB
    if (admin.comparePassword) {
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return sendError(res, 'Invalid email or password.', 401);
      }
    }

    if (admin.isActive === false) {
      return sendError(res, 'This account has been deactivated.', 403);
    }

    // Update lastLogin if connected
    try {
      if (admin.save) {
        admin.lastLogin = new Date();
        await admin.save({ validateBeforeSave: false });
      }
    } catch (e) {}

    // Generate token
    const token = signToken(admin._id, admin.email, admin.role);

    // Record activity log if DB is connected
    if (isDbConnected) {
      try {
        await ActivityLog.create({
          adminId: admin._id !== 'admin-root-id' ? admin._id : null,
          adminEmail: admin.email,
          action: 'LOGIN',
          resource: 'AUTH',
          details: 'Admin logged in successfully',
          ipAddress: req.ip || req.connection?.remoteAddress,
        });
      } catch (logErr) {}
    }

    return sendSuccess(res, 'Login successful. Welcome to Jaigurudev Admin Panel.', {
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Current Authenticated Admin
 * GET /api/auth/me
 */
export const getMe = async (req, res) => {
  return sendSuccess(res, 'Authenticated admin profile retrieved', {
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
      lastLogin: req.admin.lastLogin,
    },
  });
};

/**
 * Change Admin Password
 * PUT /api/auth/change-password
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return sendError(res, 'Please provide both current and new password.', 400);
    }

    if (newPassword.length < 8) {
      return sendError(res, 'New password must be at least 8 characters long.', 400);
    }

    let admin = null;
    try {
      admin = await Admin.findById(req.admin._id).select('+password');
    } catch (e) {}

    if (admin && admin.comparePassword) {
      const isMatch = await admin.comparePassword(currentPassword);
      if (!isMatch) {
        return sendError(res, 'Current password entered is incorrect.', 400);
      }

      admin.password = newPassword;
      admin.passwordChangedAt = new Date();
      await admin.save();
    }

    // Record activity log
    try {
      await ActivityLog.create({
        adminId: req.admin._id !== 'admin-root-id' ? req.admin._id : null,
        adminEmail: req.admin.email,
        action: 'UPDATE',
        resource: 'AUTH',
        details: 'Admin password changed successfully',
      });
    } catch (e) {}

    return sendSuccess(res, 'Password changed successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * Update Admin Profile Details
 * PUT /api/auth/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return sendError(res, 'Name cannot be empty.', 400);
    }

    let admin = null;
    try {
      admin = await Admin.findById(req.admin._id);
      if (admin) {
        admin.name = name.trim();
        await admin.save({ validateBeforeSave: false });
      }
    } catch (e) {}

    return sendSuccess(res, 'Profile updated successfully.', {
      name: name.trim(),
      email: req.admin.email,
    });
  } catch (error) {
    next(error);
  }
};
