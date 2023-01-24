<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <TopNavBar :agences="agence" :selectedAgenceName="agenceNameSelected" :onAgenceChange="onAgenceSwitch"/>
    <SideDrawerList style="margin-top: 0.4rem" />
  </div>
</template>

<script>
import TopNavBar from "../components/TopNavBar.vue";
import SideDrawerList from "../components/SideDrawerList.vue";
import RealtorController from "../controllers/RealtorController";
export default {
  name: "home-view",
  data: () => ({
    RealtorController: RealtorController,
    agence: [],
    agenceNameSelected: "",
  }),
  components: {
    TopNavBar,
    SideDrawerList,
  },
  methods: {
    onAgenceSwitch(item) {
      this.agenceNameSelected = item.name;
    },
  },
  async created() {
    RealtorController.getRealtors()
      .then((response) => {
        this.agence = response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
