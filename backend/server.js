import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import countryRoute from './routes/countryRoute.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import Db from './config/db.js';

// configure env
dotenv.config();

Db()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/country', countryRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);

app.listen(process.env.PORT, () => console.log(`Server running on PORT ${process.env.PORT}`))