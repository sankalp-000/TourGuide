const mongoose = require('mongoose');
const cities = require('./cities');
const Place =require('../models/place')
const { places, descriptors } = require('./seedhelpers');

mongoose.connect('mongodb://localhost:27017/tour-place' , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async()=>{
    await Place.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const price = Math.floor(Math.random() * 1000000) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Place({
            author:'60e02bbbd8e56bf7f8d128a0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/39378464',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})