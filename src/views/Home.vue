<template>
  <main>
    <v-toolbar dark flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Kothbiro Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <Groups />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <Teams />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <Standings />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <Knockout />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </main>
</template>

<script>
import Groups from "../components/Groups";
import Teams from "../components/Teams";
import Standings from "../components/Standings";
import Knockout from "../components/Knockout";

export default {
  name: "Home",
  components: { Groups, Teams, Standings, Knockout },
  data() {
    return {
      tab: null,
      items: ["Groups", "Teams", "Standings", "Knockout"]
    };
  }
};
</script>
