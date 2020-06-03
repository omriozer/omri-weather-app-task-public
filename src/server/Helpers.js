import {
    toast
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export const readFromServer = (url, command) => {
    console.log("readFromServer " + command + " " + url)
    let headers = {
        Accept: "application/json, text/plain, /",
    };

    let params = {
        method: command,
        mode: "cors",
        cache: "no-cache",
        headers: headers,
    };

    return fetch(url, params)
        .then((response) => response.json()
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.log("Error fetching....");
                return null;
            })
        ).catch(error => {
            // console.log("error: ", error);
            toast('Error fetching data... it is possible that the apiKey has stoped working for know... try again tommorow')
            return null;
        });
}

export const forecastsUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";

export const currentConditionsUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
export const autoCompleteUrl = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
// export const apiKey = "fakeApiKeySoNoHttpRequest"; // fake
// export const apiKey = "HlLyYi0ytOjH6Uek19AG1aITGvJkjwrS"; // ozeromri
// export const apiKey = "12WyN3vOH7klShJuCnTOqn2hGN2eeYE4"; // omrikingks
// export const apiKey = "Bk04Ukvn79AyXLNs6KxmLy2TpGX8OggU"; // ozeromri159
//export const apiKey = "kySwmCAfnQwbJgLVkGGi6HIe1GjbBuQR"; // galgoldman4
export const apiKey = "wRh2Ij0zhSCpQmSS2CitFaVkTWNQKVk2"; // galgoldman4