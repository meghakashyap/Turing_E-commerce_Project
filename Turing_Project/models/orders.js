module.exports=(knex,app) =>{



// POSTING THE DATA
app.post('/orders',(req,res) =>{
    knex("orders").insert({
        order_id : req.body.order_id ,
        total_amount: req.body.total_amount,
        created_on : req.body.created_on ,
        shipped_on  : req.body.shipped_on  ,
        status : req.body.status ,
        comments  : req.body.comments  ,
        customer_id : req.body.customer_id,
        auth_code   : req.body.auth_code   ,
        reference  : req.body.reference ,
        shipping_id  : req.body.shipping_id ,
        tax_id     : req.body.tax_id     
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


// posting the data in order_detail
app.post('/order_details',(req,res) =>{
    knex("order_detail").insert(req.body)
    .then((data)=>{
        console.log(data,'data inserted successfully')
        res.send(data)
    })
    .catch((err)=>{
        console.log("err")
        res.send(err)
    })
})

// order by id
app.get('/orders/:order_id',(req,res)=>{
    knex().select("*").from("order_detail")
    .where("order_id",req.params.order_id)
        .then((data)=>{
            for (i of data){
                i["subtotal"] = i.quantity*i.unit_cost
                console.log(i)
            }
            res.send(i)
            console.log(i,"data is coming")
        }).catch((err)=>{
            res.send(err)
            console.log("Error",err)
        })
})






// get info about order
app.get("/orders/shortDetail/:order_id",(req,res)=>{
    knex().select("order_id","total_amount","created_on","shipped_on","status","name").from("orders").
    join("customer", 'orders.customer_id', '=', 'customer.customer_id').
    where("order_id",req.params.order_id)
        .then((data)=>{
            res.send(data)
            console.log("Data is coming")
        })
        .catch((err)=>{
            res.send(err)
            console.log(err,"Error")
        })
})

}