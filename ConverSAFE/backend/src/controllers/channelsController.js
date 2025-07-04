"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChannel = exports.getChannels = void 0;
const db_1 = require("../db");
const getChannels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { team_id } = req.query;
    try {
        if (!team_id) {
            res.status(400).json({ error: 'team_id es requerido' });
            return;
        }
        const result = yield db_1.pool.query('SELECT * FROM channels WHERE team_id = $1 ORDER BY id', [team_id]);
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getChannels = getChannels;
const createChannel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { team_id, name, description, is_private } = req.body;
    try {
        const result = yield db_1.pool.query('INSERT INTO channels (team_id, name, description, is_private) VALUES ($1, $2, $3, $4) RETURNING *', [team_id, name, description, is_private || false]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
});
exports.createChannel = createChannel;
