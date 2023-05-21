# JS Chat

A SPA using JS as shown in class that calls REST services. This SPA is a simple Chat application.

### Running Requirements

- This app is usable as it would be in production by running `npm install` (once only), `npm run build`, `npm start`
  - You may include other commands/scripts for development if you wish

### Learning Goals of this assignment:

- Written RESTful services using express, following the 3 Basic Rules of Rest
- Called RESTful services in front end JS using fetch
- Practiced maintaining persistent state on the server and using services to load and update client state
- Practiced using browser based JS to maintain and update state, and use that state to render updates to the HTML
- Practiced using RESTful services for authentication/authorization
- Written a basic polling feature to check the server for updates and update client state

### Overview

- Written an express server that serves static assets and RESTful services
- Loaded a static HTML page as the SPA from your express server
- The HTML loads a static JS file bundled and transpiled with webpack and babel
- The SPA will require a user to login to view/use the chat
  - The SPA will determine (using a service call) on load if the user is already logged in. Users that are already logged in are not required to login again.
- A logged in user will see a list of messages, a list of currently logged in users, and will be able to send messages
- Every message will identify which user sent it
- Every 5 seconds (roughly) the client side will check to see if there are new messages and/or if the list of currently logged in users has changed
- A user can logout and return to the login screen
  - This removes that session from the list of currently logged in users
  - A given user might be logged in more than once at the same time (using multiple browsers or different browser profiles here, more often on phone/desktop in realitry)! Make sure the username only shows up once regardless of how many simultaneous sessions they have, and that the username only leaves the list of currently logged in user when all sessions are logged out of
  - Because we are only counting explicit "logout" actions, this app will consider a user that left the app (closing the tab or navigating to another page) as still "logged in" - that is fine for this assignment
- Multiple users can be logged in at once (use different browsers or different browser profiles) and can send and see messages from one another

### Security Requirements

- There is no password involved at all
- User "dog" will be rejected with a 403 error on login
- Services that require authorization respond with the appropriate Status Codes (401, 403) if the request does not have a valid sid cookie value
- There is no requirement to sanitize messages, BUT you should think about what would be required to prevent injection attacks and how you would do so.
- All service calls that return lists of users or lists of messages require authorization
- The services never trust the user input to decide which user is sending a message (That is, the username will not be input for service calls to send messages - instead, use the sid to find what username that session belongs to and use that). This is different than with the basic-express assignment (we had not done login at that time)

### Quality Requirements

- Followed the best practices outlined in the course so far for JS, CSS, HTML, services, and file structures
- The services follow the REST requirements
- The service urls are in an `/api/` path
