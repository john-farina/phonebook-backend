const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.zi5k6om.mongodb.net/phoneBook?retryWrites=true&w=majority`;

//layout for the database objects
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
});
//an object to to create new ones for database using the layout
const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 3) {
    console.log(
        'provide the password as an argument: node mongo.js <password>'
    );
    process.exit(1);
}

if (process.argv.length > 3) {
    const name = process.argv[3];
    const number = process.argv[4];
    console.log(`NAME: ${name}`, `NUMBER: ${number}`);

    //connecting to the database
    mongoose
        .connect(url)
        .then((result) => {
            console.log('SAVING PERSON:');

            //creating new person object to save
            const person = new Person({
                name: name,
                number: number,
                date: new Date(),
            });
            //save it to the database
            return person.save();
        })
        .then(() => {
            //close out the connection and log it
            console.log(`${name}: ${number} - has been saved`);
            mongoose.connection.close();
        })
        .catch((err) => console.log(err));
}

if (process.argv.length === 3) {
    //connecting to database
    mongoose
        .connect(url)
        .then((result) => {
            console.log('VIEW LIST:');

            //goes through each array and logs it out for viewing
            Person.find({}).then((result) => {
                result.forEach((pers) => {
                    console.log(`${pers.name} - ${pers.number}`);
                });
                mongoose.connection.close();
            });

            return;
        })
        .catch((err) => console.log(err));
}
