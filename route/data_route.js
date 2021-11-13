const router = require('express').Router();
let Data = require('../model/data.model');

router.route('/').get((req, res) => { // Get All Data
    Data.find()
      .then(datas => res.json(datas))
      .catch(err => res.status(404).json('Error: ' + err));
});

router.route('/').post((req,res) => {
  const price_upper = req.body.price_upper;
  const price_lower = req.body.price_lower;
  const data_date = req.body.data_date;
  const data_time = req.body.data_time;
  const open_price = req.body.open_price;
  const opentime = req.body.opentime;
  const high_price = req.body.high_price;
  const hightime = req.body.hightime;
  const low_price = req.body.low_price;
  const lowtime = req.body.lowtime;


  const newData = new Data ({
    price_upper : price_upper,
    price_lower : price_lower,
    data_date : data_date,
    data_time : data_time,
    open_price : open_price,
    opentime : opentime,
    high_price : high_price,
    hightime : hightime,
    low_price : low_price,
    lowtime : lowtime
  });

  newData.save((err, log) => {
    if (err) {
    res.status(404).json({
        errors: err
    });
    return;
    } else {
    return res.json({
        success: true,
        message: 'Create Data Success!'
    });
    }
  });
  
});


router.route('/date/:date').get((req, res) => { // Get All Data
  Data.findOne({data_date : req.params.date})
    .then(datas => res.json(datas))
    .catch(err => res.status(404).json('Error: ' + err));
});


router.route('/').delete((req, res) => { // Get All Data
  Data.deleteMany({},err =>{
    if (err) {
      res.status(404).json(err);
    }else{
      res.end("Success!");
    }
  })
});
module.exports = router;