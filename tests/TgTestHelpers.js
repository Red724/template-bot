class TgTestHelpers{
    static generateMessage(message) {
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
    static generateCommand(command) {
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
}
module.exports = TgTestHelpers;