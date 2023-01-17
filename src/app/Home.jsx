import React from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutSite } from '/src/components/layouts';
import Sidebar from '/src/components/Sidebar';

export function Home() {
  return (
    <LayoutSite>
      <header className='site--header'>
      </header>
      <Sidebar/>
      <main className='site--main'>
        <Outlet/>
      </main>
    </LayoutSite>
  );
}
