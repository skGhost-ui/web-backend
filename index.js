const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// 1. MongoDB Connection (Vercel ke Environment Variable se connect karega)
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("Database Connection Error:", err));

// 2. Purana Route (Jo aapki screen par dikh raha tha)
app.get('/', (req, res) => {
  res.send('🚀 Backend Server Is Running Smoothly and Securely!');
});

// 3. Naya Route (Aapki testing ke liye jo abhi add kiya hai)
app.get('/api/test', (req, res) => {
  res.json({
    status: "Success",
    message: "Zabardast! Aapka naya code Vercel par chal raha hai.",
    database: "Connected"
  });
});

// Vercel ke liye server export karna zaroori hota hai
module.exports = app;

// Local testing ke liye port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

