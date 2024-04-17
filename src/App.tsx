import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import listen from './redux/listener';
import { router } from './route';
import storeRedux from './redux/store';

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
