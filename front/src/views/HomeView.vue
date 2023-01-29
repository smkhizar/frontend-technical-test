<template>
  <div class="home-view">
    <TopNavBar :agences="allAgence" :messagesCount="unreadMessagesCount" :selectedAgenceName="agenceNameSelected" :onAgenceChange="onAgenceSwitch" />
    <v-flex id="bottom-view">
      <SideDrawerList :messages="allMessages" :handleMessageDetails="openMessageDetails" :continousScrolling="infiniteScrolling" v-if="showMessagesList === true" />
      <MessageDetails :message-selected="selectedMessage" v-if="showMessageDetails === true" />
    </v-flex>
  </div>
</template>

<script>
import TopNavBar from "../components/TopNavBar.vue";
import MessageDetails from "../components/MessageDetails.vue";
import SideDrawerList from "../components/SideDrawerList.vue";
import RealtorController from "../controllers/RealtorController";
import MessagesController from "../controllers/MessagesController";
import moment from "moment";
import lodash from "lodash";

export default {
  name: "home-view",
  data: () => ({
    RealtorController: RealtorController,
    MessagesController: MessagesController,
    allAgence: [],
    agenceNameSelected: "",
    unreadMessagesCount: 0,
    selectedMessage: undefined,
    pageSize: 10,
    sort: undefined,
    allMessages: [],
    route: undefined,
    agenceId: null,
    moment: moment,
    lodash: lodash,
    readMessageColor: "grey",
    titles: [],
    page: 0,
    showMessagesList: false,
    showMessageDetails: false,
    windowWidth: window.innerWidth,
    isInit: false,
  }),
  components: {
    TopNavBar,
    MessageDetails,
    SideDrawerList,
  },
  methods: {
    openMessageDetails(message) {
      this.showMessageDetails = true;
      if (this.selectedMessage !== message) {
        this.selectedMessage = message;
        this.$router
          .push({
            name: "realtor-message",
            params: { realtor_id: this.agenceId, message_id: message?.id },
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (message.read === false) {
        MessagesController.makeMessageRead(this.agenceId, message.id, { read: true })
          .then(() => {
            this.unreadMessagesCount = this.unreadMessagesCount--;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    onAgenceSwitch(item) {
      this.allMessages = [];
      this.selectedMessage = undefined;
      this.showMessageDetails = false;
      this.showMessagesList = true;
      this.agenceNameSelected = item.name;
      this.unreadMessagesCount = item.unread_messages;
      this.agenceId = item.id;
      this.$router
        .push({
          name: "realtor-messages",
          params: { realtor_id: this.agenceId },
        })
        .catch((error) => {
          console.log(error);
        });
      this.fetchMessages();
    },
    async fetchMessages() {
      MessagesController.getAllMessages(this.agenceId, this.query, this.pageSize, this.sort)
        .then((response) => {
          if (response.length !== 0) {
            this.allMessages = [...this.allMessages, ...response];
          } else {
            this.page = -1;
            this.fetchMessages();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    infiniteScrolling(entries, observer, isIntersecting) {
      setTimeout(() => {
        if (this.agenceId !== null && isIntersecting === true && this.isInit === true) {
          this.page === 0 ? (this.page = this.page + 2) : this.page++;
          if (this.$route.name !== "realtor-message") {
            this.$router
              .push({
                name: "realtor-messages",
                params: { realtor_id: this.agenceId },
                query: { page: this.page },
              })
              .catch((error) => {
                console.log(error);
              });
          }
          this.fetchMessages();
        }
      }, 500);
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.route.name === "realtor-message") {
        if (this.windowWidth < 681) {
          this.showMessageDetails = true;
          this.showMessagesList = false;
        } else {
          this.showMessageDetails = true;
          this.showMessagesList = true;
        }
      }
    },
  },
  async created() {
    this.route = this.$route;
    RealtorController.getRealtors()
      .then((response) => {
        this.allAgence = response;
        if (this.$route.name === "realtor-messages" || this.$route.name === "realtor" || this.route.name === "realtor-message") {
          let agence = lodash.find(response, (item) => item.id.toString() === this.$route.params.realtor_id.toString());
          this.agenceNameSelected = agence.name;
          this.unreadMessagesCount = agence.unread_messages;
          this.agenceId = agence.id;
          this.showMessagesList = true;
          if (this.route?.query?.page !== "" || this.route.query?.page !== undefined || this.route.query?.page !== "0") {
            if (this.route.fullPath.includes("page=")) {
              this.page = parseInt(this.route.query.page);
            }
          }
          if (this.route?.query?.page_size !== "" || this.route.query?.page_size !== undefined || this.route.query?.page_size !== "0") {
            if (this.route.fullPath.includes("page_size=")) {
              this.pageSize = parseInt(this.route.query.page_size);
            }
          }
          if (((this.route?.query?.sort !== null || this.route.query?.sort !== undefined) && this.route.query?.sort === "date:desc") || this.route.query?.sort === "date:asc") {
            this.sort = this.route.query?.sort;
          }
          if (this.route.params?.message_id >= 0) {
            let messageId = this.route.params?.message_id;
            MessagesController.getMessageDetails(this.agenceId, messageId)
              .then((responseMessage) => {
                this.selectedMessage = responseMessage;
                this.showMessageDetails = true;
              })
              .catch((error) => {
                console.log(error);
              });
          }
          this.fetchMessages();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    query() {
      return this.page;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    setTimeout(() => {
      this.isInit = true;
    }, 1000);
  },
  updated() {
    if (this.route.name === "realtor-message") {
      if (this.windowWidth < 681) {
        this.showMessageDetails = true;
        this.showMessagesList = false;
      } else {
        this.showMessageDetails = true;
        this.showMessagesList = true;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<style lang="scss">
.home-view {
  ::-webkit-scrollbar {
    display: none;
    width: 0px;
    background: transparent;
  }
}
</style>
