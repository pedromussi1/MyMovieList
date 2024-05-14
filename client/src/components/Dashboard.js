// Dashboard.js
import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Movie from './Movie';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getName = async () => {
    try {
      const response = await fetch('http://localhost:5001/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out successfully!');
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <Fragment>
      <div className="container dashboard-header bg-dark">
        
          <div className="row">
            <div className="col">
              <h1 className="text-light">Welcome {name}!</h1>
            </div>
            <div className="col text-right">
              <button className="btn btn-primary logout-btn" onClick={(e) => logout(e)}>
                Logout
              </button>
            </div>
          </div>
        </div>
      
      <div className="container">
        <div className="movies-section">
          <Movie />
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;