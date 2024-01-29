const multer = require('multer');
const Reminder = require('../../models/admin/reminder');
const path = require('path');

// Multer configuration for file upload
const storage = multer.diskStorage({ 
  destination: function (req, file, cb) {
    // Specify the directory where you want to store the files locally
    const destinationPath = path.join(__dirname, '../../uploadsFilesReminder');
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the file
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Update the 'array' method to accept both 'image' and 'video'
const upload = multer({ storage }).fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);

exports.createReminder = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading Reminder file:', err);
        return res.status(500).json({ success: false, message: 'An error occurred while uploading Reminder file.' });
      }

      const { title, description, startTime, endTime } = req.body;

      const newReminder = new Reminder({
        title,
        description,
        startTime,
        endTime,
      });

      if (req.files['image']) {
        newReminder.imageFilename = `/publicreminders/${path.basename(req.files['image'][0].filename)}`;
        console.log(newReminder.imageFilename);
      }

      if (req.files['video']) {
        newReminder.videoFilename = `/publicreminders/${path.basename(req.files['video'][0].filename)}`;
        console.log(newReminder.videoFilename);
      }

      await newReminder.save();

      return res.status(201).json(newReminder);
    });
  } catch (error) {
    console.error('Error creating Reminder:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while creating the Reminder.' });
  }
};


exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    return res.status(200).json(reminders);
  } catch (error) {
    console.error('Error getting reminders:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while retrieving reminders.' });
  }
};



// exports.deleteReminder = async (req, res) => {
//   try {
//     const reminderId = req.params.id;

//     // Check if the reminder exists
//     const reminder = await Reminder.findById(reminderId);

//     if (!reminder) {
//       return res.status(404).json({ success: false, message: 'Reminder not found.' });
//     }

//     // Delete the reminder
//     await reminder.remove();

//     // If there's an associated image file, delete it from the file system
//     if (reminder.imageFilename) {
//       const imagePath = path.join(__dirname, '..', 'publicreminders', path.basename(reminder.imageFilename));
//       fs.unlinkSync(imagePath);
//     }

//     // If there's an associated video file, delete it from the file system
//     if (reminder.videoFilename) {
//       const videoPath = path.join(__dirname, '..', 'publicreminders', path.basename(reminder.videoFilename));
//       fs.unlinkSync(videoPath);
//     }

//     return res.json({ success: true, message: 'Reminder deleted successfully.' });
//   } catch (error) {
//     console.error('Error deleting Reminder:', error);
//     return res.status(500).json({ success: false, message: 'An error occurred while deleting the Reminder.' });
//   }
// };


exports.deleteReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;

    // Check if the reminder exists
    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found.' });
    }

    // Delete the reminder
    await reminder.remove();

    return res.json({ success: true, message: 'Reminder deleted successfully.' });
  } catch (error) {
    console.error('Error deleting Reminder:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while deleting the Reminder.' });
  }
};