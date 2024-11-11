// AppLayout.js

import React, { useEffect, useState } from "react";
import { useToken } from "../../components/elements/TokenContext";

const AppLayout = () => {
  const { token } = useToken();
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (token) {
      // Fetch the user's emails
      fetch("http://localhost:8000/api/get-user-emails/?k=10", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.emails) {
            setEmails(data.emails);
          } else {
            console.error("Error fetching emails:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error fetching emails:", error);
        });
    }
  }, [token]);

  return (
    <div>
      <h1>Your Emails</h1>
      {emails.map((email) => (
        <div key={email.id}>
          <h2>{email.subject}</h2>
          <p>From: {email.from}</p>
          <p>{email.snippet}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AppLayout;
