import express from 'express';
import adminRoutes from './Routes/adminRoutes';
import userRoutes from './Routes/userRoutes';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 5172;

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
// Routes
app.use('/BE/admin', adminRoutes);
app.use('/BE/user', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
