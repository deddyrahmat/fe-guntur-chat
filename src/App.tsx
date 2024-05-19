import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import listen from './redux/listener';
import { router } from './route';
import storeRedux from './redux/store';
// import { setAuthToken } from './config/Axios';

// const auth = localStorage.getItem('auth');
// if (auth) {
//   const { token } = JSON.parse(auth);
//   setAuthToken(token);
// }
function App() {
  useEffect(() => {
    listen();
  }, []);

  return (
    <Provider store={storeRedux}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
