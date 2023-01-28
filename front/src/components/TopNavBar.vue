<!-- eslint-disable prettier/prettier -->
<template>
  <div class="top-bar">
    <v-app-bar color="white" dense dark elevation="4" flat outlined rounded shaped>
      <v-row :justify="'space-between'">
        <v-col cols="4" xs="3" sm="4" md="4" lg="4" xl="4" style="align-self: center">
          <v-img max-height="50" max-width="150" src="@/assets/logo-aviv.svg"></v-img>
        </v-col>
        <v-col cols="8" sm="8" md="4" lg="4" xl="4">
          <template>
            <div class="text-end">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-row no-gutters :justify="'end'">
                    <v-col cols="4" lg="4" md="4" sm="3" xl="2">
                      <v-btn small tile color="#5009DC" class="message-button">
                        <v-icon left> mdi-email-outline </v-icon>
                        {{ messagesCount }}
                      </v-btn>
                    </v-col>
                    <v-col cols="8" lg="4" md="5" sm="4" xl="3">
                      <v-btn color="white" dark v-bind="attrs" v-on="on" small class="agent-button">
                        <span id="selectedAgence" style="margin-right: 1rem">{{ selectedAgenceName ? selectedAgenceName : "Agence" }}</span>

                        <div class="agent-button-content">
                          <v-icon style="font-size: 16px; margin-right: -1rem; margin-top: 0.1rem" large color="white darken-2"> mdi-chevron-up </v-icon>
                          <v-icon style="font-size: 16px; margin-bottom: -1.2rem" large color="white darken-2"> mdi-chevron-down </v-icon>
                        </div>
                      </v-btn>
                    </v-col>
                  </v-row>
                </template>
                <v-list>
                  <v-list-item-group v-model="selectedAgence" active-class="border" color="indigo">
                    <v-list-item v-for="(agence, index) in agences" :key="index">
                      <v-list-item-content>
                        <v-list-item-title :id="'agence' + index" @click="onAgenceChange(agence)" v-text="agence.name"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </div>
          </template>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "top-bar",

  data: function () {
    return {
      allAgence: this.agences,
      selectedAgence: this.selected_agence,
    };
  },
  props: {
    agences: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
    selectedAgenceName: {
      required: true,
      type: String,
      default() {
        return "";
      },
    },
    messagesCount: {
      required: true,
      type: Number,
      default() {
        return 0;
      },
    },
    onAgenceChange: {
      required: true,
      type: Function,
      default() {
        return null;
      },
    },
  },
};
</script>

<style lang="scss">
.top-bar {
  .nav-title {
    color: black;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: -5rem;
  }

  .nav-title-icon {
    color: #5009dc;
    font-weight: bold;
    font-size: 3rem;
    margin-left: 7rem;
    margin-top: 0.9rem;
  }

  .message-button {
    margin-right: 1rem;
    border-radius: 5px;
  }

  .agent-button {
    color: black;
  }

  .tile:hover {
    background: green;
  }

  .agent-button-content {
    background-color: #63b0fa;
    margin-right: -0.76rem;
    border-radius: 4px;
    height: 1.75rem;
  }
}
</style>
