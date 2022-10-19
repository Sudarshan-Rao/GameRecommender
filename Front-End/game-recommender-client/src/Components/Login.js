import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import {AuthContext} from '../Context/AuthContext';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLogin, setIsLogin] = useState(true);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

        if (storedUserLoggedInInformation === '1') {
            setIsLogin(true);
        }
    }, []);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        // optional: Add validation

        if (isLogin) {
            fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.json().then((data) => {
                            // show an error modal
                            let errorMessage = 'Authentication failed!';
                            if (data && data.error && data.error.message) {
                                errorMessage = data.error.message;
                            }
                            throw new Error(errorMessage);
                        });
                    }
                })
                .then((data) => {
                    authCtx.login(data.token);
                    localStorage.setItem('isLoggedIn', '1');
                })
                .catch((err) => {
                    alert(err.message);
                });
        } else {
            fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.json().then((data) => {
                            // show an error modal
                            let errorMessage = 'Authentication failed!';
                            if (data && data.error && data.error.message) {
                                errorMessage = data.error.message;
                            }
                            throw new Error(errorMessage);
                        });
                    }
                })
                .then((data) => {
                    authCtx.login(data.token);
                    localStorage.setItem('isLoggedIn', '1');
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    };
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">{isLogin ? 'Login' : 'Sign Up'}</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        ref={emailRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        ref={passwordRef}
                                    />
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Remember me
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    {isLogin ? 'Login' : 'Create Account'}
                                </button>
                            </form>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-link" onClick={switchAuthModeHandler}>
                                {isLogin ? 'Create new account' : 'Login with existing account'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
