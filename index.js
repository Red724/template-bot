const  Bot = require("./Bot.js");
require('dotenv').config();

const BOT_TOKEN=(process.env.BOT_TOKEN || "test");

(async ()=>{
    try {
        await new Bot(BOT_TOKEN).start();
    } catch (e) {
        console.error(`${e.name}: ${e.message}`);
    }
})();