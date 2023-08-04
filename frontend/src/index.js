import React, { Suspense } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store'
import App from './routes'
import 'dayjs/locale/th'
import 'antd/dist/antd.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom'
const { store , persistor } = configureStore()
const target = document.querySelector('#root')

render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/">
          <Suspense fallback={null}>
            <App/>
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
    target
)
