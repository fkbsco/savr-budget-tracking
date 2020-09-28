import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router'

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
            <Form onSubmit={e => registerUser(e)} className="col-lg-4 offset-lg-4 my-5">
			<Form.Group>
				<Form.Label>First Name</Form.Label>
				<Form.Control 
					type="text"
					placeholder="Input first name"
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Last Name</Form.Label>
				<Form.Control 
					type="text"
					placeholder="Input last name"
					value={lastName}
					onChange={e => setLastName(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Email Address</Form.Label>
				<Form.Control 
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

            <Form.Group>
				<Form.Label>Mobile No.</Form.Label>
				<Form.Control 
					type="number"
					placeholder="Input 11 digit mobile number"
					value={mobileNo}
					onChange={e => setMobileNo(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control 
					type="password"
					placeholder="Password"
					value={password1}
					onChange={e => setPassword1(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Verify Password</Form.Label>
				<Form.Control 
					type="password"
					placeholder="Verify Password"
					value={password2}
					onChange={e => setPassword2(e.target.value)}
					required
				/>
			</Form.Group>

			{isActive
				?
				<Button 
					className="bg-primary"
					type="submit"
					id="submitBtn"
				>
					Submit
				</Button>
				:
				<Button 
					className="bg-danger"
					type="submit"
					id="submitBtn"
					disabled
				>
					Submit
				</Button>
			}
			
		</Form>
        </React.Fragment>
    )
}