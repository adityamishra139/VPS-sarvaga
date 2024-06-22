import express from 'express';
import adminRoutes from './Routes/adminRoutes';
import userRoutes from './Routes/userRoutes';
import cors from 'cors';

const app = express();
const port = 5172;

// Enable CORS for specific origin
const allowedOrigin = 'https://sarvagafashions.com/';
const corsOptions = {
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization','Access-Control-Allow-Origin'],
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/BE/admin', adminRoutes);
app.use('/BE/user', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});