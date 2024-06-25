import express from 'express';
import adminRoutes from './Routes/adminRoutes';
import userRoutes from './Routes/userRoutes';
import cors from 'cors';

const app = express();
const port = 5172;

app.use(cors({origin:'https://sarvagafashions.com'}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/BE/admin', adminRoutes);
app.use('/BE/user', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
