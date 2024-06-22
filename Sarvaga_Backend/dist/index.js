"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRoutes_1 = __importDefault(require("./Routes/adminRoutes"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5172;
// Enable CORS for specific origin
const allowedOrigin = 'https://sarvagafashions.com/';
const corsOptions = {
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Routes
app.use('/BE/admin', adminRoutes_1.default);
app.use('/BE/user', userRoutes_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
