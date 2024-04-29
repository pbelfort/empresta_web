
import {baseURL} from '../env/config'

async function getDataFromApi(url){
    const urlPath = baseURL + url;

    const getArguments = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    return await fetch(urlPath, getArguments);
  }

async function simulate(body) {
    const urlPath = baseURL + 'simular';
    const postArguments = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body
        }
    var response = await fetch(urlPath, postArguments);
    var data = await response.json();
    return data;
}
  
export {getDataFromApi,simulate}