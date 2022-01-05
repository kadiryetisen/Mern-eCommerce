const products = require('./products');
const Product = require('../src/models/productModel');
const { mongoDBconnection } = require('../src/db/mongoDBconnection');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env') });

/// @FOR IMPORTING DATA PROCESS
/// @ npm run import:data

// @FOR DESTROYING DATA PROCESS
// @ npm run destroy:data

const importData = async () => {
  try {
    await mongoDBconnection(process.env.MONGODB_CONNECTION_URI);

    await Product.deleteMany();
    const sampleProducts = products.map((product) => {
      return { ...product };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
