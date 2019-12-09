import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);


const API_ROOT = 'http://localhost:3001/api';

const responseBody = res => res.body;

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTdiNjZkOGFkNzY4MWNhMTJmZDcyNiIsImV4cCI6MTU4MDgxNTc0OSwiaWF0IjoxNTc1NjMxNzQ5fQ.CBAkZis2qdjDP4R9Dnwe9N1xwCHJHSG0tYypjfbV5d8';
const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `Token ${token}`);
  }
}

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),

  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Report = {
  all: page =>
    requests
    .get(`/report?faction=3&round=60&projection=full`)
};

const Auth = {
  current: () =>
    requests.get('/faction'),
  login: (number, password) =>
    requests.post('/factions/login', { faction: { number, password } })
};


export default {
  Auth,
  Report,
  setToken: _token => { token = _token; }
};
