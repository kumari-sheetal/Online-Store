import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // show an error message to the user
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8081/api/v1/auth/reset-password/${id}/${token}`,
        { password }
      );
      console.log(response.data);
      // show a success message to the user
    } catch (error) {
      console.log(error.response.data);
      // show an error message to the user
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
