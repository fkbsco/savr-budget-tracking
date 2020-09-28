import { useState, useContext } from 'react'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import {GoogleLogin} from 'react-google-login';

import Router from 'next/router'
import Head from 'next/head'

import UserContext from '../UserContext'

export default function index() {
    return(
        <Row className="justify-content-center">
            <Col xs md="6">
                <h3>Login</h3>
                <LoginForm/>
            </Col>
        </Row>
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
                return false
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

            Router.push('/addtransactions')
        })
    }

    return (
        <React.Fragment>
            <Card>
                <Card.Header>Login Details</Card.Header>
                <Card.Body>
                    <Form onSubmit={e => authenticate(e)}>
                        <Form.Group controlId="userEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                value={email}
                            	onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                            	onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button className="bg-primary" type="submit">
                            Submit
                        </Button>

                        <GoogleLogin
                            clientId="630619352860-ctgb783qpab5o9rp3hurl6nb5tb73imh.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={authenticateGoogleToken}
                            onFailure={authenticateGoogleToken}
                            cookiePolicy={'single_host_origin'}
                            className="w-100 text-center d-flex justify-content-center"
                        />

                    </Form>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}