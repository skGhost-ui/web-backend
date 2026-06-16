const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Vercel direct Environment Variable se uthaye ga)
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('🔥 MongoDB Cloud Connected Successfully!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schema (Data Structure for Contact Form)
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// Main Route (Jo browser par dikhta hai)
app.get('/', (req, res) => {
    res.send('🚀 Backend Server Is Running Smoothly on Vercel!');
});

// API Route to Save Contact Form Data
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ success: true, message: 'Data Saved to MongoDB!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🔥 VERCEL KE LIYE ZAROORI: Export the app instance
module.exports = app;

// Local testing ke liye port (Vercel ise automatically handle kar leta hai)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});

