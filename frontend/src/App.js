import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import Boot from './redux/store/boot';
import Routes from './router';
import AppProvider from './AppProvider';
// import "@iso/assets/style.css";
import "@iso/assets/scss/App.scss";
import "@iso/assets/style.css";
const App = () => (
  <Provider store={store}>
    <AppProvider>
      <>
       
        <Routes />
      </>
    </AppProvider>
  </Provider>
);
Boot()
  .then(() => App())
  .catch((error) => console.error(error));

export default App;

  // window.onunload = function () {
  //   localStorage.clear();
  // };




