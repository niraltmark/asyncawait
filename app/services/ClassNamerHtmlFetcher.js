const axios = require('axios');

class ClassNamerHtmlFetcher {
    constructor() {
        console.log('niro')
    }
    
    async fetch() {
        const url = "https://www.classnamer.org/";
        
        try {
            const response = await axios.get(url);
            
            const data = response.data;
            
            return data;
        } catch (error) {
            console.log(error);
        }
        
        return null
    }
}

module.exports = ClassNamerHtmlFetcher;