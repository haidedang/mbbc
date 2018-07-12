const Blog = require('../models/Blog');

const server = require('../server');

var counter = 0;



/**
 * Get last 10 blogs from user
 *
 * @param req
 * @param res
 */
exports.getBlogs= (req, res) =>{
    Blog.find()
      .sort('timestamps')
      .limit(10)
      .exec((err, Blogs) => {
        if (err) {
          res.status(500)
            .send(err)
        }
        res.json({ Blogs: Blogs })
      })
  }
  
 
  /**
   * Finds Blog by userId.
   *
   * @param req
   * @param res
   */
  exports.getBlogByUser= (req, res) =>{
    Blog.findOne({ userId: req.params.userId })
      .exec((err, Blog) => {
        if (err) {
          res.status(500)
            .send(err)
        }
        res.json({ Blog: Blog })
      })
  }
  
  /**
   * Add Blog.
   *
   * @param req
   * @param res
   */
  exports.addBlog= (req, res) =>{
    const newBlog = new Blog(req.body)
    newBlog.save((err, saved) => {
      if (err) {
        res.status(500)
          .send(err)
      }
      res.json({ Blog: saved })
    })
  }
  
  /**
   * Delete Blog.
   *
   * @param req
   * @param res
   */
  exports.deleteBlog= (req, res) =>{
    Blog.findOne({ id: req.params.id })
      .exec((err, Blog) => {
        if (err) {
          res.status(500)
            .send(err)
        }
  
        Blog.remove(() => {
          res.status(200)
            .end()
        })
      })
  }

//Saving blog in MongoDB
exports.sendBlog = function (req, res, next) {
  const blog = new Blog({ 
      userID: req.body.userID,
      content: req.body.content
    })
    blog.save((err, result) => { 
      if (err) {
          res.send({ error: err });
          return next(err);
      }
    return res.status(200).json({ blog: result });
})

}

// --- New for blog controller  \\
//Client sends a new blog to its server

//We need username and ETHERID
//UserID can be stored in req.body.userID
//OR
//UserID can be stored in req.body.content: "You have a new blog"
//Need also: BlogID
exports.sendNotification = function (req, res, next) {

  //Incrementing server counter
//  counter++;
  console.log(counter);

  //Sending Notification to Client
  for (var key in server.io.sockets.sockets) {
      console.log(key)
      console.log(server.io.sockets.sockets[key].username)
      if (server.io.sockets.sockets[key].username == undefined)
          return
      if (server.io.sockets.sockets[key].username.username == req.params.recipient){
          server.io.to(key).emit('reply', req.body.userId);
      }
          
  }

}

//Set the counter to 0 when the Client fetches the blogs
exports.resetCounter = function (req, res, next) {
  console.log(counter);
  counter = 0;
}