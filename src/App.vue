<template>
  <v-app>
    <Home />
  </v-app>
</template>

<script>
import Home from "./views/Home";
import FirebaseService from "./services/FirebaseService";

export default {
  name: "App",
  components: { Home },
  data() {
    return {
      stageTeams: []
    };
  },
  provide() {
    return {
      stageTeams: this.stageTeams
    };
  },

  mounted() {
    // let groupKey = "-MNC5oAbWZyL7fxFcTZh";
    // let teamKey = "-MQm6f8gBzYx7u36_UgL";
    let fixture = {
      homeTeam: "Ken FC",
      awayTeam: "Kinuthia FC",
      time: "11.30",
      date: "11/-0/2020",
      events: {
        yellowCard: "4",
        goals: "2"
      }
    };
    FirebaseService.addRoundOf16(fixture);
  }
};
</script>

<style scoped>
h4 {
  color: teal;
}
</style>
