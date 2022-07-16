require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const People = require('./models/people');
const PORT = process.env.PORT;

let phonebook = [
    {
        id: 1,
        name: 'John Farina',
        number: '555-5555',
    },
    {
        id: 2,
        name: 'Greg',
        number: '123-1234',
    },
    {
        id: 3,
        name: 'Patrick',
        number: '777-1111',
    },
    {
        id: 4,
        name: 'Mary Poppens',
        number: '39-23-6423122',
    },
];

app.use(cors());

app.get('/', (request, response) => {
    response.send('<h1>PhoneBook Swag</h1>');
});

app.get('/api/phonebook', (request, response) => {
    People.find({}).then((person) => {
        response.send(person);
    });
});

app.post('/api/phonebook', (request, response) => {
    const body = request.body;

    if (body.name === undefined) {
        return response.status(400).json({ error: 'missing content' });
    }

    const person = new People({
        name: body.name,
        number: body.number,
        date: new Date(),
    });

    person.save().then((savedPerson) => {
        response.json(savedPerson);
    });
});

app.get('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id);
    const persons = phonebook.find((phone) => phone.id === id);

    if (persons) {
        response.json(persons);
    } else {
        response.status(404).end();
    }
});
app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id);

    //removes the object with the same id as requested
    phonebook = phonebook.filter((phone) => phone.id !== id);

    response.status(204).end();
});

//CREATES INFO PAGE
app.get('/info', (request, response) => {
    const newDate = new Date();
    response.send(`<h3>phonebook has ${phonebook.length} people</h3>
    <p>${newDate}</p>`);
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});

//heroku create (MAKES HEROKU SERVER)
//git push heroku main (PUSHES THE GIT REPO INTO HEROKU MAIN FOR THIS WEBSITE (no clue how it works but it does))
