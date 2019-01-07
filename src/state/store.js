import { createStore, compose, applyMiddleware } from 'redux'
import reducer from '../reducers/reducer'
import createSagaMiddleware from 'redux-saga'
import sagas from '../state/sagas'

export default (initialState) => {
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

  const store = createStore(
    reducer,
    initialState,
    enhancer
  )

  sagas.map(sagaMiddleware.run)

  return store
}
