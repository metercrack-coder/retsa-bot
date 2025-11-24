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

// Keyword responses
function getResponse(message) {
  const msg = message.toLowerCase();
  
  // Tongkat Ali keywords
  if (msg.includes('tongkat') || msg.includes('testosterone') || msg.includes('test')) {
    return "💪 YO! Tongkat Ali is THE natural testosterone booster, bro! 🔥\n\nBoosts T-levels, increases strength, and amps up your libido. Pure alpha energy right here.\n\n⚡ Price: ₱249\n🛒 Grab it: https://vt.tiktok.com/ZSHTdkvjS6hjP-4q8Gb/";
  }
  
  // Shilajit keywords
  if (msg.includes('shilajit') || msg.includes('energy') || msg.includes('stamina')) {
    return "🔥 SHILAJIT - Ancient power for modern warriors! 💪\n\nPacked with 85+ minerals. Boosts energy, stamina, and recovery. This stuff is LEGENDARY.\n\n⚡ Price: ₱269\n🛒 Get yours: https://vt.tiktok.com/ZSHTdBvxW6Ycs-GlypO/";
  }
  
  // Creatine keywords
  if (msg.includes('creatine') || msg.includes('strength') || msg.includes('muscle') || msg.includes('gains')) {
    return "💯 CREATINE MONOHYDRATE - The KING of supplements! 🏋️\n\nPure strength gains, more reps, bigger muscles. No fluff, just results. Every gym warrior needs this.\n\n⚡ Price: ₱418\n🛒 Order now: https://vt.tiktok.com/ZSHTdkbWGXGSs-Ye503/";
  }
  
  // Testosterone Booster keywords
  if (msg.includes('booster') || msg.includes('performance') || msg.includes('libido')) {
    return "⚡ TESTOSTERONE BOOSTER - Unleash the beast mode! 💪🔥\n\nMaximize performance, boost libido, increase muscle mass. Feel like a champion every day.\n\n⚡ Price: ₱192\n🛒 Shop here: https://vt.tiktok.com/ZSHTdBuA3Uu12-ivap7/";
  }
  
  // Price keywords
  if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
    return "💰 RETSA PRICES - Premium quality, fair prices:\n\n⚡ Tongkat Ali - ₱249\n⚡ Test Booster - ₱192\n⚡ Shilajit - ₱269\n⚡ Creatine - ₱418\n\n🛒 Full shop: https://retsa-bot.onrender.com";
  }
  
  // Shop/Buy keywords
  if (msg.includes('shop') || msg.includes('buy') || msg.includes('order') || msg.includes('purchase')) {
    return "🛒 READY TO LEVEL UP? Let's get it! 💪\n\nCheck out the full arsenal:\n🔗 https://retsa-bot.onrender.com\n\nPick your weapon and start building that beast mode! 🔥💯";
  }
  
  // Recommendation keywords
  if (msg.includes('recommend') || msg.includes('best') || msg.includes('what should') || msg.includes('which')) {
    return "💪 YO BRO! Here's what I recommend:\n\n🔥 NEW TO SUPPLEMENTS? Start with Creatine - proven results\n🔥 WANT MORE T? Tongkat Ali + Test Booster combo\n🔥 NEED ENERGY? Shilajit is your guy\n🔥 ALL-IN BEAST MODE? Stack them all!\n\nWhat's your goal? Let's get you sorted! 💯";
  }
  
  // Help keywords
  if (msg.includes('help') || msg.includes('info') || msg.includes('tell me')) {
    return "💪 NEED GUIDANCE, BRO? Here's what I can help with:\n\n⚡ Product info (Tongkat, Shilajit, Creatine, Boosters)\n⚡ Prices\n⚡ Recommendations\n⚡ Where to buy\n\nJust ask me anything about our products! 🔥";
  }
  
  // Greeting keywords
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('yo')) {
    return "YO! 💪 What's good, bro? Ready to talk gains?\n\nAsk me about our products or hit that shop link! 🔥\n🛒 https://retsa-bot.onrender.com";
  }
  
  // Default response
  return "Yo bro! 💪 Not sure what you need?\n\nAsk me about:\n🔥 Tongkat Ali\n🔥 Shilajit\n🔥 Creatine\n🔥 Test Boosters\n🔥 Prices\n🔥 Recommendations\n\nOr just hit the shop: https://retsa-bot.onrender.com 💯";
}

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name;
  
  const welcomeText = `
💪 YO ${userName.toUpperCase()}, WELCOME TO RETSA 💪

The grind never stops, brother. 🔥

We got the ELITE gym supplements that'll take your gains to the next level:
⚡ Tongkat Ali - Testosterone unleashed
⚡ Shilajit - Ancient power, modern results  
⚡ Creatine Monohydrate - Pure strength
⚡ Test Boosters - Amplify your performance

No BS. No fillers. Just raw power for warriors like you.

🛒 CHECK THE ARSENAL: https://retsa-bot.onrender.com

Ready to level up? Let's get it. 💯🔥
  `;
  
  bot.sendMessage(chatId, welcomeText);
});

// Handle all other messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;
  
  // Skip if it's a command
  if (userMessage && !userMessage.startsWith('/')) {
    const response = getResponse(userMessage);
    bot.sendMessage(chatId, response);
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
