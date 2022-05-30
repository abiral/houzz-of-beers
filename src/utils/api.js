import axios from 'axios';

const host = 'https://api.punkapi.com/v2';

export const CancelToken = axios.CancelToken;

export const authCancelSource = CancelToken.source();

const configuration = {
    baseURL: host,
    headers: {},
};

const api = axios.create(configuration);

/* export const authorize = (token, cb=null) => {
    api.get('/me', {
        headers: {Authorization: `Bearer ${token}`},
        cancelToken: authCancelSource.token,
    }).then( response => {
        if(cb !== null){
            cb(token, response.data);
        }
    }).catch(err => {
        console.log("Error: ", err);
        if(typeof err.response !== "undefined"){
            if(err.response.status !== 401){
               window.location.href = process.env.REACT_APP_WEB_HOST;   
            }
        }else{
            console.log(err);
        }
    });
}; */

export default api;