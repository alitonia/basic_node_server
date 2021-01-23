import React, {} from 'react';
import {Router} from '@reach/router';
import {FooterComponent} from './api_manual/component/Footer';
import {HeaderComponent} from './api_manual/component/Header';

import {HomePage} from './api_manual/component/Home';
import {SidebarComponent} from './api_manual/component/Sidebar';

function App() {
  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: '100%'
      }}>
        <HeaderComponent/>
        <div style={{
          display: 'flex',
          flex: 1
        }}>
          <SidebarComponent/>
          <Router>
            <HomePage path={'/'}/>
          </Router>
        </div>
        <FooterComponent/>
      </div>
  );
}

export default App;
