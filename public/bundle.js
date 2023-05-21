/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addInputTextEvent": () => (/* binding */ addInputTextEvent),
/* harmony export */   "addInputUsernameEvent": () => (/* binding */ addInputUsernameEvent),
/* harmony export */   "addLoginButtonEvent": () => (/* binding */ addLoginButtonEvent),
/* harmony export */   "addLogoutButtonEvent": () => (/* binding */ addLogoutButtonEvent),
/* harmony export */   "addRefreshButtonEvent": () => (/* binding */ addRefreshButtonEvent),
/* harmony export */   "addSendButtonEvent": () => (/* binding */ addSendButtonEvent)
/* harmony export */ });
/* harmony import */ var _service_calls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-calls.js */ "./src/service-calls.js");

/**
 *
 * @param {*} app - body element
 * this util function adds event listener to login button
 */

var addLoginButtonEvent = function addLoginButtonEvent(app) {
  var button = document.querySelector(".btn-login");
  addInputUsernameEvent();

  button.onclick = function (e) {
    var input = document.querySelector(".input-username");

    if (!input.value.trim()) {
      var errorMsg = document.querySelector(".error-message-username");
      errorMsg.textContent = "Invalid Username";
    } else (0,_service_calls_js__WEBPACK_IMPORTED_MODULE_0__.login)(app);
  };
};
/**
 *
 * @param {*} app - body element
 * this util function adds event listener to username input
 */

var addInputUsernameEvent = function addInputUsernameEvent() {
  var input = document.querySelector(".input-username");
  input.addEventListener("change", function (e) {
    console.log(e.target.value);
  });
};
/**
 *
 * @param {*} app - body element
 * this util fucntion adds event listener to logout button
 */

var addLogoutButtonEvent = function addLogoutButtonEvent(app) {
  var button = document.querySelector(".btn-logout");
  addInputTextEvent();

  button.onclick = function (e) {
    (0,_service_calls_js__WEBPACK_IMPORTED_MODULE_0__.logout)(app);
  };
};
/**
 *
 * @param {*} app - body element
 * this util fucntion adds event listener to send button
 */

var addSendButtonEvent = function addSendButtonEvent(app) {
  var button = document.querySelector(".btn-send");

  button.onclick = function (e) {
    var input = document.querySelector(".input-send");

    if (!input.value.trim()) {
      var errorMsg = document.querySelector(".error-message-text");
      errorMsg.textContent = "Send a valid message";
    } else (0,_service_calls_js__WEBPACK_IMPORTED_MODULE_0__.send)(app);
  };
};
/**
 *
 * @param {*} app - body element
 * this util fucntion adds event listener to message input
 */

var addInputTextEvent = function addInputTextEvent() {
  var input = document.querySelector(".input-send");
  input.addEventListener("change", function (e) {
    console.log(e.target.value);
  });
};
/**
 *
 * @param {*} app - body element
 * this util fucntion adds event listener to refresh button
 */

var addRefreshButtonEvent = function addRefreshButtonEvent(app) {
  var button = document.querySelector(".btn-refresh");

  button.onclick = function (e) {
    (0,_service_calls_js__WEBPACK_IMPORTED_MODULE_0__.loadPage)(app);
  };
};

/***/ }),

/***/ "./src/service-calls.js":
/*!******************************!*\
  !*** ./src/service-calls.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadPage": () => (/* binding */ loadPage),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "send": () => (/* binding */ send)
/* harmony export */ });
/* harmony import */ var _listeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listeners.js */ "./src/listeners.js");


var host = "http://localhost:3000/api/v1";
/**
 *
 * @param {*} app - body element
 * Loads the page. If there is a session,
 * renders login page template otherwise renders home page template
 */

var loadPage = function loadPage(app) {
  fetch("".concat(host, "/home"), {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  }).then(function (response) {
    return response.json().then(function (obj) {
      app.innerHTML = obj.html;

      if (obj.page === "login") {
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addLoginButtonEvent)(app);
      } else if (obj.page === "home") {
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addLogoutButtonEvent)(app);
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addSendButtonEvent)(app);
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addRefreshButtonEvent)(app);
      }
    });
  });
};
/**
 *
 * @param {*} app - body element
 * POST request api call to /api/v1/login endpoint. Triggers on user login.
 */

var login = function login(app) {
  var input = document.querySelector(".input-username");
  fetch("".concat(host, "/login"), {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      username: input.value
    })
  }).then(function (response) {
    return response.json().then(function (obj) {
      app.innerHTML = obj.html;

      if (obj.page === "login") {
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addLoginButtonEvent)(app);
        var errorMsg = document.querySelector(".error-message-username");
        if (response.status === 403) errorMsg.textContent = response.statusText;
      } else if (obj.page === "home") {
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addLogoutButtonEvent)(app);
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addSendButtonEvent)(app);
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addRefreshButtonEvent)(app);
      }
    });
  });
};
/**
 *
 * @param {*} app - body element
 * POST request api call to create a new message and add it to the list
 */

var send = function send(app) {
  var text = document.querySelector(".input-send");
  var username = document.querySelector(".current-user");
  fetch("".concat(host, "/send"), {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      sender: username.value,
      text: text.value
    })
  }).then(function (response) {
    return response.json().then(function (obj) {
      app.innerHTML = obj.html;
      if (obj.page === "login") (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addLoginButtonEvent)(app);else if (obj.page === "home") {
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addLogoutButtonEvent)(app);
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addSendButtonEvent)(app);
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addRefreshButtonEvent)(app);
      }
    });
  });
};
/**
 *
 * @param {*} app - body element
 * GET request api call to logout the user and delete the session cookie
 */

var logout = function logout(app) {
  fetch("".concat(host, "/logout"), {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  }).then(function (response) {
    return response.json().then(function (obj) {
      app.innerHTML = obj.html;
      if (obj.page === "login") (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addLoginButtonEvent)(app);else if (obj.page === "home") {
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addLogoutButtonEvent)(app);
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addSendButtonEvent)(app);
        (0,_listeners_js__WEBPACK_IMPORTED_MODULE_0__.addRefreshButtonEvent)(app);
      }
    });
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service_calls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-calls.js */ "./src/service-calls.js");

var app = document.querySelector("body");
(0,_service_calls_js__WEBPACK_IMPORTED_MODULE_0__.loadPage)(app);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map