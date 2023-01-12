const { logger } = require("../../utills/logger");
const { TaskModel } = require("../../models");

const createTask = async (req, res) => {
  try {
    logger().info(`Creating tasks ${JSON.stringify(req.currentUser)}`);
    const taskCreated = await TaskModel.create({
      userId: req.currentUser.id,
      name: req.body.name,
    });

    res.status(200).send({
      status: 200,
      task: {
        id: taskCreated.id,
        name: taskCreated.name,
      },
    });
  } catch (error) {
    logger().error("Error while creating task!", error);
    return res.status(500).send({
      status: 500,
      message: `${error.message}`,
    });
  }
};
const allTaskListing = async (req, res) => {
  try {
    logger().info(`fetching all tasks`);
    const limit = +req.params?.limit || 10;
    const pageNum = +req.params?.pageNum || 1;
    const offset = (+pageNum - 1) * limit;

    logger().info(pageNum, limit, offset);

    const allTasks = await TaskModel.findAndCountAll({
      where: {
        userId: req.currentUser.id,
      },
      attributes: ["id", "name"],
      order: [["id", "DESC"]],
      limit: limit,
      offset: offset,
    });
    console.log({ allTasks });
    res.status(200).send({
      status: 200,
      tasks: allTasks.rows,
      pagination: {
        totalItems: allTasks.count,
        pageNum,
        entriesPerPage: limit,
      },
    });
  } catch (error) {
    logger().error("Error while listing Tasks!", error);
    res.status(500).send({
      status: 500,
      message: `${error.message}`,
    });
  }
};

module.exports = {
  createTask,
  allTaskListing,
};
