const { logger } = require('./logger')
module.exports = (err, req, res, next) => {
    logger().error(`Error: Route => ${req.orignalUrl} Body => ${JSON.stringify(req.body)}`);
    logger().error(`Error ${err}`);
    res.status(500).send({
        status: 500,
        message: "Something Went Wrong!"
    });
}