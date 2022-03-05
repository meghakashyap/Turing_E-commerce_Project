module.exports=(knex,app) =>{

// getting all the  data  
app.get('/tax', (req, res) => {
    knex().select('*').from('tax')
        .then((data) => {
            console.log('data is coming!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})

// getting data by id
app.get('/tax/:id', (req, res) => {
    knex.from('tax').select('*').where('tax_id',req.params.id)
        .then((data) => {
            console.log('data is coming!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})
}