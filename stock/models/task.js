const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'must provide name'],
        trim:true,
        maxlength:[35, 'name can not be more than 20 characters']
    },
    completed:{
        type:Boolean,
        default:false
    },
    numofstock:{
        type:Number,
        required:[true, 'must provide stock number'],
        maxlength:[999, 'stock number can not be more than 999'],
        default:'0'
    },
    price:{
        type:Number,
        required:[true, 'must provide product price'],
        maxlength:[999, 'price can not be more than 999'],
        default:'999.999'
    },
    image:{
        type:String,
        default:''
    },
    category:{
        type:String,
        enum:['computer', 'tv', 'accessory', 'game', 'none'],
        default:'none'
    }

})

module.exports = mongoose.model('Task',TaskSchema)