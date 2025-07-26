import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handler = async () => {
    console.log(username);
    console.log(email);
    console.log(password);
    try {
      let res = await axios.post("http://localhost:3000/api/v1/register", {
        username,
        email,
        password,
      });
      if (res.status == 200 || res.status == 201) {
        console.log("register is successfully");
      }
    } catch (error) {
      console.log("register is not succussfull : ", error);
    }
  };
  return (
    <div className="mt-30 w-60 bg-amber-100 text-center ml-150">
      <h2 className="bg-blue-600 text-2xl border-2 border-black w-50 ml-5">Register Page</h2>
      <input type="text" className="border-2 border-black rounded-lg p-2 mt-2" placeholder="username" onChange={(e) => setUsername(e.target.value)} /><br></br>
      <input type="text" className="border-2 border-black rounded-lg p-2 mt-2" placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br></br>
      <input type="text" className="border-2 border-black rounded-lg p-2 mt-2" placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br></br>
      <button className="text-2xl border-2 border-black bg-blue-600 mt-2 p-1.5 px-5 hover:bg-blue-700 text-white" onClick={handler}>Submit</button>
    </div>
  );
};

export default Register;
