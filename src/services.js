const { v4: uuidv4, validate } = require("uuid");
const state = require("./state"); //app state
const render = require("./render"); //templates to render in the SPA

function services(app) {
  /**
   * service to render home template if there is a session,
   * render login template if there is no session
   */
  app.get("/api/v1/home", (req, res) => {
    const sid = req.cookies.sid;
    const username = state.sessions[sid];
    if (!sid || !validate(sid) || !username) {
      res.status(401).send(render.loginPage());
      return;
    }
    res.status(200).send(render.chatPage(state, username));
  });

  /**
   * service to create a new message and add it to the server state.
   */
  app.post("/api/v1/send", (req, res) => {
    const sid = req.cookies.sid;
    const username = state.sessions[sid];
    if (!sid || !validate(sid) || !username) {
      res.status(401).send(render.loginPage());
      return;
    }

    const { text, sender } = req.body;
    chatMessage = {
      sender,
      text,
    };
    state.addMessage(chatMessage);
    res.status(200).send(render.chatPage(state, username));
  });

  /**
   * service to create a new session based on username.
   * returns 401 - invalid input,
   * returns 403 - username "dog"
   */
  app.post("/api/v1/login", (req, res) => {
    const username = req.body.username.trim();
    const userNameRegex = /^[a-zA-Z0-9]+$/;
    const userMatch = username.match(userNameRegex);

    if (username === "dog") {
      res.status(403).send(render.loginPage()).end();
      return;
    } else if (!username || !userMatch) {
      res.status(401).send(render.loginPage()).end();
      return;
    }
    const sid = uuidv4();
    state.sessions[sid] = username;
    state.users[username] = username;

    let options = {};
    res.cookie("sid", sid, options);
    res.status(200).send(render.chatPage(state, username));
  });

  /**
   * deletes existing session and logs out the user
   */
  app.get("/api/v1/logout", (req, res) => {
    const sid = req.cookies.sid;
    if (sid && validate(sid)) {
      delete state.sessions[sid];
    }
    res.clearCookie("sid");
    res.status(200).send(render.loginPage());
  });
}

module.exports = services;
