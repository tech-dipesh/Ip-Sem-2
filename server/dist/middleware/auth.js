"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@clerk/express");
exports.default = (0, express_1.requireAuth)();
