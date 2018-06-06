const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/DropStore',
    port: process.env.PORT || 8081,
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
      }
  };

module.exports =  config;