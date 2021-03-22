<template>
  <v-main>
    <form>
      <div v-if="groupInfo.name == undefined">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-dialog
              ref="dialog1"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Picker in dialog"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog1.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="11" sm="5">
            <v-dialog
              ref="dialog"
              v-model="modal3"
              :return-value.sync="time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Picker in dialog"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="modal3" v-model="time" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal3 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(time)">
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="homeTeam"
              return-object
              :items="teams"
              item-text="name"
              label="Home Team"
              outlined
            ></v-select>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="awayTeam"
              return-object
              :items="teams"
              item-text="name"
              label="Away Team"
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveFixture" color="info">Save Fixture</v-btn>
        </v-card-actions>
      </div>
      <div v-else>Please add teams</div>
      <v-alert v-if="message" type="success">
        {{ message }}
      </v-alert>
      <v-alert v-if="error" type="success">
        {{ error }}
      </v-alert>
    </form>
  </v-main>
</template>

<script>
import FirebaseService from "../services/FirebaseService";

export default {
  name: "AddStageFixture",
  props: ["groupInfo"],
  data() {
    return {
      homeTeam: null,
      awayTeam: null,
      message: "",
      group: null,
      error: "",
      img1: "",
      imageData: null,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      time: null,
      modal3: false,
      name: null
    };
  },
  watch: {
    groupInfo: function(groupInfo) {
      console.log("wagwan", groupInfo);
      if (groupInfo.teams !== undefined) {
        var newArray = [];
        for (var key in groupInfo.teams) {
          var obj = groupInfo.teams[key];
          console.log("knocks", key);

          //get the key and display
          obj.key = key;
          newArray.push(obj);
        }
        //         var obj = 4
        // var newData = [...arr1, obj]
        console.log("knocks", newArray);
        this.teams = newArray;
        this.message = "";
      }
    }
  },

  methods: {
    saveFixture() {
      const data = {
        homeTeam: JSON.parse(JSON.stringify(this.homeTeam)),
        awayTeam: JSON.parse(JSON.stringify(this.awayTeam)),
        date: this.date,
        time: this.time
      };
      //var parsedobj = JSON.parse(JSON.stringify(this.groupInfo));
      FirebaseService.addKnockOutFixture(data)
        .then(() => {
          this.message = "The Fixture was updated successfully!";
          this.homeTeam = "";
          this.awayTeam = "";
        })
        .catch(e => {
          this.error = e;
        });
    }
  },

  mounted() {
    this.message = "";
    this.group = { ...this.groupInfo };
  }
};
</script>
