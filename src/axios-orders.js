import axios from 'axios';

const instance = axios.create({
  //add firebcase datbase url below
  baseURL:'https://xxxxxxx.firebaseio.com/'
});

export default instance;