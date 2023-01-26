<template>
  <div class="home-view">
    <TopNavBar :agences="agence" :messagesCount="unreadMessagesCount" :selectedAgenceName="agenceNameSelected" :onAgenceChange="onAgenceSwitch" />
    <v-flex>
      <div fill-height class="drawer-container" id="drawer-container" style="float: left; margin-top: 0.9rem">
        <v-card elevation="3" outlined shaped tile>
          <v-layout row wrap style="box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important">
            <v-flex v-for="(message, index) in allMessages" :key="index">
              <v-card flat hover class="white pb-2 mb-1 pl-2">
                <v-layout>
                  <v-flex xs11>
                    <v-list-item two-line v-if="allMessages.length !== 0">
                      <v-list-item-avatar style="margin-top: -1rem">
                        <v-icon v-if="message.type === 'sms'" :style="message.read === false ? 'color: #5009dc' : 'grey'">{{ message.read === false ? "mdi-message-alert" : "mdi-message" }}</v-icon>
                        <v-icon v-else-if="message.type === 'phone'" :style="message.read === false ? 'color: #5009dc' : 'grey'">{{ message.read === false ? "mdi-phone-settings" : "mdi-phone" }}</v-icon>
                        <v-icon v-else :style="message.read === false ? 'color: #5009dc' : 'grey'">{{ message.read === false ? "mdi-email-open" : "mdi-email" }}</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-row>
                          <v-col cols="mx-auto">
                            <v-list-item-title :style="message.read === false ? 'color: black;font-weight: bold;' : 'grey'">{{ getName(message) }}</v-list-item-title>
                          </v-col>
                          <v-col cols="mx-auto">
                            <v-list-item-subtitle :style="message.read === false ? 'text-align: end;color: #5009dc' : 'text-align: end;color: grey'">{{ getDateTime(message.date) }} </v-list-item-subtitle>
                          </v-col>
                        </v-row>
                        <v-list-item-subtitle :style="message.read === false ? 'color: black' : 'grey'">{{ getSubject(message) }}</v-list-item-subtitle>
                        <v-list-item-subtitle>Logged In</v-list-item-subtitle>
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
      <div fill-height style="float: left" id="message-details">
        <v-container>
          <v-card elevation="0" shaped tile>
            <v-card-content>
              <v-list-item two-line v-if="allMessages.length !== 0">
                <v-list-item-content>
                  <v-row justify="start" style="margin-top: -1rem">
                    <v-col cols="4" md="2" sm="3" lg="2" l="2" style="max-width: 3.6rem">
                      <v-icon color="#5009dc">mdi-email</v-icon>
                    </v-col>
                    <v-col cols="8">
                      <v-list-item-subtitle id="name" style="font-size: 20px; font-weight: bold; color: black; white-space: pre-wrap">{{ "NAME" }}</v-list-item-subtitle>
                      <v-row justify="space-around" style="margin-top: 1rem">
                        <v-col class="d-flex" cols="4" xs="3">
                          <v-list-item-subtitle>{{ "Email" }}</v-list-item-subtitle>
                        </v-col>
                        <v-col class="d-flex" cols="8">
                          <v-list-item-subtitle style="font-weight: bold; color: #5009dc; white-space: pre-wrap">{{ "smkhizar.alam@gmail.com" }}</v-list-item-subtitle>
                        </v-col>
                      </v-row>
                      <v-row justify="space-around" style="margin-top: -1rem">
                        <v-col class="d-flex" cols="4">
                          <v-list-item-subtitle>{{ "Phone" }}</v-list-item-subtitle>
                        </v-col>
                        <v-col class="d-flex" cols="8">
                          <v-list-item-subtitle style="font-weight: bold; color: #5009dc; white-space: pre-wrap">{{ "01 15 12 84 69" }}</v-list-item-subtitle>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </v-card-content>
          </v-card>
        </v-container>

        <v-container>
          <v-card style="height: auto; min-height: 100vh" elevation="0" shaped tile>
            <v-card-content style="text-align: justify">
              <v-card-title style="color: black; font-weight: bold; justify-content: left; margin-left: 3.5rem">Name</v-card-title>
              <v-card-subtitle style="justify-content: left; margin-left: 3.5rem">25-01-2022 15:05</v-card-subtitle>
              <v-card-subtitle style="color: black; justify-content: left; margin-left: 3.5rem"
                >Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality,
                though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors
                116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence
                long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest
                of the paragraph.</v-card-subtitle
              >
            </v-card-content>
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

export default {
  name: "home-view",
  data: () => ({
    RealtorController: RealtorController,
    MessagesController: MessagesController,
    agence: [],
    agenceNameSelected: "",
    unreadMessagesCount: 0,
    allMessages: [],
    messageId: 0,
    moment: moment,
    readMessageColor: "grey",
    titles: [],
    page: 1,
  }),
  components: {
    TopNavBar,
  },
  methods: {
    getDateTime(datetime) {
      return moment(datetime).format("hh:mm");
    },
    getName(message) {
      let firstName = message.contact.firstname;
      let lastName = message.contact.lastname;
      let type = message.type;
      console.log(message.type);
      switch (type) {
        case "email":
          if (firstName !== "" && lastName !== "") {
            return firstName + " " + lastName;
          } else {
            return message.contact.email;
          }
        case "phone":
          if (firstName !== "" && lastName !== "") {
            return (
              firstName +
              " " +
              lastName +
              " (" +
              message.contact.phone
                .split(/(\d{2})/)
                .join(" ")
                .trim() +
              ")"
            );
          } else {
            return (
              message.contact.phone
                .split(/(\d{2})/)
                .join(" ")
                .trim() + ")"
            );
          }
        case "sms":
          if (firstName !== "" && lastName !== "") {
            return (
              firstName +
              " " +
              lastName +
              " (" +
              message.contact.phone
                .split(/(\d{2})/)
                .join(" ")
                .trim() +
              ")"
            );
          } else {
            return message.contact.email;
          }
        default:
          break;
      }
    },
    getSubject(message) {
      return message.subject;
    },
    onAgenceSwitch(item) {
      this.allMessages = [];
      this.page = 1;
      this.agenceNameSelected = item.name;
      this.unreadMessagesCount = item.unread_messages;
      this.messageId = item.id;
      this.fetchMessages();
    },
    // getMessagesByAgence(id) {
    //   this.messageId = id;
    //   MessagesController.getAllMessages(id)
    //     .then((response) => {
    //       console.log(response);
    //       this.allMessages = response;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    async fetchMessages() {
      MessagesController.getAllMessages(this.messageId, this.query)
        .then((response) => {
          this.allMessages = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    infiniteScrolling(entries, observer, isIntersecting) {
      setTimeout(() => {
        this.page++;
        MessagesController.getAllMessages(this.messageId, this.query)
          .then((response) => {
            if (response.length > 1) {
              response.forEach((message) => this.allMessages.push(message));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      //let width = window.innerWidth;
      //console.log(width);
      // if (width > 400) {
      //   document.getElementById("drawer-container").style.width = "40%";
      // } else {
      //   document.getElementById("drawer-container").style.width = "100%";
      // }
    });
  },
  async created() {
    // this.fetchMessages();
    RealtorController.getRealtors()
      .then((response) => {
        this.agence = response;
        this.onAgenceSwitch(response[0]);
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
      display: none;
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
