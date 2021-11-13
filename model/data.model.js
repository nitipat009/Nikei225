const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    price_upper : {type : String ,trime :true},
    price_lower : {type : String , trime : true},
    datedtime : {type : String , trime : true},
    open_price : {type : String , trime : true},
    opentime : {type : String , trime : true},
    high_price : {type : String, trime : true},
    hightime : {type : String , trime :true},
    low_price : {type :String , trime : true},
    lowtime : {type : String , trime : true}
  }, 
  {timestamps: true,}
  
  );

const Data = mongoose.model('Data', dataSchema);