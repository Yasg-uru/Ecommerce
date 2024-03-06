import mongoose, { Schema, model } from "mongoose";
const productSchema=new Schema({
    name :{
        type:String ,
        require:true
    },
    description :{
        type:String,
        require:true,

    },
    category:{
        type:String,
        require:true
    },
    brand:{
        type:String
    },
    //vender
    review:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            text:{
                type:String,

            },
            images :[
                {
                    type:String 
                }
            ],
            rating:{
                type:Number,
                min:1,
                max:5

            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    productvariations:[
        {
            name :{
                type:String ,
                require:true,

            },
            price:{
                type:Number,
                require:true,
                default:0
            },
            stock:{
                type:Number,
                default:0,
                min:0
            },
            attribute:{
                color:String,
                size:String 
            }
        }
    ],
    images:[
        {
            type:String 
        }
    ],
    tags:[
        {
            type:String
        }
    ],
    averagerating:{
        type:Number, default:0,
        min:0,
        max:5
    },
    totalratings:{
        type:Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default :false
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    vender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vender"
    }


},{
    timstamps:true
})
const productmodel=model("Product",productSchema);
export default productmodel;
