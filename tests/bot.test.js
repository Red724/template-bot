const ExampleBot = require("../Bot");

let  bot;

describe("#constructor", function() {
    it("sets name from config", function() {
        bot = new ExampleBot("test",{name: "test-bot"});
        expect(bot.name).toEqual("test-bot");
    })
})