<!-- eslint-disable prettier/prettier -->
<template>
  <div class="top-bar">
    <v-app-bar color="white" dense dark elevation="4" flat outlined rounded shaped>
      <v-toolbar-title class="nav-title">aviv group </v-toolbar-title>
      <p class="nav-title-icon">_</p>

      <v-spacer></v-spacer>

      <template>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn small tile color="#5009DC" class="message-button">
                <v-icon left> mdi-email-outline </v-icon>
                {{ 3}}
              </v-btn>
              <v-btn color="white" dark v-bind="attrs" v-on="on" small class="agent-button">
                <span v-if="selectedRealtor.length === 0" style="margin-right: 1rem">{{ 'Agence' }}</span>
                <span v-else style="margin-right: 1rem">{{ 'Agence' }}</span>

                <div class="agent-button-content">
                  <v-icon style=" font-size: 16px;margin-right: -1rem;margin-top: 0.1rem;" large color="white darken-2">
                    mdi-chevron-up
                  </v-icon>
                  <v-icon style="font-size: 16px; margin-bottom: -1.2rem" large color="white darken-2">
                    mdi-chevron-down
                  </v-icon>
                </div>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(realtor, index) in realtors" :key="index">
                <v-list-item-title>{{ realtor.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "top-bar",

  data: () => ({}),
  props: {
    realtors: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
    selectedRealtor: {
      required: true,
      type: Object,
      default() {
        return {};
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
  }

  .nav-title-icon {
    color: #5009dc;
    font-weight: bold;
    font-size: 3rem;
    margin-left: 5px;
  }

  .message-button {
    margin-right: 1rem;
    border-radius: 5px;
  }

  .agent-button {
    color: black;
  }

  .agent-button-content {
    background-color: #63b0fa;
    margin-right: -0.76rem;
    border-radius: 4px;
    height: 1.75rem;
  }
}
</style>
