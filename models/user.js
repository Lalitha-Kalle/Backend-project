const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      tim: true,
      minLength:1,
      maxLength: 50,
      validate(value) {
        if(!/^[A-Za-z\s\-']+$/.test(value)) {
          throw new Error(
            "first name should contain only letters, spaces, hypens and apostrophes"
          )
        }
      }
    },
    lastName: {
      type: String,
      required: true,
      tim: true,
      minLength:1,
      maxLength: 50,
      validate(value) {
        if(!/^[A-Za-z\s\-']+$/.test(value)) {
          throw new Error(
            "Last name should contain only letters, spaces, hypens and apostrophes"
          )
        }
      }
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if(!validator.isEmail(value)) {
          throw new Error("invalid email id")
        }
      }
    },

    password: {
      type: String,
      validate(value) {
        if(!["male", "female", "others"].includes(value)) {
          throw new Error("invalid gender type")
        }
      }
    },
    about: {
      type: String,
      default: "I am using connectdev",
    },
    photoUrl: {
      type: String,
      default: "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg",
      validate(value) {
        if(!validator.isURL(value)) {
          throw new Error("invalid photo url");
        }
      }
    },
    age: {
      type: Number,
    },
    createdAt: {
      type: Date,
    },
    skills: {
      type: [String],
      validate(value) {
        if(value.length > 10) {
          throw new Error("Skills cannot be more than 10");
        }
      }
    },
    isPremium: {
      type: Boolean,
      default: false
    },
    membershipType: {
      type: String,
    },
    organisation: {
      type: String,
    },
    githubUrl: {
      type: String,
      validate(value) {
        if(value && !validator.isURL(value)) {
          throw new Error("invalid github url")
        }
      }
    },
    linkedlnUrl: {
      type: String,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("invalid linkedln url");
        }
      },
    },
    twitterUrl: {
      type: String,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("invalid X url");
        }
      },
    },
    projectUrl: {
      type: String,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("invalid url");
        }
      },
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.getJwtToken = async function () {
  user = this;
  const token = await jwt.sign({ _id: user._id}, "secret", {
    expiresIn: '7d',
  })
  return token
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  user = this;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );
  return isPasswordValid;
}

const User = mongoose.model("User", userSchema);
module.export = User;