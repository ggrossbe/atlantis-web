import agent from './agent';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });
    action.payload.then(
      res => {
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch(action);
      },
      error => {
        console.log('ERROR', error);
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}

const localStorageMiddleware = store => next => action => {
  console.log('localStorageMiddleware', action.type);
  if (action.type === 'REGISTER' || action.type === 'LOGIN') {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.faction.token);
      agent.setToken(action.payload.faction.token);
    }
  } else if (action.type === 'LOGOUT') {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
}

  next(action);
};

export {
  localStorageMiddleware,
  promiseMiddleware
};
