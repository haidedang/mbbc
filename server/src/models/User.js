module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userID: {
      type: DataTypes.STRING,
      unique: true
    }, 
    address: { 
      type: DataTypes.STRING,
      unique: true
    }
  })
  return User
}
