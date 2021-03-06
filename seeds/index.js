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
          // your user id
            author:'60e02bbbd8e56bf7f8d128a0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/39378464',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
               type : "Point",
               coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
              },
            images:[
                {
                  url: 'https://res.cloudinary.com/dgu5orpv9/image/upload/v1625435725/TourGuide/yuyeh3bjyv1qjuwfrvrl.jpg',
                  filename: 'TourGuide/bg8lueowdcvpwhdwhlx1'
                },
                {
                  url: 'https://res.cloudinary.com/dgu5orpv9/image/upload/v1625387180/TourGuide/uslogecmj3ghdc45lwth.jpg',
                  filename: 'TourGuide/uslogecmj3ghdc45lwth'
                },
                {
                  url: 'https://res.cloudinary.com/dgu5orpv9/image/upload/v1625387191/TourGuide/cqv2u6sw9fjtzadebnmk.jpg',
                  filename: 'TourGuide/cqv2u6sw9fjtzadebnmk'
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})