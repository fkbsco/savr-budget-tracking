import {useEffect, useState, useRef, useContext} from 'react';
import {Row, Col, Card, Button, Alert, Form, Dropdown, DropdownButton} from 'react-bootstrap';

import Router from 'next/router'
import Head from 'next/head'

import DatePicker from "react-datepicker";
import moment from 'moment';

import UserContext from '../UserContext'

const AddTransaction = () => {
	
	const {user} = useContext(UserContext);

	const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('');
	const [date, setDate] = useState(new Date());
	const [isEnabled, setIsEnabled] = useState(false);
	const [categoriesArray, setCategoriesArray] = useState([]);
	const [searchbar, setSearchBar] = useState('');

	const ExampleCustomInput = ({ value, onClick }) => (
		<button className="example-custom-input" onClick={onClick}>
		  {value}
		</button>
	  );

	function recordTransaction(e) {

		e.preventDefault()

		console.log(e)

		fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/transactions`, {
			method: 'POST',
			headers : {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
                type: type,
                amount: amount,
				category: category,
				date: moment(date)
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

	function categories(e) {
		setType(e.target.value)
		if (e.target.value === "Income") {
			setCategoriesArray(['salary', 'dividends', 'investment'])
		} else {
			setCategoriesArray(['bills', 'travel', 'food'])
		}
	}

	useEffect(() => {
		if (type !== '' && amount !== 0 && category !== '') {
			setIsEnabled(true)
		} else {
			setIsEnabled(false)
		}
	}, [type, amount, category])

	return (
		<React.Fragment>
			 <Form onSubmit={e => recordTransaction(e)}>
				<Form.Group controlId="type" onChange={(e) => categories(e)}>
				<Form.Check
					type="radio"
					value="Income"
					label="Income"
					name="category"
				/>
				<Form.Check
					type="radio"
					value="Expense"
					label="Expense"
					name="category"
				/>
				</Form.Group>

				<Form.Group>
				<DatePicker
					selected={date}
					onChange={date => setDate(date)}
					customInput={<ExampleCustomInput />}
				/>
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

				<Form.Group controlId="category">
					<Form.Label>Category</Form.Label>
					<Form.Control 
						type="text" 
						placeholder="Category" 
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required
					/>
				</Form.Group>
				
				{/* <Form.Group>
					<DropdownButton id="category dropdown" title="Category">
					{categoriesArray.map(category => {
						return (
							<Dropdown.Item value={category} selected={category}>{category}</Dropdown.Item>
						)
					})}
					</DropdownButton>
				</Form.Group> */}
				

				<Button className="bg-primary" type="submit">
					Submit
				</Button>
			</Form>
		</React.Fragment>
	)
}

export default AddTransaction