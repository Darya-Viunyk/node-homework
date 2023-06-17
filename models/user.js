/** @format */

const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { handleMongooseError } = require("../helpers");

const userSignUpSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 4,
    },
    email: {
      type: String,
      required: [true, " email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSignUpSchema.post("save", handleMongooseError);

userSignUpSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const joiSignInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSignUpSchema);

module.exports = {
  User,
  joiSignUpSchema,
  joiSignInSchema,
  joiSubscriptionSchema,
};