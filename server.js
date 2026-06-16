const dns = require('dns');
// Force Node.js to bypass Termux/Carrier network restrictions
dns.setServers(['8.8.8.8', '1.1.1.1']); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔥 MongoDB Cloud Connected Successfully!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schema (Data Structure)
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// Basic Route for Testing
app.get('/', (req, res) => {
    res.send('🚀 Backend Server Is Running Smoothly!');
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});
