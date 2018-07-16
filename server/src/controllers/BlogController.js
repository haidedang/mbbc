const Blog = require('../models/Blog');

const server = require('../server');
const Notification = require('../models/Notification');
/* var counter = 0; */



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
exports.sendNotification = async function (req, res, next) {

  //Incrementing server counter
  /* counter++;
  console.log('Counter', counter); */

  let counter; 

  let notification = await Notification.findOne({userID:req.params.recipient })

  if(!notification){ 
    const noti = await new Notification({userID:req.params.recipient, counter: 1}); 
    noti.save().then(result =>console.log(result))
    counter = noti.counter; 
  } else { 
    notification.counter = notification.counter +1;
    console.log('HERE',notification.counter);
    await Notification.findOneAndUpdate({userID: req.params.recipient}, {counter:notification.counter }, (err, data)=> { 
      if (err) { 
        console.log(err); 
      }
      console.log('RESULT',data);
      counter = notification.counter; 
      console.log('after', counter)
    })
  }

  //Sending Notification to Client
  for (var key in server.io.sockets.sockets) {
      console.log(key)
      console.log('USERNAME', server.io.sockets.sockets[key].username)
      if (server.io.sockets.sockets[key].username == undefined)
          return
      if (server.io.sockets.sockets[key].username.username == req.params.recipient){
          console.log('FUCK THIS',counter);
         server.io.to(key).emit('blogEntry', counter);
      }
          
  }

}

//Set the counter to 0 when the Client fetches the blogs
exports.resetCounter = function (req, res, next) {
  console.log(counter);
  counter = 0;
}