const {Schema, model} = require('mongoose')

const User = new Schema({
  first_name: {type:String, required:true},
  last_name: {type:String, required:true},
  email:{type:String, required:true, unique:true},
  password: {type:String, required:true},
  phone: {type:Number, required:true}
})

module.exports = model('User', User)