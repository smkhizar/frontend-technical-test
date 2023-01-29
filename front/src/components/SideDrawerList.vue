<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable prettier/prettier -->
<template>
    <div fill-height class="drawer-container" id="drawer-container" style="float: left; margin-top: 0.9rem">
      <v-card elevation="3" outlined shaped tile>
        <v-layout row wrap style="box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important">
          <v-flex v-for="(message, index) in messages" :key="index">
            <v-card flat hover class="white" @click="handleMessageDetails(message)">
              <v-layout>
                <v-flex xs11 :id="'message' + index">
                  <v-list-item two-line v-if="messages.length !== 0">
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
        <v-card v-intersect="continousScrolling"></v-card>
      </v-card>
    </div>
</template>
<script>
import moment from "moment";
export default {
  name: "side-drawer",
  data() {
    return {
      moment: moment,
      readMessageColor: "grey",
      titles: [],
      page: 1,
    };
  },
  props: {
    messages: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
    handleMessageDetails: {
      required: true,
      type: Function,
    },
    continousScrolling: {
      required: true,
      type: Function,
    },
  },
  methods: {
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
  },
};
</script>
<style lang="scss">
#drawer-container {
  @media only screen and (min-width: 250px) and (max-width: 680px) {
    width: 100%;
  }

  @media only screen and (min-width: 681px) and (max-width: 1024px) {
    width: 50%;
  }

  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    width: 40%;
  }

  @media only screen and (min-width: 1201px) and (max-width: 1400px) {
    width: 35%;
  }

  @media only screen and (min-width: 1401px) {
    width: 30%;
  }
}
</style>
