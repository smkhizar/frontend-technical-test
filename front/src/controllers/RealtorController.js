/* eslint-disable prettier/prettier */
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

let baseURL = "http://localhost:8080/";

class RealtorController {
    constructor() {}
    
    getRealtors = async () => {
        try {
            const response = await Vue.axios.get(baseURL + "realtors");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    getRealtorById = async (id) => {
        try {
            const response = await Vue.axios.get(baseURL + "realtors/" + id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

}

export default new RealtorController;
