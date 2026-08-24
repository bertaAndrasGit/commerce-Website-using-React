import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

export default function Auth(){

  const [mode,setMode] = useState("signup");
  const [error, setError] = useState(null);


  const {register, handleSubmit, formState: {errors},} = useForm();
  const { signUp, user, logout, login } = useContext(AuthContext); 
  const navigate = useNavigate();


  function onSubmit(data){
    setError(null);

    let result;

    if (mode === "signup"){
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    //console.log(result);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }

  }

  return(<div className="page">
    <div className="container">
      <div className="auth-container">
        {user && <p>User logged in as {user.email}</p>}
        <button onClick={logout}>Logout</button>
        <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>
        
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input className="form-input" type="email" id="email" 
            {...register('email', 
            {
              required: "Email is required"
            })}/>
            {errors.email && <span className="form-error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-input" type="password" id="password" 
            {...register('password', 
              {
                required: "Password is required",
                minLength: {
                  value: 14,
                  message: "Password must be at least 14 characters."
                },
                maxLength: {
                  value: 30,
                  message: "Password must be at most 30 characters."
                },
              })}/>
            {errors.password && <span className="form-error">{errors.password.message}</span>}
          </div>


          <button type="submit" className="btn btn-primary btn-large">{mode === "signup" ? "Sign Up" : "Login"}</button>
        </form>

        <div className="auth-switch">
          {mode === "signup" ? 
          (<p>Already have an account? <span onClick={() => setMode("login")} className="auth-link">Login</span></p>) : 
          (<p>Don't have an account? <span onClick={() => setMode("signup")} className="auth-link">Sign Up</span></p>)}
        </div>
      </div>
    </div>
  </div>);
}