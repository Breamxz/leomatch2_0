const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN; // Используем переменную окружения

// Маршрут для получения информации о пользователе
app.get('/getTelegramUserInfo', async (req, res) => {
    const userId = req.query.userId;

    try {
        const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getChat`, {
            params: {
                chat_id: userId
            }
        });
        res.json(response.data.result);
    } catch (error) {
        res.status(500).send('Error fetching user info');
    }
});

// Обслуживание статических файлов
app.use(express.static('client'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
