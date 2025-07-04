"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channelsController_1 = require("../controllers/channelsController");
const router = (0, express_1.Router)();
// GET /channels?team_id=1
router.get('/', channelsController_1.getChannels);
// POST /channels
router.post('/', channelsController_1.createChannel);
exports.default = router;
