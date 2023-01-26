<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable prettier/prettier -->
<template>
  <!-- <v-card height="94vh" width="256">
    <v-navigation-drawer absolute permanent left>
      <template v-slot:prepend>     
        <div  v-for="(message, index) in messages" :key="index">
          <v-list-item two-line v-if="messages.length !== 0">
            <v-list-item-avatar style="margin-top: -1rem;">
              <v-icon v-if="message.type === 'sms'" :style="message.read === false ? 'color: #5009dc': 'grey' ">{{ message.read === false ? 'mdi-message-alert' : 'mdi-message' }}</v-icon>
              <v-icon v-else-if="message.type === 'phone'" :style="message.read === false ? 'color: #5009dc': 'grey'">{{ message.read === false ? 'mdi-phone-settings' : 'mdi-phone' }}</v-icon>
              <v-icon v-else :style="message.read === false ? 'color: #5009dc': 'grey'">{{ message.read === false ? 'mdi-email-open' : 'mdi-email' }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title :style="message.read === false ? 'color: black;font-weight: bold;': 'grey'">{{ getName(message) }}</v-list-item-title>
              <v-list-item-subtitle 
                  :style="message.read === false ? 'text-align: end; margin-top: -1.3rem;color: #5009dc' : 'text-align: end; margin-top: -1.3rem;color: grey'">{{ getDateTime(message.date) }}
              </v-list-item-subtitle>
              <v-list-item-subtitle :style="message.read === false ? 'color: black': 'grey'">{{ getSubject(message)}}</v-list-item-subtitle>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="index !== messages.length"></v-divider>
        </div>
        <v-list-item two-line v-if="messages.length === 0">
          <v-list-item-avatar>
            <v-icon style="color: #5009dc">mdi-email</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="message-title">No Messages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
    </v-navigation-drawer>
  </v-card> -->
  <v-flex>
    <v-container fluid grid-list-lg class="mt-5">
      <v-card flat>
        <v-layout row wrap>
          <v-flex v-for="(title, index) in titles" :key="index">
            <v-card flat hover class="white pb-2 mb-1 pl-2">
              <v-layout>
                <v-flex xs10>
                  <div class="py-2">{{ title.body }}</div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <!--Add here the vuetify directive -->
        <v-card v-intersect="infiniteScrolling"></v-card>
      </v-card>
    </v-container>
  </v-flex>
</template>
<script>
import moment from "moment";
import axios from "axios";
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
  },
  // methods: {
  //   getDateTime(datetime) {
  //     return moment(datetime).format("hh:mm");
  //   },
  //   getName(message) {
  //     return message.contact.firstname + " " + message.contact.lastname;
  //   },
  //   getSubject(message) {
  //     return message.subject;
  //   },
  // },
  computed: {
    url() {
      return "https://jsonplaceholder.typicode.com/posts?_page=" + this.page;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const response = await axios.get(this.url);
      this.titles = response.data;
    },
    // eslint-disable-next-line no-unused-vars
    infiniteScrolling(entries, observer, isIntersecting) {
      setTimeout(() => {
        this.page++;
        axios
          .get(this.url)
          .then((response) => {
            if (response.data.length > 1) {
              response.data.forEach((item) => this.titles.push(item));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },
  },
};
</script>
<style lang="scss"></style>
