const mongoose = require('mongoose');
const crypto = require('crypto');
//generate unique strings
const uuidv1 = require('uuid').v1;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //spaces in the beginning or end are trimmed out
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      //spaces in the beginning or end are trimmed out
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      //spaces in the beginning or end are trimmed out
      trim: true,
    },
    //used to generate hashed password
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//virtual field
//Virtuals have additional attribute but it does not get inserted into DB. So this will make it visible to us in the output
//this is adding on a virtual type with extra data to the Schema, virtual types don't get added to the database
//
//should be invoked everytime a new user is created
//acccepting password from front-end and creating a virtual called 'password'
UserSchema.virtual('password')
  //get password from the client side
  .set(function (password) {
    //create a temporary property in schema called '_password'
    this._password = password;
    //uuidv1 will give us a random string and salt to hash the password
    //set current schema 'salt' property to  random string and hash it
    this.salt = uuidv1();
    //call upon a method to encrypt the client's password and assign it to the schema's password property
    this.hashed_password = this.encryptPassword(password);
  })
  //and then invoke function returning the user's password
  .get(function () {
    return this._password;
  });

//methods that can be accessed from other components
UserSchema.methods = {
  //receive user plain password
  authenticate: function (plainText) {
    //return true or false if the users hashed password is the same as the db schema user's password
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  //method named 'encryptPassword' will be invoked when called
  encryptPassword: function (password) {
    //if no password return nothing and then end
    if (!password) return '';
    try {
      return (
        crypto
          //hashing the password
          //'sha256' is the name of the algorithm
          .createHmac('sha256', this.salt)
          //change the password passed in to the created random hash on top
          .update(password)
          .digest('hex')
      );
    } catch (err) {
      return '';
    }
  },
};

module.exports = mongoose.model('User', UserSchema);
