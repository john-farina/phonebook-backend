const mongoose = require('mongoose');

const url =
    'mongodb+srv://fullstack:firstapp@cluster0.zi5k6om.mongodb.net/?retryWrites=true&w=majority';

console.log('connecting to ', url);
mongoose
    .connect(url)
    .then((result) => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting', error.message);
    });

const peopleSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
});

peopleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('People', peopleSchema);
