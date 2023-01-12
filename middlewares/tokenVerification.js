const { logger } = require('../utills/logger')
const jwt = require('jsonwebtoken');
const { auth_secret } = require('../config/auth.config')
const { UserModel, OauthTokenModel } = require('../models');

const verifyToken = async (req, res, next) => {
    try {
        logger().info(`Verifying Token before accessing resource`);
        logger().info(`verify token exist against User`);

        // assigning token
        let token = req.headers['authorization'];
        if(!token){
            // if token not exist send response back with unauthorized
            res.status(403).send({
                staus:403,
                message:"Unauthorized!"
            });
        }
        // spliting the token
        token = token.split(" ")[1];

        //verifying token against current user in oauth token model
        const tokenExists = await OauthTokenModel.findOne({
            where: {
                token
            },
            include: [
                {
                    model: UserModel,
                    as:"user"
                }
            ],
        });
        // if token doesn't exist, send response back with unauthorized
        if (!tokenExists) {
            return res.status(403).send({
                status: 403,
                message: "Unauthorized!"
            });
        }
        // console.log(tokenExists);

        // verifying token is valid
        jwt.verify(token, auth_secret, (err, token) => {
            if (err) {
                console.log("unauthrized1");
                return res.send({
                    status: 401,
                    message: "Unauthorized!"
                });
            }
        });
        // setting current user details
        req.currentUser = {...tokenExists.user.dataValues};        
    
        logger().info(`User Data:`,req.currentUser);
        // call the next middleware function
        next();
    } catch (error) {
        logger().info(`Error while veifying token`, error);
        return res.status(500).send({
            status: 500,
            message: "Error while Verifying User Identity"
        });
    }
}

module.exports = verifyToken;