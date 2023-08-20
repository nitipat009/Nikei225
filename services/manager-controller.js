const Data = require("../model/data.model");
const GetNikkei = require("./get-nikkei");

class ManagerController {
  intervalRef = null;

  static async saveNikkei() {
    try {
      const [data, lastRecord] = await Promise.all([
        await GetNikkei.fetchFromNikkeiHost(),
        await Data.find().sort({ _id: -1 }).limit(1),
      ]);

      if (lastRecord[0] && data.data_time === lastRecord[0].data_time) return;

      const newData = new Data(data);

      newData.save();
    } catch (error) {
      console.error(error);
    }
  }

  static startInterval() {
    console.log("Listen ManagerController...");
    this.intervalRef = setInterval(() => {
      this.saveNikkei();
    }, 5000);
  }

  static stopInterval() {
    if (this.intervalRef) clearInterval(this.intervalRef);
  }
}

module.exports = ManagerController;
