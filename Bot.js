const { BotError, GrammyError, HttpError} = require("grammy");
const GrammyBot=require("grammy").Bot;

class Bot extends GrammyBot{
    constructor(botToken) {
        super(botToken);

        this.command("start", this.startCommandHandler.bind(this));

        // Handle other messages.
        this.on("message", async (ctx) => {
            return ctx.reply("Got another message!");
        });

        this.catch((err) => {
            const ctx = err.ctx;
            console.error(`Error while handling update ${ctx.update.update_id}:`);
            const e = err.error;
            if (e instanceof GrammyError) {
                console.error("Error in request:", e.description);
            } else if (e instanceof HttpError) {
                console.error("Could not contact Telegram:", e);
            } else {
                console.error("Unknown error:", e);
            }
        });
    }

    async startCommandHandler(ctx, next){
        return ctx.reply("Received /start command.");
    }

}

module.exports = Bot;