"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.getProfileHandler = exports.authMiddleware = void 0;
const express_1 = require("@clerk/express");
//expoerting a middleware and handler separeately
exports.authMiddleware = (0, express_1.requireAuth)();
const getProfileHandler = (req, res) => {
    const clerkReq = req;
    if (!clerkReq.auth) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    res.json({
        userId: clerkReq.auth.userId,
        email: clerkReq.auth.sessionClaims.email,
        firstName: clerkReq.auth.sessionClaims.firstName,
        lastName: clerkReq.auth.sessionClaims.lastName,
    });
};
exports.getProfileHandler = getProfileHandler;
exports.getProfile = [exports.authMiddleware, exports.getProfileHandler];
