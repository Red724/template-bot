class TgTestHelpers {
    static testFirstName = "Firstname";
    static testUserName = "username";
    static testUserId = "12345";

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

    static generateCommandInSupergroup(command, chatId) {
        return {
            "update_id": 945652587,
            "message": {
                "message_id": 136,
                "from": {
                    "id": this.testUserId,
                    "is_bot": false,
                    "first_name": this.testFirstName,
                    "username": this.testUserName,
                    "language_code": "ru"
                },
                "chat": {
                    "id": chatId,
                    "title": "тестовая супергруппа",
                    "is_forum": true,
                    "type": "supergroup"
                },
                "date": 1733785274,
                "text": command,
                "entities": [
                    {
                        offset: 0,
                        length: command.length,
                        type: "bot_command"
                    }
                ],
            }
        }
    }

    static generateCommandInTopic(command, chatId, threadId) {
        return {
            "update_id": 945652594,
            "message": {
                "message_id": 149,
                "from": {
                    "id": this.testUserId,
                    "is_bot": false,
                    "first_name": this.testFirstName,
                    "username": this.testUserName,
                    "language_code": "ru"
                },
                "chat": {
                    "id": chatId,
                    "title": "тестовая супергруппа",
                    "is_forum": true,
                    "type": "supergroup"
                },
                "date": 1733880677,
                "message_thread_id": threadId,
                "reply_to_message": {
                    "message_id": 2,
                    "from": {
                        "id": this.testUserId,
                        "is_bot": false,
                        "first_name": this.testFirstName,
                        "username": this.testUserName,
                        "language_code": "ru"
                    },
                    "chat": {
                        "id": chatId,
                        "title": "тестовая супергруппа",
                        "is_forum": true,
                        "type": "supergroup"
                    },
                    "date": 1730463726,
                    "message_thread_id": 2,
                    "forum_topic_created": {
                        "name": "тестовый топик",
                        "icon_color": 13338331
                    },
                    "is_topic_message": true
                },
                "text": command,
                "entities": [
                    {
                        offset: 0,
                        length: command.length,
                        type: "bot_command"
                    }
                ],
                "is_topic_message": true
            }
        }
    }
}

module.exports = TgTestHelpers;