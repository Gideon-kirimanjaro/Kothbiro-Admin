<template>
  <v-container>
    <v-simple-table dark height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Team
            </th>
            <th class="text-left">
              Played
            </th>
            <th class="text-left">
              Win
            </th>
            <th class="text-left">
              Draw
            </th>
            <th class="text-left">
              Loss
            </th>
            <th class="text-left">
              Pts
            </th>
            <th class="text-left">
              Goal Difference
            </th>
            <th class="text-left">
              Goals for
            </th>
            <th class="text-left">
              Goals against
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in currentTeam" :key="index">
            <td>{{ item.name }}</td>
            <td v-if="item.general">
              {{ Object.entries(item.general)[0][1].Played }}
            </td>
            <td v-if="item.general">
              {{ Object.entries(item.general)[0][1].Win }}
            </td>
            <td v-if="item.general">
              {{ Object.entries(item.general)[0][1].Draw }}
            </td>
            <td v-if="item.general">
              {{ Object.entries(item.general)[0][1].Lost }}
            </td>
            <td v-if="item.general">
              {{ Object.entries(item.general)[0][1].Points }}
            </td>
            <td v-if="item.general">
              {{ Object.entries(item.general)[0][1].Goaldifference }}
            </td>
            <td v-if="item.general">
              {{ Object.entries(item.general)[0][1].GoalFor }}
            </td>
            <td v-if="item.general">
              {{ Object.entries(item.general)[0][1].GoalAgainst }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  name: "Fixtures",
  props: ["currentGroupTeam"],
  data() {
    return {
      currentTeam: null,
      message: null
    };
  },
  watch: {
    currentGroupTeam: function(currentGroupTeam) {
      console.log("any wert yo", currentGroupTeam);

      this.currentTeam = { ...currentGroupTeam };
      this.message = "";
    }
  },

  mounted() {
    this.message = "";
    console.log("any wert yo", this.currentGroupTeam);

    this.currentTeam = { ...this.currentGroupTeam };
  }
};
</script>
