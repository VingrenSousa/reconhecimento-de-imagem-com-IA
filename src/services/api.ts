import axios from 'axios'
export const api = axios.create({
    baseURL: 'https://api.clarifai.com',
    method: 'POST',
    headers:{
         "Authorization":"Key "+process.env.EXPO_PUBLIC_API_KEY_ID
        
        
    }

})