const mongoose = require("mongoose");
const User = require("../auction-database/config/models/User");
const Item = require("../auction-database/config/models/Item");
require("dotenv").config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected!");

  await User.deleteMany({});
  await Item.deleteMany({});

  const seller = await User.create({
    name: "Test Seller",
    email: "seller@test.com",
    password: "hashedpassword",
  });

  await Item.create([
    {
      title: "Vintage Clock",
      description: "Old collectible clock",
      startingPrice: 40,
      category: "Collectibles",
      seller: seller._id,
    },
    {
      title: "Headphones",
      description: "Wireless noise-cancelling",
      startingPrice: 75,
      category: "Electronics",
      seller: seller._id,
    },
  ]);

  console.log("Sample Data Inserted!");
  process.exit();
}

seed();
