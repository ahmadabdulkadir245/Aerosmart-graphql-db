const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const Product = require('../models/product')
const User = require('../models/user');


module.exports = {
    createProduct: async function({ productInput }, req) {
        // if (!req.isAuth) {
        //   const error = new Error('Not authenticated!');
        //   error.code = 401;
        //   throw error;
        // }


        // const errors = [];
        // if (
        //   validator.isEmpty(productInput.title) ||
        //   !validator.isLength(productInput.title, { min: 5 })
        // ) {
        //   errors.push({ message: 'Title is invalid.' });
        // }
        // if (
        //   validator.isEmpty(productInput.price) ||
        //   !validator.isLength(productInput.price, { min: 2 })
        // ) {
        //   errors.push({ message: 'Price is invalid.' });
        // }
        // if (
        //   validator.isEmpty(productInput.ImageUrl) ||
        //   !validator.isLength(productInput.ImageUrl, { min: 5 })
        // ) {
        //   errors.push({ message: 'ImageUrl is invalid.' });
        // }
        // if (
        //     validator.isEmpty(productInput.description) ||
        //     !validator.isLength(productInput.description, { min: 5 })
        //     ) {
        // }
        //   errors.push({ message: 'Description is invalid.' });
        // if (errors.length > 0) {
        //   const error = new Error('Invalid input.');
        //   error.data = errors;
        //   error.code = 422;
        //   throw error;
        // }


        // const user = await User.findById(req.userId);
        // if (!user) {
        //   const error = new Error('Invalid user.');
        //   error.code = 401;
        //   throw error;
        // }
        const createdProduct = await Product.create({
            title: productInput.title,
            price: productInput.price,
            imageUrl: productInput.imageUrl,
            description: productInput.description,
            // userId: req.user.id
          })
        // const post = new Post({
        //   title: productInput.title,
        //   content: productInput.content,
        //   imageUrl: productInput.imageUrl,
        // //   creator: user
        // });
        // const createdPost = await post.save();
        // user.posts.push(createdPost);
        // await user.save();
        return {
          id: createdProduct.id.toString(),
          title: createdProduct.title,
          price: createdProduct.price,
          imageUrl: createdProduct.imageUrl,
          description: createdProduct.description,
          createdAt: createdProduct.createdAt.toISOString(),
          updatedAt: createdProduct.updatedAt.toISOString()
        };
      },

      products: async function({ page }, req) {
        // if (!req.isAuth) {
        //   const error = new Error('Not authenticated!');
        //   error.code = 401;
        //   throw error;
        // }
        if (!page) {
          page = 1;
        }
        const perPage = 2;
        const totalPosts = 3;
        const products = await Product.findAll()
          // .sort({ createdAt: -1 })
          // .skip((page - 1) * perPage)
          // .limit(perPage)
          // .populate('creator');
        return {
          products: products.map(product => {
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl,
                description: product.description,
                createdAt: product.createdAt.toISOString(),
                updatedAt: product.updatedAt.toISOString()
            };
          }),
          totalPosts: totalPosts
        };
      },
      product: async function({ id }, req) {
        // if (!req.isAuth) {
        //   const error = new Error('Not authenticated!');
        //   error.code = 401;
        //   throw error;
        // }
        // const post = await Post.findById(id).populate('creator');
        const product = await Product.findByPk(id)

        Product.findByPk(id)
        .then(product => {
          return product
        })
        .catch(err => console.log(err))
      
   
        // JSON.stringify(product)
        console.log(`THIS IS THE SINGLE PRODUCT IN THE BACKEND ID ${id}`)
        console.log(`THIS IS THE SINGLE PRODUCT IN THE BACKEND ${JSON.stringify(product)}`)

        if (!product) {
          const error = new Error('No post found!');
          error.code = 404;
          throw error;
        }
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description,
          createdAt: product.createdAt.toISOString(),
          updatedAt: product.updatedAt.toISOString()
        };
      },
}