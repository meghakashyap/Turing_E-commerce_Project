module.exports=(knex,app) =>{

// inserting  data in  customers   table
app.post('/review',(req,res) =>{
    knex("review").insert({
        customer_id: req.body.customer_id,
        product_id: req.body.product_id,
        review : req.body.review ,
        rating : req.body.rating ,
        created_on: req.body.created_on,
        name:req.params.name
    })
    .then((data)=>{
        console.log(data,'data inserted successfully')
        res.send(data)
    })
    .catch((err)=>{
        console.log("err")
        res.send(err)
    })
})





}