const fetch = require("node-fetch");
const Data = require("../model/data.model");
const { default: axios } = require("axios");
class GetNikkei {
  static async fetchFromNikkeiHost() {
    try {
      const result = (
        await axios.get(
          `http://indexes.nikkei.co.jp/en/nkave/get_real_data?idx=nk225`
        )
      ).data;

      return this.parseData(result);
    } catch (error) {
      console.error(error);
    }
  }

  static async parseData(json) {
    const priceUpper = String(json.price).split(".")[1],
      priceLower = String(json.diff).split("(")[0].split(".")[1].trim(),
      dataDate = String(json.datedtime_nkave).split(" ")[0],
      dataTime = String(json.datedtime_nkave).split(" ")[1],
      openPrice = json.open_price,
      openTime = json.opentime;

    return {
      price_upper: Number(priceUpper),
      price_lower: Number(priceLower),
      data_date: dataDate,
      data_time: dataTime,
      open_price: openPrice,
      opentime: openTime,
    };
  }
}

module.exports = GetNikkei;
