const express = require('express')
const Joi = require('joi');
const app = express();
app.use(express.json());

const categories = [
    {id: 1, name: `Dasturlash`},
    {id: 2, name: `Malumotlar Bazasi`},
    {id: 3, name: `Tarmoqlar havfsizliki`}
]


app.get('/api/categories', function (req, res) {
    res.send(categories)
})


app.post('/api/categories', (req, res) => {

    // const {error} = validateCategory(req.body)
    // if(error)
    //     return res.status(400).send(error.details[0].message)

    const category = {
        id: categories.length + 1,
        name: req.body.name
    }

    categories.push(category)
    res.status(201).send(category)

})

app.get('/api/categories/:id', (req, res) => {

    const category = categories.find(c => c.id === parseInt(req.params.id))
    if(!category)
         return res.status(404).send('Berilgan Category listdan topilmadi!')
          
     res.send(category)
 })


app.put('/api/categories/:id', (req, res) => {

   const category = categories.find(c => c.id === parseInt(req.params.id))
   if(!category)
        return res.status(404).send('Berilgan Category listdan topilmadi!')

    // const {error} = validateCategory(req.body)
    // if(error)
    //     return res.status(400).send(error.details[0].message)
        
    category.name = req.body.name
    res.send(category)

})

app.delete('/api/categories/:id', (req, res) => {

    const category = categories.find(c => c.id === parseInt(req.params.id))
    if(!category)
         return res.status(404).send('Berilgan Category listdan topilmadi!')
 
    const categoryIndex = categories.indexOf(category)
    categories.splice(categoryIndex, 1)

    res.send(category)

 })

function validateCategory(category){
    const categorySchema ={
        name: Joi.string().required().min(3)
    };
    return Joi.validate(category, categorySchema);
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
      console.log(`${port}chi portni eshitishni boshladim...`);
});