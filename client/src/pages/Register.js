import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();

  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phonenumber,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/login");
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          type="text"
          placeholder="Phone Number"
        />
        <br></br>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Password"
        />
        <br></br>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default App;
