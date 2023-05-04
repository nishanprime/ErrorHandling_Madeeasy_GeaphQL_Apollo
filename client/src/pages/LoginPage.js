import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { handleError, handleSuccess } from '../utils/response.handler';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMutaion, { data, loading, error: loginError }] = useMutation(gql`
    mutation Login($input: AuthInput!) {
      login(input: $input) {
        token
      }
    }
  `);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginMutaion({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      if (data?.login?.token) {
        // set token in local storage
        localStorage.setItem('ACCESS_TOKEN_KEY', data.login.token);
        handleSuccess("You've successfully logged in!");
        // navigate to home page
        window.location.href = '/';
        //
      } else {
        throw Error('Invalid credentials');
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button type="submit" className="button is-link">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
