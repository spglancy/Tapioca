const Post = require('../models/post.js');
const express = require('express');
const postRoutes = express.Router();
const User = require('../models/user.js');
const Comment = require('../models/comment.js');

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
    Post.create(req.body).then((post) => {
        console.log(post)
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
