const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware (Yeh aapki frontend website ko connect karne ke liye zaroori hai)
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('🔥 MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schema (Contact Form ke data ke liye)
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// Base Route
app.get('/', (req, res) => {
    res.send('🚀 SKGHOST Backend Server is Live and Ready!');
});

// API Route (Yeh route aapki frontend repo se data receive karega)
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();
        
        res.status(201).json({ success: true, message: 'Message Saved to MongoDB Successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Vercel Export
module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

