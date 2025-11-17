import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../api/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            🌍 Journey Jar
          </Link>
          
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <Link to="/preferences" className="hover:underline">
                  Find Trips
                </Link>
                <Link to="/saved-trips" className="hover:underline">
                  Saved Trips
                </Link>
                <span className="text-sm">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
