const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token from @BotFather
const BOT_TOKEN = '8549014772:AAE5xvEKCiJfipPkyli1DFZxK0lop2HBhg0';
// Replace with your Render app URL (e.g., https://your-app.onrender.com)
const WEBHOOK_URL = 'YOUR_RENDER_URL_HERE';

const bot = new TelegramBot(BOT_TOKEN);
const app = express();

app.use(express.json());

// Set webhook
bot.setWebHook(`${WEBHOOK_URL}/bot${BOT_TOKEN}`);

// Webhook endpoint
app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name;
  
  const welcomeText = `
🌟 Welcome to RETSA, ${userName}! 🌟

We're thrilled to have you here! ✨

Discover our exclusive collection of premium products designed just for you.

How can I assist you today? Feel free to ask me anything! 💫
  `;
  
  bot.sendMessage(chatId, welcomeText);
});

// Handle all other messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name;
  const userMessage = msg.text;
  
  // Skip if it's a command
  if (userMessage && !userMessage.startsWith('/')) {
    bot.sendMessage(
      chatId,
      `Thank you for reaching out, ${userName}! 😊\n\nI received your message: '${userMessage}'\n\nHow else can I help you today?`
    );
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});