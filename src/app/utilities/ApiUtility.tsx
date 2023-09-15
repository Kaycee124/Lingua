import axios from 'axios';

class ApiUtility {
    static getApiUrl() {
        return "http://localhost/ce-project/backend/";
    }

    static getApiUrlWithEndpoint(endpoint:string) {
        return this.getApiUrl() + endpoint;
    }

    async postData(endpoint:string, data:any) {
       try {
        const url = ApiUtility.getApiUrlWithEndpoint(endpoint);
        const response = await axios.post(url, data);
        return response;
       } catch (error) {
        return error;
       }
    }

    
}

export default ApiUtility;  