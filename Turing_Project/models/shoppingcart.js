module.exports=(knex,app) =>{

// ADD A PRODUCT IN CART 
app.post('/shoppingcart/add', (req, res) => {
    knex().from('shopping_cart').insert(req.body)
        .then((data) => {
            console.log('data is posting!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})



// Get List of Products in Shopping Cart
app.get('/shoppingcart/:cart_id', (req, res) => {
    knex().select("order_detail.item_id","product.name","shopping_cart.attributes","product.product_id","price","image","order_detail.quantity","subtotal").
    from('shopping_cart').
    join("order_detail","shopping_cart.product_id","=","order_detail.product_id").join("product","product.product_id","=","shopping_cart.product_id")
    .where("cart_id",req.params.cart_id)
        .then((data) => {
            for(i of data){
                console.log(i,"data is coming")
                i["subtotal"]=i["price"]*i["quantity"]
                res.send(i)
            }
          
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
    })


// Update the cart by item
app.put('/shoppingcart/update/:item_id/',(req,res) => {
    knex().update(req.body).table('shopping_cart')
    .where('item_id',req.params.item_id)
        .then((data) => {
            res.send("updated data!!")
            console.log("updated data!!");

        }).catch((err) => {
            res.send(err)
            console.log("ERROR IN UPDATING");
    })
})

//  EMPTY CART
app.delete("/shoppingcart/empty/:cart_id",(req,res)=>{
    knex("shopping_cart")
        .where("cart_id",req.params.cart_id).del()
        .then(()=>{
            res.send("[]")
            console.log("Deleted data Successfully")
        })
        .catch((err)=>{
            res.send(err)
            console.log("Error in deleting")
        })
})


// Move a product to a cart
app.get("/shoppingcart/moveToCart/:item_id",(req,res)=>{
    knex().select("*").from("shopping_cart").
    where("item_id",req.params.item_id)
        .then((data)=>{
            res.send(data)
            console.log("data is coming!!")
        })
        .then((err)=>{
            res.send(err)
            console.log(err,"Error")
        })


})


// Return a total amount from cart
app.get('/shoppingcart/totalAmount/:cart_id', (req, res) => {
    knex.select('quantity','price')
    .from('shopping_cart')
    .join("product","shopping_cart.product_id","=","product.product_id")
    .where('cart_id',req.params.cart_id)
        .then((data) => {
            for (i of data){
                dic ={}
                console.log(i)
                dic["total"] = i["quantity"]*i["price"]
            }
            res.send(dic)
            console.log("data is coming")
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})

// Get Product save for later
app.get("/shopping_cart/getSaved/:cart_id",(req,res)=>{
    knex().select("order_detail.item_id","name","order_detail.attributes","price")
    .from("shopping_cart")
    .join("order_detail","order_detail.product_id","=","shopping_cart.product_id")
    .join("product","product.product_id","=","shopping_cart.product_id")
    .where("cart_id",req.params.cart_id)
        .then((data)=>{
            res.send(data)
            console.log("Data is coming !!")
        })
        .catch((err)=>{
            res.send(err)
            console.log("Error in getting")
        })
})

// Remove a product in a cart
app.delete("/shoppingcart/removeProduct/:item_id",(req,res)=>{
    knex("shopping_cart")
        .where("cart_id",req.params.item_id).del()
        .then(()=>{
            res.send("[]")
            console.log("Deleted data Successfully")
        })
        .catch((err)=>{
            res.send(err)
            console.log("Error in deleting")
        })
})






}









// ADD A PRODUCT IN CART
// app.post('/shoppingcart/add', (req, res) => {
//     knex().select("item_id","product.name","shopping_cart.attribute","product.product_id","price","quantity","image","subtotal").from('shopping_cart').insert(req.body)
//     .join("order_detail","shopping_cart.product_id","=","order_detail.product.id").join("product","product.product_id","=","shopping_cart.product_id")
//     .where("product_id",req.body.product_id)
//         .then((data) => {
//             console.log('data is posting!....');
//             res.send(data)
//         })
//         .catch((err) => {
//             console.log(err);
//             res.send(err)
//         })
// })