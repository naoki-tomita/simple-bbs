import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase";

Vue.config.productionTip = false;

async function main() {
  const firebaseConfig = {
    apiKey: "AIzaSyDFUQMkdP9TKgewa_LALMmiMk-Y5Gne64Q",
    authDomain: "simple-bbs-c2f06.firebaseapp.com",
    databaseURL: "https://simple-bbs-c2f06.firebaseio.com",
    projectId: "simple-bbs-c2f06",
    storageBucket: "simple-bbs-c2f06.appspot.com",
    messagingSenderId: "137348430844",
    appId: "1:137348430844:web:da06b7bda270ecde"
  };
  // Initialize Firebase
  initializeApp(firebaseConfig);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}

main();
