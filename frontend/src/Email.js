// src/Emails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Emails = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const res = await axios.get('http://localhost:8000/api/emails/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmails(res.data.emails);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div>
      <h2>Your Emails</h2>
      <ul>
        {emails.map(email => (
          <li key={email.id}>{email.subject}</li>
        ))}
      </ul>
    </div>
  );
};

export default Emails;
