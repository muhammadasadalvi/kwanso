const { logger } = require("../../utills/logger");
const { passwordGenerator } = require("../../utills/helpers");
const { UserModel, OauthTokenModel } = require("../../models");
// bcrypt to make the hash of password
const bcrypt = require("bcrypt");
// jwt for generating token
const jwt = require("jsonwebtoken");
const { auth_secret } = require("../../config/auth.config");
const { Op } = require("sequelize");
const hashSalt = 8; // salt rounds to make hash of password

const signUp = async (req, res) => {
  try {
    logger().info(`Creating User ${JSON.stringify(req.body.email)}`);
    logger().info(`Before signing Up vlaidation if email  already exists`);
    const validateUser = await UserModel.findAll({
      where: {
        [Op.or]: [
          {
            email: req.body.email,
          },
        ],
      },
    });
    if (validateUser && validateUser.length > 0) {
      return res.status(400).send({
        status: 400,
        message: "Email already exist please try another!",
      });
    }

    // creating user
    const user = await UserModel.create({
      password: bcrypt.hashSync(req.body.password, hashSalt), // convert password to hash
      email: req.body.email,
    });

    res.status(200).send({
      status: 200,
      User: {
        user: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    logger().info(`Error Occured While Signing Up! ${error}`);
    res.status(400).send({
      status: 400,
      message: "Something Went Wrong!",
    });
  }
};

const signIn = async (req, res) => {
  try {
    logger().info(`Singing in the user`);
    const user = await UserModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    // if user does not exist, send response back
    if (!user) {
      res.status(400).send({
        status: 400,
        message: `User with ${req.body.email} not found`,
      });
      return;
    }

    let password = req.body.password;

    // comparing password of user with hash we generated while signing up
    const isPasswordValid = bcrypt.compareSync(
      password,
      user.dataValues.password
    );
    logger().info("PasswordIsValid:", isPasswordValid);
    if (!isPasswordValid) {
      res.status(400).send({
        status: 400,
        message: `Password Not Valid`,
      });
      return;
    }
    // generating token with auth secret and embeding id of user
    const token = jwt.sign({ id: user.dataValues.id }, auth_secret, {
      expiresIn: 86400,
    });
    logger().info("saving user token");
    await OauthTokenModel.upsert({
      userId: user.dataValues.id,
      token: token,
    });

    res.status(200).send({
      status: 200,
      access_token: token,
      user: {
        email: user.dataValues.email,
      },
    });
  } catch (error) {
    logger().info(`Error while signing in ${error}`);
    res.status(500).send({
      status: 500,
      message: "Something Went Wrong!",
    });
  }
};

const getUser = async (req, res) => {
  try {
    logger().info(`fetching user`);
    const authHeader = req.headers["authorization"];
    const user = await UserModel.findOne({
      where: {
        id: req.currentUser.id,
      },
    });
    if (!user) {
      return res.status(400).send({
        status: 400,
        message: "user not found",
      });
    }

    return res.status(200).send({
      status: 200,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    logger().info(`error while fetching user details ${error}`);
    return res.status(500).send({
      status: 500,
      message: "error while fetching user",
    });
  }
};

module.exports = {
  signUp,
  signIn,
  getUser,
};
