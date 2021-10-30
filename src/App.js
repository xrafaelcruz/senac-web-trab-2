import React from 'react'
import AppBody from 'components/AppBody'
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const App = () => (
  <div className="container-fluid">
    <React.StrictMode>
      <AppBody />
    </React.StrictMode>
    
    <NotificationContainer />
  </div>
);

export default App;
