<template>
  <v-main>
    <Fixtures :groupInfo="groupInfo" />

    <div>
      <AddFixture :groupInfo="groupInfo" />
    </div>
  </v-main>
</template>

<script>
import AddFixture from "./AddFixture.vue";
import Fixtures from "./Fixtures.vue";

export default {
  name: "FixturesPerGroup",
  props: ["groupInfo"],
  components: { AddFixture, Fixtures },

  data() {
    return {
      group: null
    };
  }
};
</script>
