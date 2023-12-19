import React from 'react';
import { auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigator = useNavigate();
  const location = useLocation();

  const logOut = async () => {
    await signOut(auth)
    navigator("/login")
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg"  style={{backgroundColor: '#1f3540'}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Image<span style={{color: '#CE5A67'}}>Generator</span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav  ms-auto">
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" href="/">Home</a>
            </li>
            {user && 
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === '/generate' ? 'active' : ''}`} href="/generate">Generate</a>
            </li>
            }
            {user? 
            <li className="nav-item">
              <a onClick={logOut} className="nav-link" href="/login"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
              </a>
            </li>
            :<li className="nav-item">  
              <a className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} href="/login">Login</a>         
            </li>
          } 
          </ul>
        </div>
      </div>
    </nav>
  )
}
