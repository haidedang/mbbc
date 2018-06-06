const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/CryptoStorage',
    port: process.env.PORT || 8082,
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
      }
  };

module.exports =  config;