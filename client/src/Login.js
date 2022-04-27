import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import { useState } from "react";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <br />
          <div
            style={{ display: "block", margin: "auto", width: "fit-content" }}
          >
            <p>
              Don't have an account? &nbsp;
              <button color="secondary" onClick={() => setShowLogin(false)}>
                Sign Up
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <br />
          <div
            style={{ display: "block", margin: "auto", width: "fit-content" }}
          >
            <p>
              Already have an account? &nbsp;
              <button color="secondary" onClick={() => setShowLogin(true)}>
                Log In
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;