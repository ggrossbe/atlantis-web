const defaultState = {
  appName: 'Atlantis',
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'APP_LOAD':
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.faction : null
      };
    case 'REDIRECT':
      return { ...state, redirectTo: null };
    case 'LOGOUT':
      return { ...state, redirectTo: '/', token: null, currentUser: null };
    case 'SETTINGS_SAVED':
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.faction
      };
    case 'LOGIN':
      console.log('token = ' + action.payload.faction.token);
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.faction.token,
        currentUser: action.error ? null : action.payload.faction
      };
  }
  return state;
};
