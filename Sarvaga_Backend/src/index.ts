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

app.options('/BE/*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://sarvagafashions.com');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});


app.use('/BE/admin', adminRoutes);
app.use('/BE/user', userRoutes);
app.listen(port, () => {
  console.log('Listening to port ' + port);
});
