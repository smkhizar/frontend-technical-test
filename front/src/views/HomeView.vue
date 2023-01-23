<template>
  <TopNavBar :realtors="[]" :selectedRealtor="{}" />
</template>

<script>
import TopNavBar from "../components/TopNavBar.vue";

export default {
  name: "home-view",

  components: {
    TopNavBar,
  },
};
</script>
