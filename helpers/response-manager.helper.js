class ResponseManager {
  static getSuccessResponseListData(response, totalCount,data, option) {
    const optionData = {
      count: data.length,
      limit: Number(option.limit) ?? data.length,
      offset: option.offset ? Number(option.offset) : 0,
      total: totalCount,
    };

    return response.json({
      ...optionData,
      items: data,
    });
  }

  static getErrorResponseListData(response, error) {
    return response.status(404).json({
      msg: String(error),
    });
  }
}

module.exports = ResponseManager;
