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
exports.createMessage = exports.getMessages = void 0;
const db_1 = require("../db");
const getMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { channel_id } = req.query;
    try {
        if (!channel_id) {
            res.status(400).json({ error: 'channel_id es requerido' });
            return;
        }
        const result = yield db_1.pool.query(`SELECT m.*, u.username, u.avatar_url
       FROM messages m
       JOIN users u ON m.user_id = u.id
       WHERE m.channel_id = $1
       ORDER BY m.created_at ASC`, [channel_id]);
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getMessages = getMessages;
const createMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { channel_id, user_id, content } = req.body;
    try {
        const result = yield db_1.pool.query('INSERT INTO messages (channel_id, user_id, content) VALUES ($1, $2, $3) RETURNING *', [channel_id, user_id, content]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
});
exports.createMessage = createMessage;
