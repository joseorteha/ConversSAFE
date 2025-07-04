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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Cargar las variables de entorno lo antes posible
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Importaciones estándar
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Importaciones de la aplicación
const db_1 = require("./db");
const teams_1 = __importDefault(require("./routes/teams"));
const channels_1 = __importDefault(require("./routes/channels"));
const messages_1 = __importDefault(require("./routes/messages"));
// Función principal para encapsular el arranque del servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Probar la conexión a la base de datos al inicio
        yield db_1.pool.query('SELECT NOW()');
        console.log('[SUCCESS] Conexión a la base de datos establecida.');
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 3001;
        // Configuración de Middlewares
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        // Rutas de la API (con prefijo /api para consistencia)
        app.use('/api/teams', teams_1.default);
        app.use('/api/channels', channels_1.default);
        app.use('/api/messages', messages_1.default);
        app.get('/api', (_req, res) => {
            res.send('Backend de ConversSAFE funcionando!');
        });
        app.get('/api/users', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield db_1.pool.query('SELECT id, username, email FROM users');
                res.json(result.rows);
            }
            catch (error) {
                console.error('Error al obtener usuarios:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }));
        app.get('/api/users/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield db_1.pool.query('SELECT id, username, email, avatar_url, status FROM users WHERE id = $1', [id]);
                if (result.rows.length === 0) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                res.json(result.rows[0]);
            }
            catch (error) {
                console.error(`Error al obtener usuario ${req.params.id}:`, error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }));
        app.post('/api/register', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const result = yield db_1.pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email', [username, email, hashedPassword]);
                res.status(201).json(result.rows[0]);
            }
            catch (error) {
                console.error('Error al registrar usuario:', error);
                if (error.code === '23505') {
                    res.status(409).json({ error: 'Usuario o email ya existe' });
                }
                else {
                    res.status(500).json({ error: 'Error interno del servidor' });
                }
            }
        }));
        app.post('/api/login', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield db_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
                if (result.rows.length === 0) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }
                const user = result.rows[0];
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password_hash);
                if (!isValidPassword) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }
                res.json({ id: user.id, username: user.username, email: user.email });
            }
            catch (error) {
                console.error('Error al iniciar sesión:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }));
        app.put('/api/users/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { username, email, avatar_url, status } = req.body;
                const result = yield db_1.pool.query('UPDATE users SET username = $1, email = $2, avatar_url = $3, status = $4 WHERE id = $5 RETURNING id, username, email, avatar_url, status', [username, email, avatar_url, status, id]);
                if (result.rows.length === 0) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                res.json(result.rows[0]);
            }
            catch (error) {
                console.error(`Error al actualizar usuario ${req.params.id}:`, error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }));
        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`[SUCCESS] Servidor backend escuchando en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('[FATAL] No se pudo iniciar el servidor:', error);
        process.exit(1); // Salir con un código de error si falla el arranque
    }
});
// Ejecutar la función de arranque
startServer();
