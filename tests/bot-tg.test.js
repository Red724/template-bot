const ExampleBot = require("../Bot");
const TgTestHelpers=require("./TgTestHelpers");

let outgoingRequests = [];

let  bot;



function returnOk(method,payload){
    return { ok: true, result: true}
}

let transformerReturnCallback;

function transformer(prev, method, payload, signal){
    outgoingRequests.push({ method, payload, signal });
    return transformerReturnCallback (method,payload);
}

beforeEach(async () => {
    bot=new ExampleBot('test', {name:'test bot'});

    transformerReturnCallback=returnOk;
    bot.api.config.use(transformer);

    bot.botInfo = {
        id: 42,
        first_name: "Test Bot",
        is_bot: true,
        username: "bot",
        can_join_groups: true,
        can_read_all_group_messages: true,
        supports_inline_queries: false,
    };
    await bot.init();
    outgoingRequests = [];
});


test("gets right text on /start command", async () => {
    await bot.handleUpdate(TgTestHelpers.generateCommand("/start"));

    expect(outgoingRequests.length).toBe(1);
    expect(outgoingRequests.pop().payload.text).toBe("Received /start command.");
}, 5000);

test("gets right text on other messages", async () => {
    await bot.handleUpdate(TgTestHelpers.generateMessage("foo"));

    expect(outgoingRequests.length).toBe(1);
    expect(outgoingRequests.pop().payload.text).toBe("Got another message!");
}, 5000);

test("gets version on /version command", async () => {
    bot.getVersion=jest.fn().mockReturnValue('TEST');
    await bot.handleUpdate(TgTestHelpers.generateCommand("/version"));
    expect(outgoingRequests.length).toBe(1);
    expect(outgoingRequests.pop().payload.text).toBe("Версия: TEST");
}, 5000);

test("gets config param on /name command", async () => {
    await bot.handleUpdate(TgTestHelpers.generateCommand("/name"));
    expect(outgoingRequests.length).toBe(1);
    expect(outgoingRequests.pop().payload.text).toBe("Меня зовут test bot.");
}, 5000);






