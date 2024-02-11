const Product = require("../model/Product");
const CartItem = require("../model/CartItem");

const productController = {};

productController.listProducts = async (req, res) => {
  try {
    let query = {};
    const { sortBy, sortOrder, searchQuery } = req.query;

    if (searchQuery) {
      query = { name: { $regex: searchQuery, $options: "i" } };
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const products = await Product.find(query).sort(sortOptions);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

productController.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

productController.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    let cartItem = await CartItem.findOne({ productId }).populate("productId");

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ productId });
      await cartItem.save();
      cartItem = await CartItem.findById(cartItem._id).populate("productId");
    }

    res.json({ message: "Item added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

productController.getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate({
      path: "productId",
      select: "name price",
    });
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

productController.updateCartQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { action } = req.body;

    let cartItem = await CartItem.findById(itemId);

    if (cartItem) {
      if (action === "increment") {
        cartItem.quantity += 1;
      } else if (action === "decrement") {
        cartItem.quantity -= 1;
        cartItem.quantity = Math.max(cartItem.quantity, 0);

        if (cartItem.quantity === 0) {
          await cartItem.remove();
          return res.json({ message: "Cart item removed" });
        }
      }

      await cartItem.save();
      res.json({ message: "Cart item quantity updated" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    console.error("Error in updateCartQuantity:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = productController;
