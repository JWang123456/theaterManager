const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];

var validate = (request) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(request, schema);
};


app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find( (c) => {
        return c.id === parseInt(req.params.id)
    }); 

    if(!genre) return res.status(404).send('404 not found');
    res.send(genre);
});

app.post('/api/genres', (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find( (c) => {
        return c.id === parseInt(req.params.id)
    }); 

    if(!genre) return res.status(404).send('no such resource exist, post one?');
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find( (c) => {
        return c.id === parseInt(req.params.id)
    }); 

    if(!genre) return res.status(404).send('no such resource exist');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})

const port = process.env.port || 3000;
app.listen(port, () => {console.log(`Listen on ${port}`)});