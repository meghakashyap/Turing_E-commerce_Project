module.exports=(knex,app) =>{

// getting all the  data  
app.get('/departments', (req, res) => {
    knex().select('*').from('department')
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
app.get('/departments/:id', (req, res) => {
    knex.from('department').select('*')
    .where('department_id',req.params.id)
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