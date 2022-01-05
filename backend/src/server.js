const { app, PORT } = require('./app');

//@ db connection
const { mongoDBconnection } = require('./db/mongoDBConnection');

// @ db connection
mongoDBconnection(process.env.MONGODB_CONNECTION_URI);

// @ listening to Port
app.listen(PORT, () => {
  console.log(`Port ${PORT} is listening`);
});
