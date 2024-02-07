const AddToCartModel = require("../../models/user/cART.JS")
const mongoose = require('mongoose')


// exports.AddItemsToCart = async (req, res) => {

//     try {
//         const {
//             userId,
//             listOfServices,
//         } = req.body

//         const AddingData = new AddToCartModel({
//             userId: userId,
//             listOfServices: listOfServices,
//         })
//         const saveData = await AddingData.save()

//         res.json(saveData)
//     } catch (error) {
//         res.status(500).json(error);
//         console.log(error)
//     }
// }
exports.AddItemsToCart = async (req, res) => {
  try {
    const { userId, listOfServices } = req.body;
    // Find the cart for the given user
    const existingCart = await AddToCartModel.findOne({ userId });
    if (existingCart) {
      // Check if the selected item already exists in the cart based on its name
      const existingItemIndex = existingCart.listOfServices.findIndex(
        (item) => item.name === listOfServices[0].name
      );
      if (existingItemIndex !== -1) {
        // If the item already exists, replace it with the selected item
        existingCart.listOfServices[existingItemIndex] = {
          name: listOfServices[0].name,
          price: listOfServices[0].price,
        };
        // Update any other properties as needed
      } else {
        // If the item does not exist, add it to the cart
        existingCart.listOfServices.push({
          name: listOfServices[0].name,
          price: listOfServices[0].price,
        });
      }
      // Save the updated cart
      const updatedCart = await existingCart.save();
      res.json(updatedCart);
    } else {
      // If there is no existing cart, create a new one
      const AddingData = new AddToCartModel({
        userId: userId,
        listOfServices: [{
          name: listOfServices[0].name,
          price: listOfServices[0].price,
        }],
      });
      // Save the new cart
      const saveData = await AddingData.save();
      res.json(saveData);
    }
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
};
exports.getCartItemsByUserId = async (req, res) => {
    const { userId } = req.params
    try {
        const getuserCart = await AddToCartModel.find({ userId })
        if (!getuserCart) {
            res.status(401).json({ message: "data not found" })
        }
        res.json(getuserCart)

    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

exports.deleteCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    // Assuming you have a field like 'userId' in your CartItem schema
    const result = await AddToCartModel.deleteOne({ _id: itemId, userId: userId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'CartItem deleted successfully' });
    } else {
      res.status(404).json({ message: 'CartItem not found or already deleted' });
    }
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.RemoveCartItemById = async (req, res) => {
  const { userId, itemId } = req.params;
  try {
    const result = await AddToCartModel.findOneAndUpdate(
      { userId },
      { $pull: { listOfServices: { _id: mongoose.Types.ObjectId(itemId) } } },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: 'User not found or item not in the cart' });
    }
    res.json({ message: 'Item deleted successfully', updatedCart: result });
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.clearCartInDatabase = async (req,res) => {
  const {userId}=req.params
  try {
    // Find and remove the cart for the given user
    const removedCart = await AddToCartModel.findOneAndRemove({ userId });
    if (!removedCart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// exports.UpdateCartItems=async(req,res)=>{
//     const { userId, itemId } = req.params;
  
// try {
//   const result = await AddToCartModel.updateOne(
//     { userId },

//     { $set: { listOfServices: { _id: itemId } } }

//   )

//   if (result.nModified === 0) {
//     return res.status(404).json({ message: "User not found or item not in the cart" });
//   }

//   res.json({ message: "Item removed successfully" });

// } catch (error) {
//   console.error("Error removing item from cart:", error);
//   res.status(500).json({ error: "Internal Server Error" });

// }

// }


