import React from 'react'

import './styles.css'
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const { currentUser, userData } = useAuth()
  return (
    <div>
      {currentUser && <Header isAdmin={userData?.isAdmin} />}
      <main className='main-container'>
          <Outlet />
      </main>
    </div>
  )
}

export default Layout;