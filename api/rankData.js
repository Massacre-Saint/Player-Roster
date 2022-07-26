import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getRanks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/ranks.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleRank = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/ranks/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});
export default getRanks;
