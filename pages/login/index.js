import { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import {GoogleLogin} from 'react-google-login';

import Swal from 'sweetalert2'

import Router from 'next/router'
import Link from 'next/link'

import OnePageFooter from '../../components/OnePageFooter'

import UserContext from '../../UserContext'

export default function index() {
    return(
        <LoginForm/>
    )
}

const LoginForm = () => {
    const { setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [tokenId, setTokenId] = useState(null);

    function authenticate(e) {

        //prevent redirection via form submission
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, options)
        .then(res => res.json())
        .then(data => {
            if (typeof data.accessToken !== 'undefined') {
                localStorage.setItem('token', data.accessToken)
                retrieveUserDetails(data.accessToken)
            } else {
                if (data.error === 'does-not-exist') {
                    Swal.fire(
                        'Authentication Failed', //header
                        'User does not exist.', //message
                        'error' //status
                    )
                } else if(data.error === 'incorrect-password') {
                    Swal.fire(
                        'Authentication Failed',
                        'Password is incorrect',
                        'error'
                    )
                } else if (data.error === 'login-type-error') {
                    Swal.fire(
                        'Login Type Error',
                        'You may have registered through a different login procedure',
                        'error'
                    )
                }
            }
        })
    }

    const authenticateGoogleToken = (response) => {
        console.log(response)

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tokenId: response.tokenId })
        }

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/verify-google-token-id`, payload)
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then(data => {
            if (typeof data.accessToken !== 'undefined') {
                localStorage.setItem('token', data.accessToken)
                retrieveUserDetails(data.accessToken)
            } else {
                return false
            }
        })
    }

    const retrieveUserDetails = (accessToken) => {
        const options = {
            headers: {Authorization: `Bearer ${accessToken}`}
        }

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`, options)
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data._id
            })

            Router.push('/transactions')
        })
    }

    return (
        <React.Fragment>
            <div className="loginformcontainer">
                <div className="formhead">Login</div>
                    <Form onSubmit={e => authenticate(e)}>
                        <Form.Group controlId="userEmail">
                        <Form.Label className="form-label">Email address</Form.Label>
                            <div className="cont">
                            <input
                                type="email" 
                                className="effect-2"
                                placeholder="Enter email address" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <span class="focus-border"></span>
                            </div>
                            
                        </Form.Group>

                        <Form.Group controlId="password">
                        <Form.Label className="form-label">Password</Form.Label>
                            <div className="cont">
                            <input
                                className="effect-2"
                                type="password" 
                                placeholder="Enter password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span class="focus-border"></span>
                            </div>
                        </Form.Group>

                        <Button id="submitform" type="submit" style={{display: "none"}}>Submit</Button>
                        <center><label className="submitfrmbtn" htmlFor="submitform">Submit</label></center>

                        <p className="formsubhead">Don't have an account? &nbsp;
                            <Link href="/signup">
                                <a className="link">Sign Up</a>
                            </Link>
                        </p>
                        <hr/>
                        <div className="formsubhead">Login using a different account:</div>
                        <center><GoogleLogin
                            clientId="630619352860-ctgb783qpab5o9rp3hurl6nb5tb73imh.apps.googleusercontent.com"
                            onSuccess={authenticateGoogleToken}
                            onFailure={authenticateGoogleToken}
                            cookiePolicy={'single_host_origin'}
                            className="googlebtn"
                        /></center>
                    </Form>
                </div>
            <OnePageFooter />
        </React.Fragment>
    )
}