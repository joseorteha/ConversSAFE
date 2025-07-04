"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messagesController_1 = require("../controllers/messagesController");
const router = (0, express_1.Router)();
// GET /messages?channel_id=1
router.get('/', messagesController_1.getMessages);
// POST /messages
router.post('/', messagesController_1.createMessage);
exports.default = router;
