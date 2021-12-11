const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
//@ creating server with express
const app = express();

/* eslint-disable no-undef */
//@ import routes and middlewares
const publicUserRouter = require('./routes/public/userRouter');
const publicProductRouter = require('./routes/public/productRouter');
const authUserRouter = require('./routes/user/userRouter');
const authProductRouter = require('./routes/user/productRouter');
const authOrderRouter = require('./routes/user/orderRouter');
const adminProductRouter = require('./routes/admin/productRouter');
const adminUserRouter = require('./routes/admin/userRouter');

const { notFound, errorHandler } = require('./middlewares/errorhandler');

//@ environment variables config

dotenv.config({ path: path.join(__dirname, '../../.env') });
const PORT = process.env.PORT;

//passport congig
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/public/user', publicUserRouter);
app.use('/public/product', publicProductRouter);
app.use('/auth/user', authUserRouter);
app.use('/auth/product', authProductRouter);
app.use('/auth/order', authOrderRouter);
app.use('/admin/user', adminUserRouter);
app.use('/admin/product', adminProductRouter);

//@ error handling
app.use(notFound);
app.use(errorHandler);

module.exports = { app, PORT };
