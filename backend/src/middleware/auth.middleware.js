const jwt = require('jsonwebtoken');
const env = require('../config/env.config');
const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return ApiResponse.error(res, 'Access denied. No authentication token provided.', 401);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        student: true,
        teacher: true,
      },
    });

    if (!user) {
      return ApiResponse.error(res, 'Invalid token. User not found.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ApiResponse.error(res, 'Token expired. Please login again.', 401);
    }
    return ApiResponse.error(res, 'Invalid token authorization.', 401);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error(res, 'Unauthorized.', 401);
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        `Forbidden. Access restricted to roles: [${roles.join(', ')}]. Your role: ${req.user.role}`,
        403
      );
    }

    next();
  };
};

const restrictToSelfOrAdmin = (req, res, next) => {
  if (!req.user) {
    return ApiResponse.error(res, 'Unauthorized.', 401);
  }

  if (req.user.role === 'ADMIN') {
    return next();
  }

  const requestedUserId = req.params.userId || req.params.id;
  const isStudentSelf = req.user.student && req.user.student.id === requestedUserId;
  const isUserSelf = req.user.id === requestedUserId;

  if (isStudentSelf || isUserSelf) {
    return next();
  }

  return ApiResponse.error(res, 'Forbidden. You are not authorized to view or edit this resource.', 403);
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  restrictToSelfOrAdmin,
};
