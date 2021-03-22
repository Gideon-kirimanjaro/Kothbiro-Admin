<template>
  <div v-if="currentGroupTeams">
    <h1>{{ currentGroupTeams.title }}</h1>
    <v-row>
      <v-col md="12">
        <v-row no-gutters>
          <v-col md="6">
            <div v-if="currentGroupTeams.teams">
              <v-list>
                <v-list-item
                  v-for="(item, index) in currentGroupTeams.teams"
                  :key="index"
                >
                  <v-list-item-avatar>
                    <v-img
                      v-if="item.icon"
                      :src="item.icon"
                      :lazy-src="
                        `https://picsum.photos/10/6?image=${n * 5 + 10}`
                      "
                      aspect-ratio="1"
                      class="grey lighten-2"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-icon>
                    <v-icon v-if="item.icon" color="pink">
                      {{ item.icon }}
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                  <h1 v-if="item.general">😢</h1>
                  <v-list-item-action v-else>
                    <v-btn icon @click.stop="showDialog(index)">
                      <v-icon color="grey lighten-1"
                        >mdi-plus-circle-outline</v-icon
                      >
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-action>
                    <v-btn icon @click="deleteTeam(index)">
                      <v-icon color="red lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <br />
              </v-list>
            </div>

            <add-team :groupInfo="currentGroupTeams" />
          </v-col>

          <v-col md="6">
            <v-card>
              <v-tabs v-model="tab" centered dark icons-and-text>
                <v-tabs-slider></v-tabs-slider>

                <v-tab>
                  Fixtures
                </v-tab>

                <v-tab>
                  Standings
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-card flat>
                    <FixturesPerGroup :groupInfo="currentGroupTeams" />
                  </v-card>
                </v-tab-item>

                <v-tab-item>
                  <Standings :currentGroupTeam="currentGroupTeams.teams" />
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" :key="componentKey">
      <UpdatePointsModal
        :teamKey="teamKey"
        :teamGroupKey="this.currentGroupTeams.key"
      />
    </v-dialog>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import FirebaseService from "../services/FirebaseService";

import AddTeam from "./AddTeam.vue";
import FixturesPerGroup from "./FixturesPerGroup.vue";
import Standings from "./Standings.vue";
import UpdatePointsModal from "./modal/UpdatePointsModal.vue";

export default {
  components: { AddTeam, FixturesPerGroup, UpdatePointsModal, Standings },
  name: "group_teams",
  props: ["group_teams", "current_index"],
  data() {
    return {
      tab: null,
      componentKey: 0,
      currentGroupTeams: null,
      standings: null,
      dialog: false,
      message: "",
      currentIndex: null,
      teamKey: ""
    };
  },
  watch: {
    group_teams: function(groupTeam) {
      console.log("any", groupTeam);
      this.currentGroupTeams = { ...groupTeam };
      this.message = "";
    }
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    showDialog(key) {
      this.forceRerender();
      this.teamKey = key;
      this.dialog = true;
    },
    onDataChange(items) {
      console.log("iweeee", items);

      let _groups = [];

      items.forEach(item => {
        let key = item.key;
        let data = item.val();

        console.log("iweeee", data.teams);

        _groups.push({
          key: key,
          title: data.name,
          description: data.name,
          teams: data.teams,
          fixtures: data.fixtures
        });
      });

      this.currentGroupTeams = _groups[this.current_index];
    },

    deleteTeam(key) {
      FirebaseService.deleteTeam(this.currentGroupTeams.key, key);
    }
  },
  mounted() {
    this.message = "";
    this.currentGroupTeams = { ...this.group_teams };
    this.currentIndex = { ...this.current_index };
    FirebaseService.getAll().on("value", this.onDataChange);
  },
  beforeDestroy() {
    FirebaseService.getAll().off("value", this.onDataChange);
  }
};
</script>
