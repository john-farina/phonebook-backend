const express = require('express');
const app = express();
const cors = require('cors');
let phonebook = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
];

app.use(cors());

app.get('/', (request, response) => {
    response.send('<h1>PhoneBook Swag</h1>');
});

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});