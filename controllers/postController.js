const Post = require('../models/post.js');
const express = require('express');
const postRoutes = express.Router();
const User = require('../models/user.js');
const Comment = require('../models/comment.js');
const shortid = require('short-id');

postRoutes.get('/', (req, res) => {
    Post.find().then((post) => {
        res.render('home', {
            post: post
        });
    })
        .catch((err) => {
        console.log(err);
    })
})

postRoutes.get('/post-new', (req,res) => {
    res.render('new-post');
})



postRoutes.post('/posts', (req, res) => {

    if (!req.files) {
        return res.status(400).send('No files were selected')
    }

    const body = req.body;
    // Get the image data from the req.body
    const imageFile = req.files.image;
    // Split the name on the .
    const fileNameArray = imageFile.name.split('.');
    // get the file extension
    const fileExtsion = fileNameArray[fileNameArray.length - 1];
    // generate a short id with the same file extension
    const filePath = `/${shortid.generate()}.${fileExtsion}`;
    // Define the upload path
    const uploadPath = `./uploads/${filePath}`;
    
    imageFile.mv(uploadPath, (err) => {
        if(err){
            console.log(err);
            return res.status(500);
        }
        
    })

    Post.create(req.body).then((post) => {
        post.imageRoute = filePath;
        console.log(post)
        post.save();
        res.redirect(`/posts/${post._id}`) // Redirect to post/:id
    }).catch((err) => {
        console.log(err.message)
    })
})

postRoutes.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).then((post) => {
        Comment.find( {postId: req.params.id} ).then(comment =>
                                                     res.render('post-view', {
            post: post,
            comment: comment,
            postId: req.params.id
        }))
    }).catch((err) => {
        console.log(err.message);
    })
})

postRoutes.delete('/posts/:id', (req, res) => {
    console.log(`delete ${req.params.id} `)
    Post.findByIdAndRemove(req.params.id).then((post) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(er.message);
    })
})

module.exports = postRoutes;
