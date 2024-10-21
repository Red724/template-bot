const  Bot = require("./Bot.js");
const {readFileSync} = require("node:fs");
require('dotenv').config();

const BOT_TOKEN=(process.env.BOT_TOKEN || "test");

(async ()=>{
    try {
        console.log(`Application started. Version: ${process.env.VERSION}.`);
        const data = readFileSync("./config/config.json", 'utf8');
        let config = JSON.parse(data);
        let bot = new Bot(BOT_TOKEN,config);
        await bot.initCommands();
        await bot.start();
    } catch (e) {
        if (e.code === 'ENOENT' || e.code === 'EACCES') {
            console.error(`Error on reading config: ${e.message}`);
        }
        else if(e.name==='GrammyError'){
            console.error(`${e.name}: ${e.message}`);
        }
        else {
            console.error(`Another error : ${e.message}`);
        }
    }
})();