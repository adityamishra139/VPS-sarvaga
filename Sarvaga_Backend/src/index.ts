import express from 'express';
import adminRoutes from './Routes/adminRoutes';
import userRoutes from './Routes/userRoutes';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 5172;

app.use(cors());

app.use(express.json());

app.use('/uploads/products', express.static(path.join(__dirname, 'uploads/products')));

console.log(`Serving static files from: ${path.join(__dirname, 'uploads/products')}`);

app.use('/BE/admin', adminRoutes);
app.use('/BE/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

