<!-- eslint-disable no-unused-vars -->
<template>
  <div class="message-details">
    <div fill-height style="float: left" id="message-details" v-if="messageSelected">
      <v-container>
        <v-card elevation="0" shaped tile>
          <v-list-item two-line>
            <v-list-item-content id="message-details-container">
              <v-row justify="start" style="margin-top: -1rem">
                <v-col cols="4" md="2" sm="3" lg="2" l="2" style="max-width: 3.6rem">
                  <v-icon color="#5009dc">mdi-email</v-icon>
                </v-col>
                <v-col cols="8">
                  <v-list-item-subtitle id="message-name" class="message-name" v-if="messageSelected.contact">{{ messageSelected.contact.firstname + " " + messageSelected.contact.lastname }}</v-list-item-subtitle>
                  <v-row justify="space-around" style="margin-top: 1rem">
                    <v-col class="d-flex" cols="4" xs="3">
                      <v-list-item-subtitle>{{ "Email" }}</v-list-item-subtitle>
                    </v-col>
                    <v-col class="d-flex" cols="8">
                      <v-list-item-subtitle id="message-email" class="message-email">{{ messageSelected?.contact?.email }}</v-list-item-subtitle>
                    </v-col>
                  </v-row>
                  <v-row justify="space-around" style="margin-top: -1rem">
                    <v-col class="d-flex" cols="4">
                      <v-list-item-subtitle>{{ "Phone" }}</v-list-item-subtitle>
                    </v-col>
                    <v-col class="d-flex" cols="8">
                      <v-list-item-subtitle id="message-phone" class="message-phone">{{
                        messageSelected?.contact?.phone
                          .split(/(\d{2})/)
                          .join(" ")
                          .trim()
                      }}</v-list-item-subtitle>
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
        <v-card style="message-body-container" elevation="0" shaped tile>
          <div style="text-align: justify">
            <v-card-title id="message-body-name" class="message-body-name">{{ messageSelected.contact?.firstname + " " + messageSelected.contact?.lastname }}</v-card-title>
            <v-card-subtitle id="message-body-date" class="message-body-date">{{ moment(messageSelected.date).format("DD MMMM YYYY") + " at " + moment(messageSelected.date).format("HH:mm") }}</v-card-subtitle>
            <v-card-subtitle id="message-body" class="message-body">{{ messageSelected.body }}</v-card-subtitle>
          </div>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import MessagesController from "../controllers/MessagesController";
import moment from "moment";
import lodash from "lodash";

export default {
  name: "message-details",
  data: () => ({
    MessagesController: MessagesController,
    moment: moment,
    lodash: lodash,
  }),
  props: {
    messageSelected: {
      required: true,
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {},
  async created() {},
};
</script>
<style lang="scss">
#message-details {
  .message-body-container {
    height: auto;
    min-height: 100vh;
  }
  .message-body {
    color: black;
    justify-content: left;
    margin-left: 3.5rem;
  }
  .message-body-date {
    justify-content: left;
    margin-left: 3.5rem;
  }
  .message-body-name {
    color: black;
    font-weight: bold;
    justify-content: left;
    margin-left: 3.5rem;
  }
  .message-name {
    font-size: 20px;
    font-weight: bold;
    color: black;
    white-space: pre-wrap;
  }
  .message-email {
    font-weight: bold;
    color: #5009dc;
    white-space: pre-wrap;
  }
  .message-phone {
    font-weight: bold;
    color: #5009dc;
    white-space: pre-wrap;
  }
  @media only screen and (min-width: 250px) and (max-width: 680px) {
  }

  @media only screen and (min-width: 681px) and (max-width: 1024px) {
    width: 50%;
  }

  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    width: 60%;
  }

  @media only screen and (min-width: 1201px) and (max-width: 1400px) {
    width: 65%;
  }

  @media only screen and (min-width: 1401px) {
    width: 70%;
  }
}
</style>
