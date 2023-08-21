import React from 'react';
import Navbar from '../features/navbar/Navbar';
import Profile from '../features/auth/components/Profile';

const ProfilePage = () => {
  return (
    <Navbar>
      <Profile />
    </Navbar>
  );
};

export default ProfilePage;
