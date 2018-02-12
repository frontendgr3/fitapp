const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const validator = require('validator');

const { Schema } =  mongoose;

const userSchema = new Schema ({
  username: {
    unique: true,
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },
  provider: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});


userSchema.pre('save', function (next) {
  const user = this;

  if(user.isModified('password', userSchema)) {
    bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
})

userSchema.statics.findUserByCredentials = function (username, password) {
  const User = this;
  return User.findOne({ username }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (!res) {
          reject();
        }
        resolve(user);
      });
    });
  });
};

mongoose.model('users', userSchema);
