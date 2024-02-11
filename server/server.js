const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const errorHandler = require('./middlewares/errorHandler');
const Product = require('./model/Product');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//not adding to env file for simplicity, but should be added in a real-world application
mongoose.connect('mongodb+srv://product:product@productmanagement.ycanggd.mongodb.net/productmanagement');


const corsOptions = {
  origin: 'http://clientapp.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 

};


app.use(cors(corsOptions));

app.use(express.json());


async function addInitialProducts() {
  try {
    const products = [
      {
        name: 'Enchanter',
        price: 1000,
        description: 'The richness of enchanter',
        more: ' Flowers come in a vast array of shapes, sizes, and colors, captivating humans and animals alike. Beyond their biological function, flowers hold symbolic meanings in various cultures, often representing love, beauty, purity, and remembrance.',
        image: '/1.jpg',
      },
      {
        name: 'Darkleather',
        price: 2000,
        description: 'Beauty of Darkleather',
        more: ' Flowers come in a vast array of shapes, sizes, and colors, captivating humans and animals alike. Beyond their biological function, flowers hold symbolic meanings in various cultures, often representing love, beauty, purity, and remembrance.',
        image: '/2.jpg',
      },
      {
        name: 'leptiShrinker',
        price: 2500,
        description: 'Shallowing Rareness',
        more: ' Flowers come in a vast array of shapes, sizes, and colors, captivating humans and animals alike. Beyond their biological function, flowers hold symbolic meanings in various cultures, often representing love, beauty, purity, and remembrance.',
        image: '/3.jpg',
      },
      {
        name: 'BambooDazzler',
        price: 3420,
        description: 'Dazzling Charisma',
        more: ' Flowers come in a vast array of shapes, sizes, and colors, captivating humans and animals alike. Beyond their biological function, flowers hold symbolic meanings in various cultures, often representing love, beauty, purity, and remembrance.',
        image: '/4.jpg',
      },
      {
        name: 'TrekStereo Flower',
        price: 1920,
        description: 'Pure Sterotreking',
        more: ' Flowers come in a vast array of shapes, sizes, and colors, captivating humans and animals alike. Beyond their biological function, flowers hold symbolic meanings in various cultures, often representing love, beauty, purity, and remembrance.',
        image: '/5.jpg',
      },
      {
        name: 'Randomogoinvilla',
        price: 8420,
        description: 'Mutated Bougainvilla',
        more: ' Flowers come in a vast array of shapes, sizes, and colors, captivating humans and animals alike. Beyond their biological function, flowers hold symbolic meanings in various cultures, often representing love, beauty, purity, and remembrance.',
        image: '/6.jpg',
      },
      {
        name: 'SunWitch Blossom',
        price: 6420,
        description: 'Shiness of Blossom',
        more: ' Flowers come in a vast array of shapes, sizes, and colors, captivating humans and animals alike. Beyond their biological function, flowers hold symbolic meanings in various cultures, often representing love, beauty, purity, and remembrance.',
        image: '/7.jpg',
      },
      
    ];

    for (const product of products) {
      const existingProduct = await Product.findOne({ name: product.name });

      if (!existingProduct) {
        await Product.create(product);
        console.log(`Product '${product.name}' added successfully`);
      } else {
        console.log(`Product '${product.name}' already exists`);
      }
    }

    console.log('Products added successfully');
  } catch (error) {
    console.error('Error adding initial products:', error);
  }
}


app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await addInitialProducts();
});
