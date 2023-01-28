<template>
  <div class="home-view">
    <TopNavBar :agences="allAgence" :messagesCount="unreadMessagesCount" :selectedAgenceName="agenceNameSelected" :onAgenceChange="onAgenceSwitch" />
    <v-flex id="bottom-view">
      <div fill-height class="drawer-container" id="drawer-container" style="float: left; margin-top: 0.9rem" v-if="showMessagesList === true">
        <v-card elevation="3" outlined shaped tile>
          <v-layout row wrap style="box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important">
            <v-flex v-for="(message, index) in allMessages" :key="index">
              <v-card flat hover class="white" @click="openMessageDetails(message)">
                <v-layout>
                  <v-flex xs11>
                    <v-list-item two-line v-if="allMessages.length !== 0">
                      <v-list-item-avatar style="margin-top: -1.5rem">
                        <v-icon v-if="message.type === 'sms'" :style="message.read === false ? 'color: #5009dc' : 'color: grey'">{{ message.read === false ? "mdi-message-alert" : "mdi-message" }}</v-icon>
                        <v-icon v-else-if="message.type === 'phone'" :style="message.read === false ? 'color: #5009dc' : 'color: grey'">{{ "mdi-phone" }}</v-icon>
                        <v-icon v-else :style="message.read === false ? 'color: #5009dc' : 'grey'">{{ message.read === false ? "mdi-email" : "mdi-email-open" }}</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-row>
                          <v-col cols="8" sm="8" md="8" lg="8">
                            <v-list-item-title :style="message.read === false ? 'color: black;font-weight: bold;white-space: break-spaces' : 'color: grey;font-weight: bold;white-space: break-spaces'"
                              >{{ getName(message)
                              }}<span
                                style="font-size: 0.8rem; font-weight: 400; white-space: nowrap"
                                v-if="(message.type === 'phone' || message.type === 'sms') && message.contact.firstname !== '' && message.contact.lastname !== ''"
                                >{{ " (" + phoneNumFormat(message.contact.phone) + ")" }}</span
                              ></v-list-item-title
                            >
                          </v-col>
                          <v-col cols="4" sm="4" md="4" lg="4">
                            <v-list-item-subtitle :style="message.read === false ? 'text-align: end;color: #5009dc;white-space: break-spaces' : 'text-align: end;color: grey;white-space: break-spaces'"
                              >{{ getDateTime(message.date) }}
                            </v-list-item-subtitle>
                          </v-col>
                        </v-row>
                        <v-list-item-subtitle :style="message.read === false ? 'color: black' : 'color: grey'">{{ getSubject(message) }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{ getBody(message) }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-card v-intersect="infiniteScrolling"></v-card>
        </v-card>
      </div>
      <div fill-height style="float: left" id="message-details" v-if="selectedMessage && showMessageDetails === true">
        <v-container>
          <v-card elevation="0" shaped tile>
            <v-list-item two-line v-if="allMessages.length !== 0">
              <v-list-item-content>
                <v-row justify="start" style="margin-top: -1rem">
                  <v-col cols="4" md="2" sm="3" lg="2" l="2" style="max-width: 3.6rem">
                    <v-icon color="#5009dc">mdi-email</v-icon>
                  </v-col>
                  <v-col cols="8">
                    <v-list-item-subtitle id="name" style="font-size: 20px; font-weight: bold; color: black; white-space: pre-wrap">{{
                      selectedMessage.contact.firstname + " " + selectedMessage.contact.lastname
                    }}</v-list-item-subtitle>
                    <v-row justify="space-around" style="margin-top: 1rem">
                      <v-col class="d-flex" cols="4" xs="3">
                        <v-list-item-subtitle>{{ "Email" }}</v-list-item-subtitle>
                      </v-col>
                      <v-col class="d-flex" cols="8">
                        <v-list-item-subtitle style="font-weight: bold; color: #5009dc; white-space: pre-wrap">{{ selectedMessage?.contact?.email }}</v-list-item-subtitle>
                      </v-col>
                    </v-row>
                    <v-row justify="space-around" style="margin-top: -1rem">
                      <v-col class="d-flex" cols="4">
                        <v-list-item-subtitle>{{ "Phone" }}</v-list-item-subtitle>
                      </v-col>
                      <v-col class="d-flex" cols="8">
                        <v-list-item-subtitle style="font-weight: bold; color: #5009dc; white-space: pre-wrap">{{ selectedMessage?.contact?.phone }}</v-list-item-subtitle>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-card>
        </v-container>

        <v-container>
          <v-card style="height: auto; min-height: 100vh" elevation="0" shaped tile>
            <div style="text-align: justify">
              <v-card-title style="color: black; font-weight: bold; justify-content: left; margin-left: 3.5rem">{{ selectedMessage.contact.firstname + " " + selectedMessage.contact.lastname }}</v-card-title>
              <v-card-subtitle style="justify-content: left; margin-left: 3.5rem">{{ moment(selectedMessage.date).format("DD MMMM YYYY") + " at " + moment(selectedMessage.date).format("HH:mm") }}</v-card-subtitle>
              <v-card-subtitle style="color: black; justify-content: left; margin-left: 3.5rem">{{ selectedMessage.body }}</v-card-subtitle>
            </div>
          </v-card>
        </v-container>
      </div>
    </v-flex>
  </div>
</template>

<script>
import TopNavBar from "../components/TopNavBar.vue";
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
    },
    getBody(message) {
      if (message.type === "phone") {
        return "Call" + " # " + message.id;
      } else {
        return message.body;
      }
    },
    getDateTime(datetime) {
      let isToday = moment(datetime).isSame(new Date(), "day");
      let isYesterDay = moment(datetime).isSame(new Date(), "day");
      if (isToday) {
        return moment(datetime).format("HH:mm");
      } else if (isYesterDay) {
        return "Yesterday " + moment(datetime).format("HH:mm");
      } else {
        return moment(datetime).format("DD/MM/YY");
      }
    },
    phoneNumFormat(number) {
      return number
        .split(/(\d{2})/)
        .join(" ")
        .trim();
    },
    getName(message) {
      let firstName = message.contact.firstname;
      let lastName = message.contact.lastname;
      let type = message.type;
      switch (type) {
        case "email":
          if (firstName !== "" && lastName !== "") {
            return firstName + " " + lastName;
          } else {
            return message.contact.email;
          }
        case "phone":
          if (firstName !== "" && lastName !== "") {
            return firstName + " " + lastName;
          } else {
            return this.phoneNumFormat(message.contact.phone);
          }
        case "sms":
          if (firstName !== "" && lastName !== "") {
            return firstName + " " + lastName;
          } else {
            return this.phoneNumFormat(message.contact.phone);
          }
        default:
          break;
      }
    },
    getSubject(message) {
      if (message.type === "phone") {
        return "Call" + " # " + message.id;
      } else if (message.type === "sms") {
        return "Sms" + " # " + message.id;
      } else {
        return "Email" + " # " + message.id;
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
            this.page = 0;
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
          if (this.route?.query?.page === "" || this.route.query?.page !== undefined || this.route.query?.page !== "0") {
            if (this.route.fullPath.includes("page=")) {
              this.page = parseInt(this.route.query.page);
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

  #drawer-container {
    @media only screen and (min-width: 250px) and (max-width: 680px) {
      width: 100%;
      /* styles for browsers larger than 960px; */
    }

    @media only screen and (min-width: 681px) and (max-width: 1024px) {
      width: 50%;
      /* styles for browsers larger than 960px; */
    }

    @media only screen and (min-width: 1025px) and (max-width: 1200px) {
      width: 40%;
      /* styles for browsers larger than 960px; */
    }

    @media only screen and (min-width: 1201px) and (max-width: 1400px) {
      width: 35%;
      /* styles for browsers larger than 960px; */
    }

    @media only screen and (min-width: 1401px) {
      width: 30%;
      /* styles for browsers larger than 960px; */
    }
  }

  #message-details {
    @media only screen and (min-width: 250px) and (max-width: 680px) {
      /* styles for browsers larger than 960px; */
    }

    @media only screen and (min-width: 681px) and (max-width: 1024px) {
      width: 50%;
      /* styles for browsers larger than 960px; */
    }

    @media only screen and (min-width: 1025px) and (max-width: 1200px) {
      width: 60%;
      /* styles for browsers larger than 960px; */
    }

    @media only screen and (min-width: 1201px) and (max-width: 1400px) {
      width: 65%;
      /* styles for browsers larger than 960px; */
    }

    @media only screen and (min-width: 1401px) {
      width: 70%;
      /* styles for browsers larger than 960px; */
    }
  }
}
</style>
