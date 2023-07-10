import { handleSignin, handleSignup } from "@/services/firebaseAuth";
import React, { useState } from "react";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={()=>handleSignup(email,password)}>Cadastrar</button>
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={()=>handleSignin(email,password)}>Login</button>
      </div>
    </>
  );
};
