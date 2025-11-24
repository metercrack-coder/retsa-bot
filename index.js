const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token from @BotFather
const BOT_TOKEN = '8549014772:AAE5xvEKCiJfipPkyli1DFZxK0lop2HBhg0';
// Replace with your Render app URL (e.g., https://your-app.onrender.com)
const WEBHOOK_URL = 'https://retsa-bot.onrender.com';

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
  const userName = msg.from.user.first_name;
  
  const welcomeText = `
💪 YO ${userName.toUpperCase()}, WELCOME TO RETSA 💪

The grind never stops, brother. 🔥

We got the ELITE gym supplements that'll take your gains to the next level:
⚡ Tongkat Ali - Testosterone unleashed
⚡ Shilajit - Ancient power, modern results  
⚡ Creatine Monohydrate - Pure strength
⚡ Test Boosters - Amplify your performance

No BS. No fillers. Just raw power for warriors like you.

🛒 CHECK THE ARSENAL: retsaehk.page.gd

Ready to level up? Let's get it. 💯🔥
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
      `Yo ${userName}! 💪\n\nI hear you, bro. "${userMessage}"\n\nNeed recommendations? Want to know about our products? Just ask.\n\nOr hit the link and start building that beast mode: retsaehk.page.gd 🔥`
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
