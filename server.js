const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const path = require("path");
const cors = require("cors");

const bannerRoutes = require("./routes/bannerRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const productRoutes = require("./routes/productRoutes");
const contactcardRoutes = require("./routes/contactcardRoutes");
const contactformRoutes = require("./routes/contactformRoutes");
const testimonialsRoutes = require("./routes/testimonialsRouter")


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api/banners", bannerRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contactcards", contactcardRoutes);
app.use("/api/contactforms", contactformRoutes);
app.use("/api/testimonials", testimonialsRoutes)


app.listen(process.env.PORT, () => {
  console.log("Server is runnning on port " + process.env.PORT);
  connectDB();
});
