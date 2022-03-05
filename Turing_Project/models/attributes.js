module.exports=(knex,app) =>{

// getting all the  data  
app.get('/attributes', (req, res) => {
    knex().select('*').from('attribute')
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
app.get('/attributes/:id', (req, res) => {
    knex.from('attribute').select('*').where('attribute_id',req.params.id)
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
app.get('/attributes/values/:id', (req, res) => {
    knex.select('attribute_value_id','value')
    .from('attribute_value').where('attribute_value_id',req.params.id)
        .then((data) => {
            console.log('data is coming!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})


// getting  products joining two tables
app.get('/attributes/inProducts/:id', (req, res) => {
    knex.select('name As attribute_name',"value As attribute_value", "attribute_value_id").from('attribute').
    join("attribute_value",function (){
        this.on("attribute.attribute_id", "attribute_value.attribute_id ")
    }).where("attribute_value_id",req.params.id)
        .then((data) => {
            console.log(data,"data");
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})

}
