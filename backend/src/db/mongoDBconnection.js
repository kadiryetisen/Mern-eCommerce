const mongoose = require('mongoose');

exports.mongoDBconnection = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log('Created mongoDB connection');
  } catch (err) {
    console.log(err);
  }
};

//@ // TEST //  COLLECTION CLEARİNG PROCESS AFTER EACH TEST

exports.clearCollection = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
