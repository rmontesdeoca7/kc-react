import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import FormField from '../common/FormField';
import { useAuth } from './context';
import { login } from './service';

import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleChangeemail = event => setEmail(event.target.value);
  const handleChangePassword = event => setPassword(event.target.value);
  const resetError = () => setError(null);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      resetError();
      setIsFetching(true);
      await login({ email, password });
      handleLogin();
      const to = location.state?.from?.pathname || '/';

      navigate(to, { replace: true });
    } catch (error) {
      setError(error);
      setIsFetching(false);
    }
  };

  const isButtonEnabled = useMemo(() => {
    return email && password && !isFetching;
  }, [email, password, isFetching]);

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Twitter</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="Email"
          className="loginForm-field"
          onChange={handleChangeemail}
          value={email}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          onChange={handleChangePassword}
          value={password}
        />
        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          disabled={!isButtonEnabled}
        >
          Log in
        </Button>

        {/* <input
          type="checkbox"
          onChange={event => {
            console.log(event.target.checked);
          }}
          // value={remember}
        />
        <input
          type="file"
          onChange={event => console.log(event.target.files)}
        />
        <select
          // value={fruit}
          onChange={event => console.log(event.target.value)}
        >
          <option value="orange">Orange</option>
          <option value="apple">Apple</option>
        </select> */}
      </form>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;