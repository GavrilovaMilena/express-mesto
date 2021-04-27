const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Рик Санчез',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Гениальный учёный',
  },
  avatar: {
    type: String,
    default:
      'http://pm1.narvii.com/6878/7590f2750286a5952f65d5a0ebebc8f328b8163br1-720-901v2_00.jpg',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
