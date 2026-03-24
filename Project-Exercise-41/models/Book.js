const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishedYear:{
        type:Number
    },
    genre:{
        type:String
    }
}, {
    timestamps:true
})

// ✅ Single field indexes
bookSchema.index({ genre: 1 });
bookSchema.index({ author: 1 });

// ✅ Compound index
bookSchema.index({ genre: 1, author: 1 });


module.exports = mongoose.model("Book", bookSchema)