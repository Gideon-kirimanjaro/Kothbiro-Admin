import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#000000",
        secondary: "#000000",
        accent: "#000000",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  icons: {
    iconfont: "mdi" // default is 'mdi'
  },
  options: {
    customProperties: true
  }
});
