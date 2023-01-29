/* eslint-disable prettier/prettier */
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

let baseURL = "http://localhost:8080/";

class MessagesController {
    constructor() {}
    
    getAllMessages = async (realtorId,page,page_size,sort) => {
        try {
            let url = baseURL + "realtors/"+realtorId+"/messages"
            if(page > 0){
                url = baseURL + "realtors/"+realtorId+"/messages?page="+page;
            }
            if(page > 0 && page_size > 0){
                url = baseURL + "realtors/"+realtorId+"/messages?page="+ page +"&page_size=" + page_size;
            }
            if(page > 0 && page_size > 0 && sort !== undefined && sort !== null) {
                if(sort === "date:desc" || sort === "date:asc"){
                    url = baseURL + "realtors/"+realtorId+"/messages?page="+ page +"&page_size=" + page_size + "&sort=" + sort;
                }
            }
            let response = await Vue.axios.get(url);
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
    makeMessageRead = async (realtorId, messageId, payload) => {
        try {
            let url = baseURL + "realtors/" + realtorId + "/messages/" + messageId;
            let response = await axios.patch(url, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };


}

export default new MessagesController;
