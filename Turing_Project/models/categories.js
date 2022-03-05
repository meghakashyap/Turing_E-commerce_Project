module.exports=(knex,app) =>{

// getting all the  data  
app.get('/categories', (req, res) => {
    knex().select('*').from('category')
    .orderBy('category_id','name')
    .limit(20)
        .then((data) => {
            var count=0
            for (var i of data){
                count+=1
            }
            console.log('data is coming!....');
            res.send({"Count" : count,"row" : data})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})

//  getting all the  data  from id
app.get('/categories/:id', (req, res) => {
    knex.select('category_id','name','description','department_id').
    from('category').where('category_id',req.params.id)
        .then((data) => {
            console.log('data is coming!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})


// product id
app.get('/categories/inProduct/:id', (req, res) => {
    knex.select('category_id','department_id','name')
    .from('category').where('category_id',req.params.id)
        .then((data) => {
            console.log('data is coming!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})

// departmet id
app.get('/categories/inDepartment/:id', (req, res) => {
    knex.from('category').select('*').where('department_id',req.params.id)
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