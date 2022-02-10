const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61f3b2ccb222bb698890f698",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: `https://source.unsplash.com/collection/483251`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sed aliquam at. Sapiente impedit alias quos omnis asperiores similique quo iure. Illum velit architecto dicta tempore iure fugiat aspernatur dolores.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dg7xdnnt0/image/upload/v1643727230/YelpCamp/pq2ar3z17bqochmpo0ab.jpg",
          filename: "YelpCamp/pq2ar3z17bqochmpo0ab",
        },
        {
          url: "https://res.cloudinary.com/dg7xdnnt0/image/upload/v1643712005/YelpCamp/kz2l3ue3v8wtdkrc5jnz.png",
          filename: "YelpCamp/kz2l3ue3v8wtdkrc5jnz",
        },
      ],
    });
    await camp.save();
  }
};

// it will connect, run and then close (because we only want to run it once to seed data in the DB, not continue running)
seedDB().then(() => {
  mongoose.connection.close();
});
