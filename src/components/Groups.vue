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
                <v-list-item-title v-text="item.title"></v-list-item-title>
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
            <group-teams
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
import GroupTeams from "./GroupTeams.vue";

export default {
  name: "Groups",
  components: { GroupTeams },
  data() {
    return {
      groups: [],
      currentGroup: null,
      currentIndex: -1
    };
  },

  methods: {
    onDataChange(items) {
      let _groups = [];

      items.forEach(item => {
        let key = item.key;
        let data = item.val();

        _groups.push({
          key: key,
          title: data.name,
          description: data.name,
          teams: data.teams,
          fixtures: data.fixtures
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
    FirebaseService.getAll().on("value", this.onDataChange);
  },
  beforeDestroy() {
    FirebaseService.getAll().off("value", this.onDataChange);
  }
};
</script>
