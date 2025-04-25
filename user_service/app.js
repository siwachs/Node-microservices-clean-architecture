const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();

const PORT = process.env.PORT || 9001;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
