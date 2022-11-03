import { useState } from "react";
import React from "react";

function App() {
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/login", {
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

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      window.location.href = "/chat";
    } else {
      alert("Please check your phone number and password");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default App;
