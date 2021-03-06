var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');

var app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 }
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/test', testRouter)


app.get('/getManagerData', function (req, res) {
   
 

  
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
   
// hold the data that we going to send back.
var output = '';


  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT orderby, items FROM customerorders;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
   
    var runningTotal = 0;
    
    
    // looping over the records
    for(var i=0; i< result.length; i++){
        output = output + result[i].orderby + '---' + result[i].items + '<br>';
        
            // calculate cost
             var items = result[i].items;
        
             // 
             // 
             var singleTransaction = items.split(',');
        
            // loop over all the items in a single transaction
            
            for(var x=0; x<singleTransaction.length; x++){
                  console.log(singleTransaction[x]);
                  
                  var singleProduct = singleTransaction[x].split('-');
                                     // qty           *        itemCost
                  var cost = Number(singleProduct[1]) * Number(singleProduct[2]);
                  console.log(cost);
                  
                  // add to running total
                  runningTotal = Number(runningTotal) + Number(cost);
            }

            console.log('------------ Next transaction')
         }
         
         output = output + 'Total order cost: ' + runningTotal;
   
     // return the output variable
    res.send(output);   
  });
});


  
  
});







app.post('/getRangeData', function (req, res) {
  
  // 7 or 30
  var range = req.body.range;
 
  
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  

  
   
// hold the data that we going to send back.
var output = '';

var sql = "SELECT orderby, items FROM customerorders WHERE  DATEDIFF(NOW(), `datestamp`) < "+ range;

console.log("range is "+ range);
console.log(sql);



 
 
 
  con.connect(function(err) {
  if (err) throw err;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
   
    var runningTotal = 0;
    
    
    // looping over the records
    for(var i=0; i< result.length; i++){
        output = output + result[i].orderby + '---' + result[i].items + '<br>';
        
            // calculate cost
             var items = result[i].items;
        
             // 
             // 
             var singleTransaction = items.split(',');
        
            // loop over all the items in a single transaction
            
            for(var x=0; x<singleTransaction.length; x++){
                  console.log(singleTransaction[x]);
                  
                  var singleProduct = singleTransaction[x].split('-');
                                     // qty           *        itemCost
                  var cost = Number(singleProduct[1]) * Number(singleProduct[2]);
                  console.log(cost);
                  
                  // add to running total
                  runningTotal = Number(runningTotal) + Number(cost);
            }

            console.log('------------ Next transaction')
         }
         
         output = output + 'Total order cost: ' + runningTotal;
   
     // return the output variable
    res.send(output);
  });
});

 

  
  
});




app.post('/getRangeDatepicker', function (req, res) {
  
  // date stamp in the format YY-MM-DD
  var range = req.body.range;
 
  
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  

  
   
// hold the data that we going to send back.
var output = '';

var sql = "SELECT orderby, items FROM customerorders WHERE  `datestamp` > '"+range+"'";

console.log("range is "+ range);
console.log(sql);



 
 
 
  con.connect(function(err) {
  if (err) throw err;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
   
    var runningTotal = 0;
    
    
    // looping over the records
    for(var i=0; i< result.length; i++){
        output = output + result[i].orderby + '---' + result[i].items + '<br>';
        
            // calculate cost
             var items = result[i].items;
        
             // 
             // 
             var singleTransaction = items.split(',');
        
            // loop over all the items in a single transaction
            
            for(var x=0; x<singleTransaction.length; x++){
                  console.log(singleTransaction[x]);
                  
                  var singleProduct = singleTransaction[x].split('-');
                                     // qty           *        itemCost
                  var cost = Number(singleProduct[1]) * Number(singleProduct[2]);
                  console.log(cost);
                  
                  // add to running total
                  runningTotal = Number(runningTotal) + Number(cost);
            }

            console.log('------------ Next transaction')
         }
         
         output = output + 'Total order cost: ' + runningTotal;
   
     // return the output variable
    res.send(output);
  });
});

 

  
  
});

app.get('/getDriverData', function (req, res) {
   
 

  
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
   
// hold the data that we going to send back.
var output = '';


  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT id, orderby, items FROM customerorders;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
   
    
    
    
    // looping over the records
    for(var i=0; i< result.length; i++){
        output = output + result[i].id + '---' + result[i].orderby + '---' + result[i].items + '<button onclick="markAsDelivered('+result[i].id+')"> Change to delivered </button>     <button onclick="deleteOrder('+result[i].id+')"> Delete </button>                <br>';
        
           
                    
    }
         
 
     // return the output variable
    res.send(output);   
  });
});


  
  
});


app.post('/checkTheLogin', function (req, res) {
   
   // catching the variables
  var username = req.body.username;  
  var pass = req.body.password;
  
  // setting the username into the session 
  req.session.username = username;
  req.session.validSession = true;
  
  
  var timeLeft = req.session.cookie.maxAge / 1000;
  console.log("Time left " + timeLeft);
  
  
  
  
   
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  
  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users WHERE username = '"+username+"' AND PASSWORD = '"+pass+"' LIMIT 1;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    // return the account type back
    res.send(result[0].acctype);
    
  });
});

   
   
  
});

app.get('/getname', function (req, res) {
 
        var path = require("path");
        var fileName = "C:\\image\\test.png";
        var extension = path.extname(fileName);
        var file = path.basename(fileName,extension);

        res.send('images/'+file+extension); 
 
 
});


app.get('/getImage', function (req, res) {
   

  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  
  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT picture FROM products WHERE id = 15", function (err, result, fields) {
    if (err) throw err;
   
    res.send(result[0].picture);
    
    
    
    
    
  });
});

   
   
  
});


app.get('/getImageFromFile', function (req, res) {
   

  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  
  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT picturepath FROM products WHERE id = 1", function (err, result, fields) {
    if (err) throw err;
   
    res.send(result[0].picturepath);
    
    
    
    
    
  });
});

   
   
  
});

app.get('/getProducts', function (req, res) {
   
   
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
    con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * from products", function (err, result, fields) {
    if (err) throw err;
   
    
    var output = '';
    for(var i=0; i < result.length; i++){
        

       output = output + `
       
       <img src="`+result[i].picturepath+`" style="height:150px;width:150px"> 
       
       <div class="ui-field-contain">
            <label for="select-native-2">`+result[i].productname+`</label>
           
        <select id="`+result[i].productname+`_qty" name="select-native-2" id="select-native-2" data-mini="true">
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
         <br>   
         Price: `+result[i].cost+`   
        
        <br>
        <button id="addtocart" onclick="addToCart('`+result[i].productname+`_qty', `+result[i].cost+`)"> Add To Cart </button>

        </div>    
        `;

    }
    

    
    res.send(output);
    
    
    
  });
});

  
  
  
});

app.get('/getImageFromPath', function (req, res) {
   

  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  
  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT picturepath FROM products WHERE id = 18", function (err, result, fields) {
    if (err) throw err;
   
    res.send(result[0].picturepath);
    
    
    
    
    
  });
});

   
   
  
});









app.post('/putInDatabase', function (req, res) {
  
  // catching the variables
  var username = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  var acctype = req.body.acctype;
  
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');

  
 // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO `test`.`users` (`username`, `email`, `password`, `acctype`) VALUES ('"+username+"', '"+email+"', '"+pass+"', '"+acctype+"');";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
  res.send('Data went to the database');
  
  
})
app.get('/putInSession', function (req, res) {

      var cart = req.body.cart;
      
      
      req.session.cart = cart;
      
      res.send("all ok");


});


app.get('/checkIfTimeLeft', function (req, res) {

 
  var timeLeft = req.session.cookie.maxAge / 1000;
  console.log(timeLeft);
  
  if(timeLeft < 1){
      
      res.send('expired');
      
  } else {
      
      res.send('ok');      
  }
  
  
});

app.post('/completeCheckout', function (req, res) {
 
  
  
  // catching the variables
  var orderby = req.body.orderby;
  var items = req.body.items;

  
  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');

  
 // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO `test`.`customerorders` (`orderby`, `items`) VALUES ('"+orderby+"', '"+items+"');";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
  res.send('Data went to the database');
  
  
})



app.post('/updateOrderStatus', function (req, res) {
   
  var id = req.body.id;
  
  

  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  var sql = "UPDATE `test`.`customerorders` SET `orderstatus`='Delivered' WHERE  `id`="+id+";"
  
  console.log(sql);
  
  
  con.connect(function(err) {
  if (err) throw err;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
   
    res.send("ok");
    
    
    
    
    
  });
});

   
   
  
});



app.post('/deleteOrder', function (req, res) {
   
  var id = req.body.id;
  
  

  // put the data in the database
  // pulling in mysql
  var mysql = require('mysql');
   // set up a connection  
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: ""
  });
  
  
  var sql = "DELETE FROM `test`.`customerorders` WHERE  `id`="+id+";"
  
  console.log(sql);
  
  
  con.connect(function(err) {
  if (err) throw err;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
   
    res.send("ok");
    
    
    
    
    
  });
});

   
   
  
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
