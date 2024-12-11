const { BotError, GrammyError, HttpError} = require("grammy");
const GrammyBot=require("grammy").Bot;

class Bot extends GrammyBot{
    constructor(botToken,config) {
        super(botToken);

        this.name = config.name;

        this.command("start", this.startCommandHandler.bind(this));
        this.command("version", this.versionCommandHandler.bind(this));
        this.command("name", this.nameCommandHandler.bind(this));

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

    async initCommands(){
        await this.api.setMyCommands([
            { command: "start", description: "Запуск" },
            { command: "version", description: "Версия" },
            { command: "name", description: "Параметр из конфига" },
        ]);
    }

    async startCommandHandler(ctx, next){
        if(ctx.chat.type !== "private")
            return ;
        return ctx.reply("Received /start command.");
    }

    async versionCommandHandler(ctx, next){
        return  ctx.reply(
            `Версия: ${this.getVersion()}`,
            {message_thread_id:ctx.message.message_thread_id}
        );
    }

    async nameCommandHandler(ctx, next){
        return  ctx.reply(
            `Меня зовут ${this.name}.`,
            {message_thread_id:ctx.message.message_thread_id}
        );
    }

    getVersion(){
        return process.env.VERSION;
    }

}

module.exports = Bot;