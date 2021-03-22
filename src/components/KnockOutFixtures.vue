<template>
  <v-main>
    <fixtures :groupInfo="groupInfo" />

    <div>
      <add-stage-fixture :groupInfo="groupInfo" />
    </div>
  </v-main>
</template>

<script>
import AddStageFixture from "./AddStageFixture.vue";
import Fixtures from "./Fixtures.vue";

export default {
  name: "KnockOutFixtures",
  props: ["groupInfo"],
  components: { AddStageFixture, Fixtures },

  data() {
    return {
      group: null
    };
  }
};
</script>
