const render = {
  chatPage: function (data, username) {
    return {
      page: "home",
      html: `
      <div id="chat-app">
      <div class="buttons-section">
      <button class="btn-logout">Logout</button>
      <button class="btn-refresh">Refresh</button>
      </div>
        ${render.getMessageList(data)}
        ${render.getOutgoing(username)}
      </div>
`,
    };
  },

  loginPage: function () {
    return {
      page: "login",
      html: `
      <img class="app-icon" alt="app-icon" src="./images/telegram.png" />
      <div id="login-app">
        <span class="error-message-username"></span>
        <input class="input-username" type="text" name="username" value="" placeholder="Enter Username" />
        <button class="btn-login">Login</button>
      </div>
`,
    };
  },

  getMessageList: function (data) {
    return (
      `<ol class="messages">` +
      data.messages
        .map(
          (message, index) =>
            `<li>
          <div class="message">
            <div class="sender-info">
              <img class="avatar" alt="avatar of SriHarsha" src="./images/blank.webp"/>
              <span class="username">${message.sender}</span>
              <span class="status">
              <img class="user-status-icon" src="images/${
                Object.values(data.sessions).includes(message.sender)
                  ? "online.png"
                  : "offline.png"
              }" />
              </span>
              <span class="user-status">${
                Object.values(data.sessions).includes(message.sender)
                  ? "Online"
                  : "Offline"
              }</span>
            </div>
            <p class="message-text">${message.text}</p>
          </div>
        </li>`
        )
        .join("") +
      `</ol>`
    );
  },
  getOutgoing: function (username) {
    return `
    <div class="outgoing">
      <input class="current-user" type="hidden" name="username" value=${username}>
      <span class="error-message-text"></span>
      <div class="message-submit">
      <input class="input-send" name="text" placeholder="Enter message to send"/>
      <button class="submit-form-button btn-send">
      <img class="send-message-icon" alt="send message icon" src="images/send-icon.png" />
      </button>
      </div>
    </form>
    </div>`;
  },
};
module.exports = render;
