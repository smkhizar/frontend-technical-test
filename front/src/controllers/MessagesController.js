/* eslint-disable prettier/prettier */
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

let baseURL = "http://localhost:8080/";

class MessagesController {
    constructor() {}
    
    getAllMessages = async (realtorId,page) => {
        try {
            const response = await Vue.axios.get(baseURL + "realtors/"+realtorId+"/messages?page="+page+"&page_size=20&sort=date:desc");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    getMessageDetails = async (realtorId,messageId) => {
        try {
            const response = await Vue.axios.get(baseURL + "realtors/"+realtorId+"/messages/"+messageId);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

}

export default new MessagesController;
