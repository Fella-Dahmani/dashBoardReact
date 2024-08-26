import React, { useContext, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

const Login: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if(!authContext){
    return null;
  }
  const {login} = authContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {      
       e.preventDefault();

       if (username === 'admin' && password === 'password') {     
                login();          
                navigate('/dashboard'); 
                }
                 else
                 {          
               alert('Identifiants incorrects');
             }
             };


 
  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          Se Connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
