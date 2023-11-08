import axion from 'axios'
export const api = axion.create({
    baseURL: 'https://api.clarifai.com',
    headers:{
        "Authorization":"key "+process.env.EXPO_PUBLIC_API_KEY
    }

})