import catchasyncerror from "../middleware/catchasync.middleware.js";
import Product from "../model/product.model.js";
import vendermodel from "../model/vender.model.js";
import Errorhandler from "../util/Errorhandler.util.js";
import uploadOnCloudinary from "../util/cloudinary.util.js";

export const createproduct = catchasyncerror(async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      brand,
      tags,
      productvariations,
      isFeatured,
      isAvailable,
    } = req.body;
    const imagearr = req.files.map((file) => file.path);
    const images = [];
    for (let i = 0; i < imagearr.length; i++) {
      const result = await uploadOnCloudinary(imagearr[i]);

      images.push(result.secure_url);
    }
    if (req.user.role === `admin`) {
      const product = await Product.create({
        name,
        description,
        category,
        tags,
        brand,
        productvariations,
        isFeatured,
        isAvailable,
     
        images,
      });
    } else {
      const vender = await vendermodel.findOne({ user: req.user.id });
      if (!vender) {
        return next(new Errorhandler("vender not found"));
      }

      const product = await Product.create({
        name,
        description,
        category,
        tags,
        brand,
        productvariations,
        isFeatured,
        isAvailable,
        vender: vender._id,
        images,
      });
      console.log("this is a product:" + product);
      vender.products.push(product._id);
      await vender.save();
    }
    res.status(200).json({
      success: true,
      message: "product created successfully",
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const getallproducts = catchasyncerror(async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";
    const limit = parseInt(req.query.limit) || 3;
    const page = parseInt(req.query.page) || 1;

    const skip = (page - 1) * limit;
    const searchquery = searchQuery
      ? {
          $or: [
            { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive name search
            { description: { $regex: searchQuery, $options: "i" } }, // Case-insensitive description search
            { category: { $regex: searchQuery, $options: "i" } },
            { brand: { $regex: searchQuery, $options: "i" } },
            { tags: { $regex: searchQuery, $options: "i" } },
          ],
        }
      : {};
    const products = await Product.find(searchquery)
      .populate("vender")
      .skip(skip)
      .limit(limit);
    const totalproducts = await Product.countDocuments(searchquery);
    const totalpages = Math.ceil(totalproducts / limit);
    const hasnextpage = page < totalpages;
    res.status(200).json({
      success: true,
      message: "your search successfull",
      products,
      hasnextpage,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});

export const updateproduct = catchasyncerror(async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return next(new Errorhandler("product not found ", 404));
    }
    if (req.files) {
      const imagearr = req.files.map((file) => file.path);
      const images = [];
      for (let i = 0; i < imagearr.length; i++) {
        const result = await uploadOnCloudinary(imagearr[i]);

        images.push(result.secure_url);
      }
      product.images = images;
    }

    product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "product created successfully",
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const getrpoductbyid = catchasyncerror(async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.id);
    if (!products) {
      return next(new Errorhandler("product not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "fetched successfully",
      products,
    });
  } catch (error) {
    return next(
      new Errorhandler(error?.message || "internal server Error", 500)
    );
  }
});
export const getproducts=catchasyncerror(async (req,res,next)=>{
  try {
    const  products=await Product.find({
      $or: [
        { vender: { $exists: false } },  // Check if the vender field does not exist
        { vender: null },  // Check if the vender field is null
      ],
    });
    if(!products){
      return next(new Errorhandler("products are not found ",404))
    }
    res.status(200).json({
      success:true,
      message:"fetched successfully",
      products

    })
  } catch (error) {
return next(new Errorhandler(error?.message ,404))
  }
})
export const deleteproduct = catchasyncerror(async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return next(new Errorhandler("product not found ", 404));
    }
    const deletedproduct = await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      deletedproduct,
    });
    const vender = await vendermodel.findOne({ user: req.user._id });
    if (!vender) {
      return next(new Errorhandler("vender not found", 404));
    }
    const productindex = vender.products.findIndex(product._id);
    vender.products.splice(productindex, 1);
    await vender.save();
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const create_review = catchasyncerror(async (req, res, next) => {
  try {
    const { id } = req.body;
    const { text, rating } = req.body;
    console.log("this is a request files :" + req.files);
    const imagearr = req.files.map((file) => file.path);
    const images = [];
    console.log("this is a image array:" + imagearr);
    for (let i = 0; i < imagearr.length; i++) {
      const result = await uploadOnCloudinary(imagearr[i]);
      images.push(result.secure_url);
    }

    const product = await Product.findById(id);
    if (!product) {
      return next(new Errorhandler("product not found ", 404));
    }
    console.log("this is a product :" + product);
    product.review.push({
      user: req.user.id,
      text,
      rating,
      images,
    });
    console.log("this is a product " + product);
    await product.save();
    res.status(200).json({
      success: true,
      message: "reveiew added successfully",
      product,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const deletereview = catchasyncerror(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new Errorhandler("product not found ", 404));
    }
    product.review = product.review.filter((rev) => {
      return rev.user.toString() !== req.user.id.toString();
    });
    await product.save();
    res.status(200).json({
      success: true,
      message: "review deleted successfully",
    });
  } catch (error) {}
});
