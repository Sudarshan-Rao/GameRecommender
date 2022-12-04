import { useRef, useState, useEffect } from 'react';
import axiosInstance from '../Api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserIcon } from '@heroicons/react/20/solid';
import useAuth from '../CustomHooks/useAuth';

const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [userEmail, setUserEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [userName, setUserName] = useState('');
  const [nameFocus, setNameFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [success, setSuccess] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(userEmail));
  }, [userEmail]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [userEmail, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(userEmail);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axiosInstance.post(
        REGISTER_URL,
        JSON.stringify({
          email: userEmail,
          name: userName,
          password: pwd,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));

      setAuth({
        user: userEmail,
        accessToken: response?.data?.accessToken,
      });
      localStorage.setItem(
        'auth',
        JSON.stringify({
          user: userEmail,
          accessToken: response?.data?.accessToken,
        })
      );
      setUserEmail('');
      setUserName('');
      setPwd('');
      setMatchPwd('');
      setSuccess(true);
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg(
          `Registration Failed: ${err.response?.data?.message}`
        );
      }
      errRef.current.focus();
    }
  };

  // Register Component
  return (
    <>
      {success ? (
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-gray-800">
              Registration Successful
            </h1>
            <button
              className="px-4 py-2 mt-4 text-white bg-yellow-500 rounded hover:bg-yellow-600"
              onClick={() => navigate('/login')}
              data-testid="login-button-successful-register"
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Register
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm ${userFocus ? 'focus:border-blue-500' : ''
                      }`}
                    placeholder="Email address"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    ref={userRef}
                    data-testid="email-input"
                  />
                </div>
                <div className="text-red-500 text-sm">{errMsg}</div>
                <p
                  id="uidnote"
                  className={
                    userFocus && userEmail && !validEmail
                      ? 'text-red-500 text-sm'
                      : 'hidden'
                  }
                >
                  Must be a valid email address
                </p>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm ${nameFocus ? 'focus:border-blue-500' : ''
                      }`}
                    placeholder="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    data-testid="name-input"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm ${pwdFocus ? 'focus:border-blue-500' : ''
                      }`}
                    placeholder="Password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    data-testid="password-input"
                  />
                </div>
                <p
                  id="pwdnote"
                  data-testid="pwdnote"
                  className={
                    pwdFocus && pwd && !validPwd
                      ? 'text-red-500 text-sm'
                      : 'hidden'
                  }
                >
                  Must be at least 8 characters, contain at least one
                  number, one uppercase letter, and one lowercase
                  letter
                </p>
                <div>
                  <label htmlFor="match" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="match"
                    name="match"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm ${matchFocus ? 'focus:border-blue-500' : ''
                      }`}
                    placeholder="Confirm Password"
                    value={matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    data-testid="match-input"
                  />
                </div>
                <p
                  id="matchnote"
                  className={
                    matchFocus && matchPwd && !validMatch
                      ? 'text-red-500 text-sm'
                      : 'hidden'
                  }
                >
                  Passwords must match
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${validEmail && validPwd && validMatch
                    ? ''
                    : 'opacity-50 cursor-not-allowed'
                    }`}
                  disabled={!(validEmail && validPwd && validMatch)}
                  data-testid="register-button"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <UserIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
                      aria-hidden="true"
                    />
                  </span>
                  Register
                </button>
              </div>
              <div className="text-red-500 text-center">{errMsg}</div>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    onClick={() => navigate('/login')}
                    data-testid="login-button-register"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
                        aria-hidden="true"
                      />
                    </span>
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
