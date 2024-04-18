// const mongoose = require('mongoose');

// const conn = async (req, res) => {
//     try {
//         await mongoose
//             .connect("mongodb+srv://nitish12015121:RFJ3aFqFbGu2Uimf@cluster0.l9olrt5.mongodb.net/")
//             .then(() => {
//                 console.log("DB connected");
//             })
//     } catch (error) {
//         res.status(400).json({
//             message: "DB not connected",
//         });
//     }
// };

// conn();
const mongoose = require('mongoose');

const conn = async () => {
  try {
    await mongoose.connect("mongodb+srv://nitish12015121:RFJ3aFqFbGu2Uimf@cluster0.l9olrt5.mongodb.net/");
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

conn();