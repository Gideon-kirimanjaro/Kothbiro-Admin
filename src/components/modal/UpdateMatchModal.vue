<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Event </span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
 
        <v-select ref="selectedItem"
          :items="items"
          label="Outlined style"
          v-model="Event"
          outlined
        ></v-select>

          </v-col>
          <v-col cols="12" sm="6" md="4">
         <v-select ref="selectedItem"
          :items="teams"
          label="Outlined style"
          v-model="Team"
          outlined
        ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Player*"
              hint="Player Name"
              type="text"
              v-model="Player"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
            <v-col cols="12" sm="6" md="4">
            <v-text-field v-if="Event=== 'Sub'"
              label="Player*"
              hint="Player In"
              type="text"
              v-model="PlayerIn"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Time in minutes"
              type="number"
              v-model="Time"
              hint="Time"
            ></v-text-field>
          </v-col>
        
     
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="blue darken-1" text @click="updateMath()">
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
  name: "UpdateMatchModal",
  props: ["matchKey", "teamGroupKey","fixture"],
  data() {
    return {
      dialog: false,
      Event:"",
      Team:"",
      error: "",
      message: "",
      Player: "",
      PlayerIn:"",
      Time:0,
      items: ['Score', 'Yellow Card', 'Red Card', 'Sub'],
      teams:[],
      Teams:null,
      fullTeam:null


    };
  },
    mounted() {
    this.message = "";
    this.Teams = { ...this.fixture };
    console.log("home",  Object.entries(this.Teams));
    console.log("team home",  Object.entries(this.Teams)[0][1]);
    console.log("team away how",  Object.entries(this.Teams)[2][1]);

let teamsNew = [];
var x;
for (x of Object.entries(this.Teams)) {
    if (x[0]==="awayTeam") {
      
      teamsNew.push(x [1].name );
      }
    if (x[0]==="homeTeam"){ 
      teamsNew.push(x [1].name );
};

}
//Loop find where 
      
  

      this.teams=teamsNew;
    console.log("any how yo",  this.teams)

   
  },
    watch: {
    fixture: function(groupTeam) {
      console.log("any how", groupTeam);
      this.Teams = { ...groupTeam };
      this.message = "";
    }
   
  },
  methods: {


    updateMath() {


if(this.team=== Object.entries(this.Teams)[0][1].name){
  this.fullTeam=Object.entries(this.Teams)[0][1]
}else this.fullTeam=Object.entries(this.Teams)[2][1]

var general;
if(this.Event==="Sub"){
general = {
        Event: this.Event,
        Team: this.fullTeam,
        Player: this.Player,  
        PlayerIn: this.PlayerIn,  
        Time: this.Time,      
      };
}else {
   general = {
        Event: this.Event,
        Team: this.fullTeam,
        Player: this.Player,  
        Time: this.Time,      
      };
}
      console.log("This team",this.fullTeam)
      
      FirebaseService.updateFixture(
        this.teamGroupKey,
        this.matchKey,
        general
      )
        .then(() => {
          this.message = "Fixture was updated successfully!";
          this.dialog = false;
        
          this.teamGroupKey = "";
          this.matchKey = "";
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
};
</script>
