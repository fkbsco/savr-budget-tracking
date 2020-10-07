import {useState, useEffect, useContext} from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import OnePageFooter from '../../components/OnePageFooter'
import UserContext from '../../UserContext'

import Link from 'next/link'
import Router from 'next/router'

export default function Profile() {

    const { unsetUser } = useContext(UserContext)

    const [details, setDetails] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState(0);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isEnabled, setIsEnabled] = useState(false)

    function editAccount(e) {
        e.preventDefault();

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify ({
                firstName: firstName,
                lastName: lastName,
                mobileNo: mobileNo,
                password: password,
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data === true) {
                unsetUser()
                Router.push('/login')
            } else {
                console.log(data)
            }
        })
    }

    useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data._id){
				setDetails(data)
			} else {
				setOverview([])
			}
		})
    }, [])

    return (
        <React.Fragment>
            <Container>
                <div className="profilecont">
                    <Row>
                        <Col xs={12} lg ={4} className="sidebar">
                            <Row>
                                <img className="sidebarimg" src="https://www.catholiccharitiesdc.org/wp-content/uploads/2018/09/blank-profile-picture-973460_640.png" />
                            </Row>
                            <Row>
                                <div className="sidebarname">{details.firstName} {details.lastName}</div>
                            </Row>
                            <Row>
                                <a className="editprofilebtn" onClick={(e) => setIsEnabled(true)}>Edit Profile</a>
                            </Row>
                        </Col>
                        <Col xs={12} lg={8} className="profcont">
                            {(isEnabled === true)
                                ?
                                <div className="editformcont">
                                    <Form onSubmit={e => editAccount(e)}>
                                        <Form.Group controlId="email">
                                            <Form.Label className="form-label">Email:</Form.Label>
                                                <div className="cont">
                                                <input
                                                    type="input" 
                                                    className="effect-2"
                                                    placeholder={details.email} 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    disabled
                                                />
                                                <span class="focus-border"></span>
                                                </div>
                                            
                                        </Form.Group>

                                        <Form.Group controlId="fname">
                                        <Form.Label className="form-label">First name:</Form.Label>
                                            <div className="cont">
                                            <input
                                                type="input" 
                                                className="effect-2"
                                                placeholder={details.firstName} 
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                            />
                                            <span class="focus-border"></span>
                                            </div>
                                            
                                        </Form.Group>

                                        <Form.Group controlId="lname">
                                        <Form.Label className="form-label">Last name:</Form.Label>
                                            <div className="cont">
                                            <input
                                                type="input" 
                                                className="effect-2"
                                                placeholder={details.lastName} 
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required
                                            />
                                            <span class="focus-border"></span>
                                            </div>
                                            
                                        </Form.Group>

                                        {(details.loginType === "email")
                                            ?
                                            <React.Fragment>
                                                <Form.Group controlId="mobile">
                                                <Form.Label className="form-label">Mobile no:</Form.Label>
                                                    <div className="cont">
                                                    <input
                                                        type="input" 
                                                        className="effect-2"
                                                        placeholder={details.mobileNo} 
                                                        value={mobileNo}
                                                        onChange={(e) => setMobileNo(e.target.value)}
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
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                            <Form.Group controlId="mobile">
                                            <Form.Label className="form-label">Mobile no:</Form.Label>
                                                <div className="cont">
                                                <input
                                                    type="input" 
                                                    className="effect-2"
                                                    placeholder={details.mobileNo} 
                                                    value={mobileNo}
                                                    onChange={(e) => setMobileNo(e.target.value)}
                                                    disabled
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
                                                    value = 'null'
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    disabled
                                                />
                                                <span class="focus-border"></span>
                                                </div>
                                            </Form.Group>
                                        </React.Fragment>
                                        }

                                        <Button id="submitform" type="submit" style={{display: "none"}}>Submit</Button>
                                            <center><label className="submitfrmeditbtn" htmlFor="submitform">Submit</label>
                                            <a className="loginbtn" onClick={(e) => setIsEnabled(false)}>Cancel</a>
                                            </center>
                                    </Form>
                                </div>
                                :
                                <div className="editformcont">
                                    <Form onSubmit={e => editAccount(e)}>
                                        <Form.Group controlId="email">
                                            <Form.Label className="form-label">Email:</Form.Label>
                                                <div className="cont">
                                                <input
                                                    type="input" 
                                                    className="effect-2"
                                                    placeholder={details.email} 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    disabled
                                                />
                                                <span class="focus-border"></span>
                                                </div>
                                            
                                        </Form.Group>

                                        <Form.Group controlId="fname">
                                        <Form.Label className="form-label">First name:</Form.Label>
                                            <div className="cont">
                                            <input
                                                type="input" 
                                                className="effect-2"
                                                placeholder={details.firstName} 
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                disabled
                                            />
                                            <span class="focus-border"></span>
                                            </div>
                                            
                                        </Form.Group>

                                        <Form.Group controlId="lname">
                                        <Form.Label className="form-label">Last name:</Form.Label>
                                            <div className="cont">
                                            <input
                                                type="input" 
                                                className="effect-2"
                                                placeholder={details.lastName} 
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                disabled
                                            />
                                            <span class="focus-border"></span>
                                            </div>
                                            
                                        </Form.Group>

                                        <Form.Group controlId="mobile">
                                        <Form.Label className="form-label">Mobile no:</Form.Label>
                                            <div className="cont">
                                            <input
                                                type="input" 
                                                className="effect-2"
                                                placeholder={details.mobileNo} 
                                                value={mobileNo}
                                                onChange={(e) => setMobileNo(e.target.value)}
                                                disabled
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
                                                disabled
                                            />
                                            <span class="focus-border"></span>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                </div>
                            }
                        </Col>
                    </Row>
                </div>
            </Container>
            <OnePageFooter />
        </React.Fragment>
    )
}