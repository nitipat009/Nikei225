const ManagerController = require("../services/manager-controller");

const router = require("express").Router();

router.route("/").get(async (req, res) => {
  res.json({
    status: ManagerController.intervalRef ? true : false,
  });
});

module.exports = router;
