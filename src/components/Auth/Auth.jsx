"use client";

import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

function Auth() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <UserProfile /> : <LoginForm />;
}

export default Auth;
