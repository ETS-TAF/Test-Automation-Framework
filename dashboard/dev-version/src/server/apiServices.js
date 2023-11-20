import api from "./api";
import HeaderConfig from "./headerConfig";

// API Requests
class ApiServices {

    getTestCategory() {
        //No Content
        return api.get('testcategory')
            .then((res) => {
                return res.data
            })
    }

    getTests() {
        //No Content
        return api.get('tests')
            .then((res) => {
                return res.data
            })
    }

}

export default new ApiServices();