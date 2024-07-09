"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRoutes_1 = __importDefault(require("./Routes/adminRoutes"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 5172;
app.use((0, cors_1.default)());
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Serve static files from the 'uploads/products' directory
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'uploads/products')));
console.log(path_1.default.join(__dirname, 'uploads/products'));
// Define your routes
app.use('/BE/admin', adminRoutes_1.default);
app.use('/BE/user', userRoutes_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
