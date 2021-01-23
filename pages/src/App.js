import React, {} from 'react';
import {Router} from '@reach/router';
import {FooterComponent} from './component/Footer';
import {HeaderComponent} from './component/Header';

import {HomePage} from './component/Home';
import {SidebarComponent} from './component/Sidebar';

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
