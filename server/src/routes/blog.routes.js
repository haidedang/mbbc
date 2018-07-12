const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController')

//JUST FOR TESTING
router.route('/blogs/')
  .post(BlogController.sendBlog)

// Getting last 10 blogs from user
router.route('/blogs')
  .get(BlogController.getBlogs)

//Sending blog notification to recipient server
router.route('/blogs/:recipient')
    .post(BlogController.sendNotification)

//---------------
//Deprecated
// Get one blog by userId
router.route('/blogs/:userId')
  .get(BlogController.getBlogByUser)

// Add a new Blog
router.route('/blog')
  .post(BlogController.addBlog)

// Delete a blogs by cuid
router.route('/blogs/:id')
  .delete(BlogController.deleteBlog)


module.exports = router; 

