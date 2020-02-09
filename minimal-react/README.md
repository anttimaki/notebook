# Minimalistic React setup

This setup might come in handy when you just want to test something quickly with
React but feel that `create-react-app` is unsuitable for one reason or another.

To initialize, simply copy `frontend` folder to your project directory and then:

```
cd frontend
npm i
npm run serve
```

`frontend/index.js` will now work as the entry point for `webpack` and the
resulting bundle will be served from `http://localhost:8081/bundle.js`.
