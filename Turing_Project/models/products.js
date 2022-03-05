module.exports=(knex,app) =>{

// getting all the  data  
app.get('/products', (req, res) => {
    knex.select('product_id','name','description','price','discounted_price','thumbnail').from('product')
        .then((data) => {
            var count=0
            for (var i of data){
                count+=1
            
            }
            res.send({'count':count,"row":data})
            console.log('data is coming!....');
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})


// products/search 
app.get('/products/:search', (req, res) => {
    knex.from('product').select("*").where("name",req.params.search)
        .then((data) => {
            var count=0
            for (var i of data){
                count+=1
            
            }
            res.send({'count':count,"row":data})
            console.log('data is coming!....');
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})




// getting data from id
app.get('/products/:id', (req, res) => {
    knex.from('product').select('*').where('product_id',req.params.id)
        .then((data) => {
            console.log('data is coming!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})


// getting data from category id (joning two tables)
app.get('/products/inCategory/:id', (req, res) => {
    knex.select("product.product_id",'name','description','price','discounted_price','thumbnail').from('product').
    join("product_category",function (){
        this.on("product.product_id", "product_category.product_id ")
    }).where("category_id",req.params.id)
        .then((data) => {
            var count=0;
            for (var i of data){
                count+=1
            }
            console.log(data,"data");
            res.send({"Count":count,'row':data})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})

// departmentid
app.get('/products/inDepartment/:id', (req, res) => {
    knex.select('product_id','product.name','product.description','price','discounted_price','thumbnail').from('product').
    join("department",function (){
        this.on("product.product_id", "department.department_id ")
    }).where("department_id",req.params.id)
        .then((data) => {
            var count=0;
            for (var i of data){
                count+=1
            }
            console.log(data,"data");
            res.send({"Count":count,'row':data})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})

// Details
app.get('/products/:id/details', (req, res) => {
    knex.select('product_id','name','description','price','discounted_price','image','image_2').from('product').where('product_id',req.params.id)
        .then((data) => {
            console.log('data is coming!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})

// location joining two tables  category and department
app.get('/products/:id/locations', (req, res) => {
    knex.
    from('department').
    select("category_id","category.name As category_name","department.department_id","department.name As department_name").
    join("category",function (){
        this.on("department.department_id ","category.department_id")
    }).
    where("category_id",req.params.id)
        .then((data) => {
            console.log(data,"data");
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})


// getting reiew
app.get('/products/:id/reviews', (req, res) => {
    knex.select('review.name','review.review','rating','created_on').from('product').
    join('review',function(){
        this.on('product.product_id','review.product_id')
    })
    .where('product.product_id',req.params.id)
        .then((data) => {
            console.log('data is coming!....');
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
})


// inserting  data in review table
app.post('/products/:id/reviews',(req,res) =>{
    knex("review").insert({
        customer_id: req.body.customer_id,
        product_id: req.body.product_id,
        review : req.body.review ,
        rating : req.body.rating ,
        created_on: req.body.created_on,
        name : req.body.name
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
