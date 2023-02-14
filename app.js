const express = require('express')
const cors = require('cors')
const fs = require('fs');
const path = require('path')
require("dotenv").config()


// database or sequelize database import

const sequelize = require('./util/database')

// database models import
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

// graphql imports
const {graphqlHTTP} = require('express-graphql')
const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers')

// production tools import
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express()

// production 
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  );
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));


app.use(express.json());
app.use(cors({
    origin: '*',    
}));
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,
    //     formatError(err) {
    //     if (!err.originalError) {
    //       return err;
    //     }
    //     const data = err.originalError.data;
    //     const message = err.message || 'An error occurred.';
    //     const code = err.originalError.code || 500;
    //     return { message: message, status: code, data: data };
    //   }
    })
  );


  app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode  || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

// Defining Relations
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})
User.hasMany(Order)
Order.belongsToMany(Product, {through: OrderItem})

sequelize.sync(
    // {force: true}
).then(
  result => {
    app.listen(process.env.PORT || 8000);
  }
) 

// .then(result =>{
//     return User.findByPk(1)
// })
// .then(user => {
//     if(!user) {
//         User.create({name: 'Ahmad Abdulkadir', email: 'ahmadabdulkadir245@gmail.com'})
//     }
//     return user
// })
// .then(user => {
//     return user.createCart()
// })
// .then(cart => {
//     app.listen(process.env.PORT || 8080);
// })
.catch(err => console.log(err))

