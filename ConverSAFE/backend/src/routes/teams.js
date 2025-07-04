"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamsController_1 = require("../controllers/teamsController");
const router = (0, express_1.Router)();
// GET /teams
router.get('/', teamsController_1.getTeams);
exports.default = router;
