import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from "fs";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID || "wtb3t2xpknnrk4yp",
  publicKey: process.env.BRAINTREE_PUBLIC_KEY || "ky5fwyydtnzv6fmg",
  privateKey:
    process.env.BRAINTREE_PRIVATE_KEY || "fe64cdaacf51e689a0ad7eb5a2c0133c",
});

export const productController = async (req, res) => {
  try {
    const { name, slug, description, price, category, stock, shipping } =
      req.fields;
    const { photo } = req.files;
    //Validations
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "descriptionis required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !stock:
        return res.status(500).send({ error: "stock is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo  is required and should be less 1mb " });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      meaage: "Product created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in creating product Controller",
    });
  }
};
//get-all-productController
export const getproductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalcount: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getting all product ",
    });
  }
};
//-----------get-all--products--in---- admin side---productpage

export const getproductadminController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      // .limit(9)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalcount: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getting all product ",
    });
  }
};
//get -all -products --------------admindashboard(charts)
export const getproductCharts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalcount: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getting all product ",
    });
  }
};

//get-Single-Product-Controller
export const getSingleProductController = async (req, res) => {
  try {
    const slug = req.params;
    const products = await productModel
      .findOne(slug)
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,

      message: "getting single  product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getting single product ",
    });
  }
};

//product-Photo-Controller
export const productPhotoController = async (req, res) => {
  try {
    const products = await productModel
      .findById(req.params.pid)
      .select("photo");
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in product photos ",
    });
  }
};

//deleteProductController
export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    await productModel.findByIdAndDelete(pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "product deleted successfully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in deleting the product ",
    });
  }
};

//update-Product-Controller
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      stock,
      quantity,
      shipping,
    } = req.fields;
    const { photo } = req.files;
    //   Validations
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "descriptionis required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });

      // case !stock:
      //   return res.status(500).send({ error: "stock is required" });
      // case !quantity:
      //   return res.status(500).send({ error: "quantity is required" });

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo  is required and should be less 1mb " });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      meaage: "Product updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in updating product Controller",
    });
  }
};

//productFilterController
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "error in updating product Controller",
    });
  }
};

//productCountController
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};
//product list controller
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
};

//searchController
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

//relatedProductController -- Similar product controller
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(4)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Similar product api",
      error,
    });
  }
};

//productCategoryController get product by category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In get product by category",
      error,
    });
  }
};

//----------payment gateway API-----
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log("13231412", error);
  }
};

//payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    if (Array.isArray(cart)) {
      cart.map((i) => {
        total += i.price;
        // console.log("payment error", error);
      });
    }
    let newTransaction = await gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};

const messages = [];
export const apiController = (req, res) => {
  const { sender, message } = req.body;
  const newMessage = { sender, message, _id: Date.now() };
  messages.push(newMessage);
  res.json(newMessage);
};

// export const braintreePaymentController = async (req, res) => {
//   try {
//     const user = req.decode;
//     const { nonce, cart } = req.body;
//     console.log("hello1");
//     console.log(cart, "cart");
//     let total = 0;
//     if (Array.isArray(cart)) {
//       cart.map((i) => {
//         total += i.price;
//       });
//     }
//     console.log(user, "user");
//     const newTransaction = await gateway.transaction.sale({
//       amount: total,
//       paymentMethodNonce: nonce,
//       options: {
//         submitForSettlement: true,
//       },
//     });

//     console.log("hello2");
//     if (newTransaction.success) {
//       console.log("hello3");
//       const order = new orderModel({
//         products: cart,
//         payment: newTransaction,
//         buyer: user._id,
//       });
//       await order.save();
//       res.json({ ok: true });
//     } else {
//       res.status(500).send(newTransaction.message);
//       console.log("hello4");
//     }//     }

//   } catch (error) {
//     console.log("hello5");
//     console.log(error);
//   }
// };
