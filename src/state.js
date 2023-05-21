const users = {};

const sessions = {};

const messages = [];

function addMessage({ sender, text }) {
  const chatMessage = {
    sender,
    text,
  };
  messages.push(chatMessage);
}

const chat = {
  users,
  sessions,
  messages,
  addMessage,
};

module.exports = chat;
