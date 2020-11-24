# React SSR with Express 🚀

This project renders React pages and components directly from the Server so it increases SEO and general performance from the client browser point of view.

### Tech Stack:

- React & Redux
- Node & Express
- SCSS
- Jest & react-test-renderer

## How to use 🛠

Clone the project and run `npm install` to install all needed dependencies.

After that, run the command `npm run dev` so a new `dist` folder is build with all the bundled files from both the server and the client. You'll have a server running in the PORT specified in the `.env` file.

All changes made into any part of the code will trigger a webpack watcher so after reloading you'll be able to see the changes applied directly to the DOM.

This project can be deployed in a server instance. You can check out how it's using **Redux**, **SCSS** and some modern features applied through **Babel** plugins. It's consuming **Rick and Morty** API to show characters in a simple way so you can check how pagination, filtering and server load through params work 😎.

**You can check it out in [Heroku](https://react-express-ssr.herokuapp.com/)**

## Future improvements:

- Add **Hot Reloading** for the client side code so development experience is improved. I tried to add it but due to the server listening to changes through `nodemon` when developing the debugging was getting too long and confusing. Will try again in the future. 🔮

- Implement data caching and preload some endpoints using server custom endpoints (like `Next.js` does).

- Test and improve bundle splitting though `hash` names, needs some server work using a webpack plugin to register all names for every entrypoint file in a new JSON file.
