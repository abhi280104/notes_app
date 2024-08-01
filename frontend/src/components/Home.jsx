/* eslint-disable no-unused-vars */
import { Navigate } from 'react-router-dom';
import Notes from './Notes';

const Home = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login page if no token is present
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Notes />
    </div>
  );
};

export default Home;


