import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import * as History from 'history'
import rootReducer from './modules'

export const history = History.createBrowserHistory()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tabs','headers'], // only navigation will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default () => {
  let store = createStore(connectRouter(history)(persistedReducer), initialState, composedEnhancers);
  let persistor = persistStore(store);
  return { store, persistor };
};