const router = require("express").Router();
const ResponseManager = require("../helpers/response-manager.helper");
const Data = require("../model/data.model");

/**
 * @swagger
 * components:
 *   schemas:
 *     Data:
 *       type: object
 *       required:
 *         - price_upper
 *         - price_lower
 *         - data_date
 *         - data_time
 *         - open_price
 *         - opentime
 *       properties:
 *         id:
 *           type: array
 *           description: The auto-generated id of data
 *           data:
 *             - test:
 *
 *         price_upper:
 *           type: string
 *           description: 2 ตัวบน
 *         price_lower:
 *           type: string
 *           description: 2 ตัวล่าง
 *         data_date:
 *           type: string
 *           description: วันที่ของข้อมูลที่ได้
 *         data_time:
 *           type: string
 *           description: เวลาของข้อมูลที่ได้
 *         open_price:
 *           type: string
 *           format: string
 *           description: เลขเปิดตลาด
 *         opentime:
 *           type: string
 *           format: string
 *           description: เวลาเปิดตลาด
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

router.route("/").get(async (req, res) => {
  try {
    const option = { limit: req.query.limit, offset: req.query.offset };
    const [totalCount, result] = await Promise.all([
      (await Data.find()).length,
      await Data.find().skip(option.offset).limit(option.limit),
    ]);
    ResponseManager.getSuccessResponseListData(res, totalCount, result, option);
  } catch (error) {
    ResponseManager.getErrorResponseListData(res, error);
  }
});

router.route("/:date").get(async (req, res) => {
  try {
    const option = { limit: req.query.limit, offset: req.query.offset ?? 0 };
    const [totalCount, resultByDate] = await Promise.all([
      (await Data.find({ data_date: req.params.date })).length,
      await Data.find({ data_date: req.params.date })
        .skip(option.offset)
        .limit(option.limit),
    ]);
    ResponseManager.getSuccessResponseListData(
      res,
      totalCount,
      resultByDate,
      option
    );
  } catch (error) {
    ResponseManager.getErrorResponseListData(res, error);
  }
});

module.exports = router;
