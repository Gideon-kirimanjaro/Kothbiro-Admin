<template>
  <v-container fluid>
    <h1>Groups</h1>

    <v-row class="mb-6" no-gutters>
      <v-col md="3">
        <v-card class="pa-2" outlined tile>
          <v-list>
            <v-list-item
              v-for="(item, index) in groups"
              :key="index"
              :class="{ active: index == currentIndex }"
              @click="setActiveTutorial(item, index)"
            >
              <v-list-item-icon>
                <v-icon v-if="item.icon" color="pink">
                  mdi-star
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.key"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="9">
        <v-card class="pa-2" outlined tile>
          <div v-if="currentGroup">
            <stage-teams
              :group_teams="currentGroup"
              :current_index="currentIndex"
            />
          </div>
          <div v-else>
            <br />
            <p>Please click on a group...</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FirebaseService from "../services/FirebaseService";
import StageTeams from "./StageTeams.vue";

export default {
  name: "Knockout",
  components: { StageTeams },
  data() {
    return {
      groups: [],
      currentGroup: null,
      currentIndex: -1
    };
  },

  methods: {
    stages(items) {
      let _groups = [];

      items.forEach(item => {
        let key = item.key;
        let data = item.val();
        console.log("Knockout guys", key, data);
        _groups.push({
          key: key
        });
      });

      this.groups = _groups;
    },

    refreshList() {
      let currentGroup = this.currentGroup;
      let currentIndex = this.currentIndex;
      if (currentIndex !== -1) {
        this.currentGroup = currentGroup;
        this.currentIndex = currentIndex;
      } else {
        this.currentGroup = null;
        this.currentIndex = -1;
      }
    },

    setActiveTutorial(group, index) {
      this.currentGroup = group;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      FirebaseService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    FirebaseService.getKnockOut().on("value", this.stages);
  },
  beforeDestroy() {
    FirebaseService.getKnockOut().off("value", this.stages);
  }
};
</script>
