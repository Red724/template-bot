const ExampleBot = require("../Bot");

let outgoingRequests = [];

let  bot;

function generateMessage(message) {
    return {
        update_id: 10000,
        message: {
            message_id: 1365,
            from: {
                id: 1111111,
                is_bot: false,
                first_name: "Test firstname",
                username: "rest",
                language_code: "ru"
            },
            chat: {
                id: 5555555,
                first_name: "Test firstname",
                username: "test",
                type: "private"
            },
            date: 1441645532,
            text: message,
        },
    };
}

function generateCommand(command) {
    return {
        update_id: 10000,
        message: {
            message_id: 1,
            from: {
                id: 1111111,
                is_bot: false,
                first_name: "Test firstname",
                username: "test",
                language_code: "ru"
            },
            chat: {
                id: 5555555,
                first_name: "Test firstname",
                username: "test",
                type: "private"
            },
            date: 1441645532,
            text: command,
            entities: [
                {
                    offset: 0,
                    length: command.length,
                    type: "bot_command"
                }
            ]
        }
    };
}

function returnOk(method,payload){
    return { ok: true, result: true}
}

let transformerReturnCallback;

function transformer(prev, method, payload, signal){
    outgoingRequests.push({ method, payload, signal });
    return transformerReturnCallback (method,payload);
}

beforeEach(async () => {
    bot=new ExampleBot('test','test');

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
    await bot.handleUpdate(generateCommand("/start"));

    expect(outgoingRequests.length).toBe(1);
    expect(outgoingRequests.pop().payload.text).toBe("Received /start command.");
}, 5000);

test("gets right text on other messages", async () => {
    await bot.handleUpdate(generateMessage("foo"));

    expect(outgoingRequests.length).toBe(1);
    expect(outgoingRequests.pop().payload.text).toBe("Got another message!");
}, 5000);






