class HeaderConfig {
    //use this config to send Simple Json data
    jsonConfig() {
        const headers = {
            'Content-Type': 'application/json',
        }
        return headers
    }
    //use this config to send media
    formDataConfig() {
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        return headers
    }
}


export default new HeaderConfig();