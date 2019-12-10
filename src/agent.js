import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);


const API_ROOT = 'http://localhost:3001/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `Token ${token}`);
  }
}

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Report = {
  all: page =>
    requests
    .get(`/report?faction=3&round=60&projection=full`)
};

const Auth = {
  current: () =>
    requests.get('/faction'),
  save: faction =>
    requests.put('/faction', { faction }),
  login: (number, password) =>
    requests.post('/factions/login', { faction: { number, password } })
};


export default {
  Auth,
  Report,
  setToken: _token => { console.log('setToken called = ' + _token);
token = _token; }
};
