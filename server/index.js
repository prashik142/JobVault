const express = require("express");
const cors = require("cors");

const jobRoutes = require("./routes/jobRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 JobVault API Running");
});

app.use("/jobs", jobRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});