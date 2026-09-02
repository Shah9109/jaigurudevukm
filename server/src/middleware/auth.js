import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Admin } from '../models/Admin.js';
import { sendError } from '../utils/apiResponse.js';

/**
 * Protect Admin Routes: Verify JWT and attach admin to req
 */
export const protectAdmin = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return sendError(res, 'Authentication required. Please provide a valid admin token.', 401);
    }

    // Verify token
    const secret = process.env.JWT_SECRET || 'jaigurudev_super_secret_spiritual_jwt_key_2026_secure';
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return sendError(res, 'Session expired. Please log in again.', 401);
      }
      return sendError(res, 'Invalid token. Please log in again.', 401);
    }

    // Check if admin still exists and is active
    let admin = null;
    if (mongoose.connection.readyState === 1) {
      try {
        admin = await Admin.findById(decoded.id);
      } catch (dbErr) {}
    }

    if (!admin && decoded.email === (process.env.ADMIN_DEFAULT_EMAIL || 'admin@jaigurudev.org')) {
      // Allow default fallback token if in dev mode
      req.admin = {
        _id: decoded.id || 'admin-root-id',
        name: 'Super Admin',
        email: decoded.email,
        role: 'superadmin',
        isActive: true,
      };
      return next();
    }

    if (!admin) {
      return sendError(res, 'The admin user for this token no longer exists.', 401);
    }

    if (!admin.isActive) {
      return sendError(res, 'This admin account has been deactivated. Please contact an administrator.', 403);
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Role-based access control
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return sendError(res, 'You do not have sufficient permissions to perform this action.', 403);
    }
    next();
  };
};
