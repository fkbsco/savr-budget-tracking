import {useEffect, useState, useRef, useContext} from 'react';
import {Row, Col, Card, Button, Alert, Form} from 'react-bootstrap';

import Router from 'next/router'
import Head from 'next/head'

import UserContext from '../UserContext'

const AddTransaction = () => {
	
	const {user} = useContext(UserContext);

	const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('');
	const [isEnabled, setIsEnabled] = useState(false);

	function recordTransaction(details, data) {

		console.log(details)
		console.log(data)

		fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/transactions`, {
			method: 'POST',
			headers : {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
                type: type,
                amount: amount,
                category: category
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data === true){
				Router.push('/transactions')
			} else {
				console.log(data)
			}
		})
	}

	useEffect(() => {
		if (type !== '' && amount !== 0 && category !== 0)
	})

	return (
		<React.Fragment>
			 <Form onSubmit={e => recordTransaction(e)}>
				<Form.Group controlId="Type">
					<div onChange={(e) => setType(e.target)}>
						<input type="radio" value="Income" name="transactiontype" /> Income
						<input type="radio" value="Expense" name="transactiontype" /> Expense
					</div>
				</Form.Group>

				<Form.Group controlId="amount">
					<Form.Label>Amount</Form.Label>
					<Form.Control 
						type="text" 
						placeholder="Amount" 
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
					/>
				</Form.Group>

				<Button className="bg-primary" type="submit">
					Submit
				</Button>
			</Form>
		</React.Fragment>
	)
}

export default AddTransaction