import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [userData, setUserData] = useState({
    username: '',
    userId: '',
    role: 'Student',
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUserData={setUserData} />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              username={userData.username}
              userId={userData.userId}
              role={userData.role}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;