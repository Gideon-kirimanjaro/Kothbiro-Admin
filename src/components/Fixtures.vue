<template>
  <v-container>
    <v-simple-table dark height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Home
            </th>
            <th class="text-left">
              Away
            </th>
            <th class="text-left">
              Time
            </th>
            <th class="text-left">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in currentFixtures.fixtures" :key="index">
            <td>{{ item.homeTeam.name }}</td>
            <td>{{ item.awayTeam.name }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.date }}</td>
            <td>
              <v-btn
                class="ma-2"
                outlined
                @click="showupdateMatchDialog(index, item)"
              >
                Add event
              </v-btn>
              <v-btn class="ma-2" outlined @click="showEvents(index, item)">
                Show events
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="dialog" :key="componentKey">
      <UpdateMatchModal
        :matchKey="matchKey"
        :teamGroupKey="this.currentFixtures.key"
        :fixture="fixture"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import UpdateMatchModal from "./modal/UpdateMatchModal.vue";

export default {
  name: "Fixtures",
  props: ["groupInfo"],
  components: { UpdateMatchModal },
  data() {
    return {
      currentFixtures: null,
      message: null,
      matchKey: "",
      teamGroupKey: null,
      dialog: false,
      componentKey: 0,
      fixture: null,
      dialogShowEvents: false
    };
  },
  watch: {
    groupInfo: function(groupInfo) {
      console.log("any yo", groupInfo);
      this.currentFixtures = { ...groupInfo };
      this.message = "";
    }
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    showEvents(key, item) {
      let events = [];
      var x;
      for (x of Object.entries(item)) {
        if (x[0] === "events") {
          events.push(Object.entries(x[1]));
        }
      }
      console.log("are we here ", events[0]);
    },
    showupdateMatchDialog(key, item) {
      console.log("are we here ", item);
      this.forceRerender();
      this.fixture = item;
      this.matchKey = key;
      this.dialog = true;
    }
  },

  mounted() {
    this.message = "";
    this.currentFixtures = { ...this.groupInfo };
  }
};
</script>
