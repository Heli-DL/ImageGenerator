import React, { useState } from 'react';
import {auth} from "../firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import flowers from './Assets/flowers.png';

function Login() {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Login was successful " + user.email);
      navigator("/")
    } catch (error) {
      alert("Login failed")
    }
  }

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{borderRadius: '1rem', backgroundColor: '#1f3540'}}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={flowers}
                    alt="login form" className="img-fluid h-100" style={{borderRadius: '1rem 0 0 1rem'}} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-white">
                    <form>
                      <h2 className="mb-3 pb-3" style={{letterSpacing: '1px', color: '#CE5A67'}}>Sign in</h2>
                      <div className="form-outline mb-4">
                        <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} style={{backgroundColor: '#F2E6D2'}}/>
                        <label className="form-label" htmlFor="form2Example17">Email address</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="form2Example27" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} style={{backgroundColor: '#F2E6D2'}}/>
                        <label className="form-label" htmlFor="form2Example27">Password</label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button onClick={handleLogin} className="btn btn-lg btn-block" style={{backgroundColor: '#CE5A67', color: 'white'}} type="button">Login</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}  

export default Login;