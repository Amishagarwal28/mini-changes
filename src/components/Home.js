import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPolicies = async () => {
        try {
          const response = await fetch('http://localhost:8882/policies/loadPolicies');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setPolicies(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPolicies();
    }, []);

  return (
    <div>
      <div style={topBarStyle}>
        <h1 style={{ margin: 0, color: 'white' }}>Insurance Management System</h1>
      </div>

      <div style={welcomeContainerStyle}>
        <h3 style={helloCustomerStyle}>Hello, Customer</h3>
        <h3 style={welcomeTextStyle}>Welcome to the Insurance Management System</h3>
        <hr style={horizontalLineStyle} />

        <div style={buttonContainerStyle}>
          <Link to="/login">
            <button style={buttonStyle}>Login</button>
          </Link>
          <Link to="/register">
            <button style={buttonStyle}>Register</button>
          </Link>
        </div>
      </div>

      <div>
      <h1>All Policies</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {policies.map((policy) => (
          <li key={policy.policy_id}>
            <h3>{policy.policy_name}</h3>
            <p>{policy.policy_description}</p>
            <p>Standard Premium: ${policy.standardPremium}</p>
            <p>Coverage Amount: {policy.coverageAmount} years</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>

    </div>
  );
}

const topBarStyle = {
  backgroundColor: 'black',
  padding: '10px',
  textAlign: 'center',
};

const welcomeContainerStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

const helloCustomerStyle = {
  fontSize: '5em',
};

const welcomeTextStyle = {
  fontSize: '2.3em',  
  margin: '10px 0', 
};

const horizontalLineStyle = {
  border: 'none',
  borderTop: '1px solid #ccc',
  margin: '20px 0',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const buttonStyle = {
  fontSize: '1.5em', 
  margin: '0 15px', 
};

export default Home;