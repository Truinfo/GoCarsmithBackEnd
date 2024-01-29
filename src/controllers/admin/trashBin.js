// controllers/trashController.js

const TrashItem = require('../../models/admin/trashBin');
const BlogPost = require('../../models/admin/blog'); 

exports.getTrashItems = async (req, res) => {
  try {
    const trashItems = await TrashItem.find().populate('original');
    res.json(trashItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.restoreFromTrash = async (req, res) => {
  try {
    const trashItemId = req.params.id;

    // Find the trash item by ID
    const trashItem = await TrashItem.findById(trashItemId).populate('original');

    if (!trashItem) {
      return res.status(404).json({ error: "Trash item not found" });
    }

    // Get the original post data from the trash item
    const originalData = trashItem.original[0];

    // Create or update the blog post with the original data
    const restoredPost = await BlogPost.findByIdAndUpdate(
      originalData._id,
      originalData,
      { new: true, upsert: true }
    );

    // Remove the item from the trash
    await TrashItem.findByIdAndDelete(trashItemId);

    res.json({ message: "Blog post restored successfully", restoredPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.permanentlyDeleteFromTrash = async (req, res) => {
  try {
    const trashItemId = req.params.id;

    // Find the trash item by ID
    const trashItem = await TrashItem.findById(trashItemId);

    if (!trashItem) {
      return res.status(404).json({ error: "Trash item not found" });
    }

    // Remove the item from the trash
    await TrashItem.findByIdAndDelete(trashItemId);

    res.json({ message: "Trash item permanently deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearTrash = async (req, res) => {
  try {
    // Clear all items from the trash
    await TrashItem.deleteMany({});

    res.json({ message: "Trash cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 
// const Brand = require('../models/admin/brands');

// exports.restoreFromTrash = async (req, res) => {
//   try {
//     const trashItemId = req.params.id;

//     // Find the trash item by ID
//     const trashItem = await TrashItem.findById(trashItemId).populate('original');

//     if (!trashItem) {
//       return res.status(404).json({ error: "Trash item not found" });
//     }

//     // Get the original item data from the trash item
//     const originalData = trashItem.original[0];

//     // Determine the type of the original item (assuming you have a property named "type" in your model)
//     const itemType = originalData.type;

//     // Create or update the item based on its type
//     let restoredItem;
//     switch (itemType) {
//       case 'BlogPost':
//         restoredItem = await BlogPost.findByIdAndUpdate(
//           originalData._id,
//           originalData,
//           { new: true, upsert: true }
//         );
//         break;
//       case 'Brand':
//         restoredItem = await Brand.findByIdAndUpdate(
//           originalData._id,
//           originalData,
//           { new: true, upsert: true }
//         );
//         break;
//       // Add more cases for other types as needed
//       default:
//         // Handle unknown item types or log them for investigation
//         console.error(`Unsupported item type: ${itemType}`);
//         return res.status(400).json({ error: "Unsupported item type" });
//     }

//     // Remove the item from the trash
//     await TrashItem.findByIdAndDelete(trashItemId);

//     res.json({ message: "Item restored successfully", restoredItem });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
