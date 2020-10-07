import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

import Link from 'next/link'
import Router from 'next/router'

import Footer from '../../components/Footer'

export default function signup() {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        e.preventDefault();

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/existing-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        })
        .then(res => res.json())
        .then(data => {

            if (data === false){
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: firstName,
						lastName: lastName,
                        email: email,
                        mobileNo: mobileNo,
						password: password1						
                    })
                })
                .then(res => res.json())
                .then(data => {

                    if(data === true){
                        Router.push('/login')
                    }else{
                        console.log(data)
                    }
                })
            }else{
               console.log(data)
            }
        })
    } 

    useEffect(() => {
        
        if((email !== '' && password1 !== '' && password2 !== '') && (password2 === password1) && (mobileNo.length === 11)){
            setIsActive(true)
        }else{
            setIsActive(false)
        }

    }, [password1, password2, email, mobileNo])

    return (
        <React.Fragment>
			<div className="signupformcontainer">
				<div className="formhead">Register</div>
					<Form onSubmit={e => registerUser(e)}>
					<Form.Group>
						<Form.Label className="form-label">First Name</Form.Label>
						<div className="cont">
							<input 
								type="text"
								className="effect-2"
								placeholder="Input first name"
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
								required
							/>
                        <span class="focus-border"></span>
                        </div>
					</Form.Group>

					<Form.Group>
						<Form.Label className="form-label">Last Name</Form.Label>
						<div className="cont">
						<input
							type="text"
							className="effect-2"
							placeholder="Input last name"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							required
						/>
						<span class="focus-border"></span>
						</div>
					</Form.Group>

					<Form.Group>
						<Form.Label className="form-label">Email Address</Form.Label>
						<div className="cont">
						<input
							type="email"
							className="effect-2"
							placeholder="Input email address"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<span class="focus-border"></span>
						</div>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group>
						<Form.Label className="form-label">Mobile No.</Form.Label>
						<div className="cont">
						<input 
							type="number"
							className="effect-2"
							placeholder="Input 11 digit mobile number"
							value={mobileNo}
							onChange={e => setMobileNo(e.target.value)}
							required
						/>
						<span class="focus-border"></span>
						</div>
						<Form.Text className="text-muted">
							We'll never share your number with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group>
						<Form.Label className="form-label">Password</Form.Label>
						<div className="cont">
						<input
							type="password"
							className="effect-2"
							placeholder="Password"
							value={password1}
							onChange={e => setPassword1(e.target.value)}
							required
						/>
						<span class="focus-border"></span>
						</div>
					</Form.Group>

					<Form.Group>
						<Form.Label className="form-label">Verify Password</Form.Label>
						<div className="cont">
						<input
							type="password"
							className="effect-2"
							placeholder="Verify Password"
							value={password2}
							onChange={e => setPassword2(e.target.value)}
							required
						/>
						<span class="focus-border"></span>
						</div>
					</Form.Group>

					<Button id="submitform" type="submit" style={{display: "none"}}>Submit</Button>
					{isActive
						?
						<center><label className="submitfrmbtn" htmlFor="submitform">
                            Submit
                        </label></center>
						:
						<center><label className="submitfrmbtndisabled" htmlFor="submitform" disabled>
                            Submit
                        </label></center>
					}
					<p className="formsubhead">Already have an account? &nbsp;
                            <Link href="/login">
                                <a className="link">Login</a>
                            </Link>
                        </p>
				</Form>
		</div>
		<Footer />
    	</React.Fragment>
    )
}