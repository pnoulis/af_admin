import * as React from 'react';
import { Outlet } from 'react-router-dom';
import {
  StyleLayoutSite,
  StyleLayoutMain,
} from '/src/components/layouts';
import {
  Sidebar,
  SiteWideHeader,
} from './site-wide';

function App() {
  return (
    <StyleLayoutSite>
      <SiteWideHeader/>
      <Sidebar/>
      <StyleLayoutMain>
        <Outlet/>
      </StyleLayoutMain>
    </StyleLayoutSite>
  );
}

export { App };
