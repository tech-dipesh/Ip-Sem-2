"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
//for teh authentication route
router.get('/me', auth_1.authMiddleware, auth_1.getProfileHandler);
router.post('/logout', (0, express_2.requireAuth)(), (_req, res) => {
    res.json({ success: true });
});
exports.default = router;
