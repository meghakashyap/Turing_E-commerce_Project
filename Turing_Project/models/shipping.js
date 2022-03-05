module.exports=(knex,app) =>{

// getting all the  data  
app.get('/shipping/regions', (req, res) => {
    knex().select('*').from('shipping_region')
        .then((data) => {
            console.log('data is coming!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})


app.get('/shipping/regions/:id', (req, res) => {
    knex.select("shipping_id","shipping_type","shipping_cost","shipping.shipping_region_id")
    .from('shipping').
    join("shipping_region",function (){
        this.on( "shipping.shipping_region_id ","shipping_region.shipping_region_id")
    }).
    where("shipping.shipping_region_id",req.params.id)
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