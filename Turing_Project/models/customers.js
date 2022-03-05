module.exports=(knex,app) =>{

//updating data from customer id:-
app.put('/customer/:customer_id/',(req,res) => {
    knex().update(req.body).table('customer').where('customer_id',req.params.customer_id)
    .then((data) => {
        res.send("updated data!!",data)
        console.log("updated data!!");

    }).catch((err) => {
        res.send(err)
        console.log("err");
    })
})


// inserting  data in  customers   table
app.post('/customers',(req,res) =>{
    knex("customer").insert({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        credit_card: req.body.credit_card,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        region: req.body.region,
        postal_code : req.body.postal_code ,
        country  : req.body.country  ,
        shipping_region_id  : req.body.shipping_region_id  ,
        day_phone: req.body.day_phone,
        eve_phone: req.body.eve_phone,
        mob_phone: req.body.mob_phone
    })
    .then((data)=>{
        console.log(data,'data inserted successfully')
        res.send(data)
    })
    .catch((err)=>{
        console.log("err")
        req.send(err)
    })
})


// getting all the  Customer data  
app.get('/customer', (req, res) => {
    knex().select('*').from('customer')
        .then((data) => {
            console.log('data is coming!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})


//customer register data:-
app.post('/customers/register',(req,res) => {
    knex('customer').insert(req.body
    ).then((data) => {
        res.send(data)
        console.log("done");
    }).catch((err) => {
        res.send(err)
        console.log(err);
    })

})


// login with jwt token
const jwt = require("jsonwebtoken");
app.post('/customers/login',(req,res) => {
    knex().select('*').from('customer').where('email',req.body.email)
    .then((data) => {
        console.log(data,"....");
        if(data.length >0){
            console.log("iam")
            if(data[0].password == req.body.password){
                const userData = {
                    "customer_id":data[0].customer_id,
                    "name":data[0].name,
                    "email" : data[0].email,
                    "password":data[0].password
                }
                console.log(userData,"?????");
                jwt.sign({"token" : userData },"secretkey",(err,token)=>{
                    console.log("what       ))",token)
                    res.send({"customers":data,"token":token})
                    res.cookie(token)
    
                })
                console.log({msg: 'you have logged in successfully', token: token})
                res.json({msg: 'you have logged in successfully', token: token})
            
            }else{
                console.log("password are wrong!!");
            }
        }else{
            res.send("email wrong!!")
        }
    })
    .catch((err) => {
        res.send(err)
        console.log(err);
    })
})

// update the address  of coustomer
app.put("/customer/address/:id",(req,res)=>{
    knex().update(req.body).table("customer").
    where("customer_id",req.params.id)
    .then((data)=>{
        console.log(data,"Updated  Successful !!")
        res.send("Updated !!")
    }).catch((err)=>{
        console.log("Error in Update",err)
        res.send(err)
    })
})

// update the credit card from customer
app.put('/customers/creditCard/:customer_id/',(req,res) => {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token,"................");
    jwt.verify(token,(err,data) =>{
            knex('customer').where('customer_id',req.params.customer_id)
            .update({
                credit_card: req.body.credit_card 
            }).then(()=> {
                res.send("updated!!")
                console.log("updated");
            }).catch((err) => {
                res.send(err)
                console.log(err);
            })
    })

})

}