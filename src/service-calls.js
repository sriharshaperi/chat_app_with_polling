import { addLoginButtonEvent } from "./listeners.js";
import {
  addLogoutButtonEvent,
  addSendButtonEvent,
  addRefreshButtonEvent,
} from "./listeners.js";

const host = "http://localhost:3000/api/v1";

/**
 *
 * @param {*} app - body element
 * Loads the page. If there is a session,
 * renders login page template otherwise renders home page template
 */
export const loadPage = (app) => {
  fetch(`${host}/home`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((response) =>
    response.json().then((obj) => {
      app.innerHTML = obj.html;
      if (obj.page === "login") {
        addLoginButtonEvent(app);
      } else if (obj.page === "home") {
        addLogoutButtonEvent(app);
        addSendButtonEvent(app);
        addRefreshButtonEvent(app);
      }
    })
  );
};

/**
 *
 * @param {*} app - body element
 * POST request api call to /api/v1/login endpoint. Triggers on user login.
 */

export const login = (app) => {
  const input = document.querySelector(".input-username");

  fetch(`${host}/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username: input.value }),
  }).then((response) =>
    response.json().then((obj) => {
      app.innerHTML = obj.html;
      if (obj.page === "login") {
        addLoginButtonEvent(app);
        const errorMsg = document.querySelector(".error-message-username");
        if (response.status === 403) errorMsg.textContent = response.statusText;
      } else if (obj.page === "home") {
        addLogoutButtonEvent(app);
        addSendButtonEvent(app);
        addRefreshButtonEvent(app);
      }
    })
  );
};

/**
 *
 * @param {*} app - body element
 * POST request api call to create a new message and add it to the list
 */
export const send = (app) => {
  const text = document.querySelector(".input-send");
  const username = document.querySelector(".current-user");

  fetch(`${host}/send`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ sender: username.value, text: text.value }),
  }).then((response) =>
    response.json().then((obj) => {
      app.innerHTML = obj.html;
      if (obj.page === "login") addLoginButtonEvent(app);
      else if (obj.page === "home") {
        addLogoutButtonEvent(app);
        addSendButtonEvent(app);
        addRefreshButtonEvent(app);
      }
    })
  );
};

/**
 *
 * @param {*} app - body element
 * GET request api call to logout the user and delete the session cookie
 */
export const logout = (app) => {
  fetch(`${host}/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((response) =>
    response.json().then((obj) => {
      app.innerHTML = obj.html;
      if (obj.page === "login") addLoginButtonEvent(app);
      else if (obj.page === "home") {
        addLogoutButtonEvent(app);
        addSendButtonEvent(app);
        addRefreshButtonEvent(app);
      }
    })
  );
};
