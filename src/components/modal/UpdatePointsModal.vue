<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add points</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Played"
              type="number"
              v-model="Played"
              hint="Games played"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Win*"
              hint="Games won"
              type="number"
              v-model="Win"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Draw*"
              hint="Games drawn"
              type="number"
              v-model="Draw"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Loss"
              type="number"
              v-model="Lost"
              hint="Games lost"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Points*"
              hint="Points"
              type="number"
              v-model="Points"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Goal For*"
              hint="Goal For"
              type="number"
              v-model="GoalFor"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Goal Against"
              hint="Goal Against"
              type="number"
              v-model="GoalAgainst"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="GD*"
              hint="GD"
              type="number"
              v-model="Goaldifference"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="blue darken-1" text @click="updatePoints()">
        Save
      </v-btn>
    </v-card-actions>
    <v-alert v-if="message" type="success">
      {{ message }}
    </v-alert>
    <v-alert v-if="error" type="success">
      {{ error }}
    </v-alert>
  </v-card>
</template>

<script>
import FirebaseService from "../../services/FirebaseService";

export default {
  name: "updatePointsModal",
  props: ["teamKey", "teamGroupKey"],
  data() {
    return {
      dialog: false,
      Played: 0,
      Win: 0,
      error: "",
      message: "",
      Draw: 0,
      Lost: 0,
      Points: 0,
      GoalFor: 0,
      GoalAgainst: 0,
      Goaldifference: 0
    };
  },
  methods: {
    updatePoints() {
      console.log("group key ", this.teamGroupKey);
      console.log("Team key", this.teamKey);
      const general = {
        Played: this.Played,
        Win: this.Win,
        Draw: this.Draw,
        Lost: this.Lost,
        Points: this.Points,
        GoalFor: this.GoalFor,
        GoalAgainst: this.GoalAgainst,
        Goaldifference: this.Goaldifference
      };
      console.log("Team key", general);

      FirebaseService.addTeamGeneralPoints(
        this.teamGroupKey,
        this.teamKey,
        general
      )
        .then(() => {
          this.message = "The team general points was updated successfully!";
          this.dialog = false;
          this.Played = 0;
          this.Win = 0;
          this.Draw = 0;
          this.Lost = 0;
          this.Points = 0;
          this.GoalFor = 0;
          this.GoalAgainst = 0;
          this.Goaldifference = 0;
          this.teamGroupKey = "";
          this.teamKey = "";
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
};
</script>
