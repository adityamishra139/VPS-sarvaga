import express from 'express';
import adminRoutes from './Routes/adminRoutes'; // Assuming adminRoutes.ts is the correct filename
import userRoutes from './Routes/userRoutes'; 
import cors from 'cors';

const app = express();
const port = 5172;

app.use(express.json());

const corsOptions = {
  origin: "https://sarvagafashions.com",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE","OPTIONS"],
  credentials: true,
  allowedHeaders: [
    'Authorization',
    "Content-Type"
  ], // Add other headers as needed
};

// Apply CORS options
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use('/BE/admin', adminRoutes);
app.use('/BE/user', userRoutes);
app.listen(port, () => {
  console.log('Listening to port ' + port);
});
