import { login, logout, send, loadPage } from "./service-calls.js";

/**
 *
 * @param {*} app - body element
 * this util function adds event listener to login button
 */
export const addLoginButtonEvent = (app) => {
  const button = document.querySelector(".btn-login");
  addInputUsernameEvent();
  button.onclick = (e) => {
    const input = document.querySelector(".input-username");
    if (!input.value.trim()) {
      const errorMsg = document.querySelector(".error-message-username");
      errorMsg.textContent = "Invalid Username";
    } else login(app);
  };
};

/**
 *
 * @param {*} app - body element
 * this util function adds event listener to username input
 */
export const addInputUsernameEvent = () => {
  const input = document.querySelector(".input-username");
  input.addEventListener("change", (e) => {
    console.log(e.target.value);
  });
};

/**
 *
 * @param {*} app - body element
 * this util fucntion adds event listener to logout button
 */
export const addLogoutButtonEvent = (app) => {
  const button = document.querySelector(".btn-logout");
  addInputTextEvent();
  button.onclick = (e) => {
    logout(app);
  };
};

/**
 *
 * @param {*} app - body element
 * this util fucntion adds event listener to send button
 */
export const addSendButtonEvent = (app) => {
  const button = document.querySelector(".btn-send");
  button.onclick = (e) => {
    const input = document.querySelector(".input-send");
    if (!input.value.trim()) {
      const errorMsg = document.querySelector(".error-message-text");
      errorMsg.textContent = "Send a valid message";
    } else send(app);
  };
};

/**
 *
 * @param {*} app - body element
 * this util fucntion adds event listener to message input
 */
export const addInputTextEvent = () => {
  const input = document.querySelector(".input-send");
  input.addEventListener("change", (e) => {
    console.log(e.target.value);
  });
};

/**
 *
 * @param {*} app - body element
 * this util fucntion adds event listener to refresh button
 */
export const addRefreshButtonEvent = (app) => {
  const button = document.querySelector(".btn-refresh");
  button.onclick = (e) => {
    loadPage(app);
  };
};
