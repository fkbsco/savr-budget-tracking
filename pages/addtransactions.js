import {useEffect, useState, useRef, useContext} from 'react';
import {Button, Form} from 'react-bootstrap';

import Router from 'next/router'
import Link from 'next/link'

import moment from 'moment';

import UserContext from '../UserContext'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const AddTransaction = () => {
	
	const {user} = useContext(UserContext);

	const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState(new Date());
	const [isEnabled, setIsEnabled] = useState(false);

	const useStyles = makeStyles((theme) => ({
		container: {
		  display: 'flex',
		  flexWrap: 'wrap',
		},
		textField: {
		  marginLeft: theme.spacing(1),
		  marginRight: theme.spacing(1),
		  width: 200,
		},
	  }));
	
	  const classes = useStyles();
	

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
				date: moment(date),
				description: description
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
	console.log(date)

	useEffect(() => {
		if (type !== '' && amount !== 0 && category !== '') {
			setIsEnabled(true)
		} else {
			setIsEnabled(false)
		}
	}, [type, amount, category])

	return (
		<React.Fragment>
			<div className="loginformcontainer">
				<div className="formhead">Add Transaction</div>
					<Form onSubmit={e => recordTransaction(e)}>
						<Form.Label className="form-label">Type:</Form.Label>
							<Form.Group controlId="type" onChange={(e) => setType(e.target.value)}>
							<div className="cont">
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
							</div>
							</Form.Group>
							
							<Form.Group>
							<Form.Label className="form-label">Date
							<form className={classes.container} noValidate>
								<TextField
									id="date"
									type="date"
									defaultValue="2017-05-24"
									className={classes.textField}
									InputLabelProps={{
									shrink: true,
									}}
									onChange={(e) => setDate(e.target.value)}
								/>
							</form>
							</Form.Label>
							</Form.Group>

							<Form.Group controlId="amount">
							<Form.Label className="form-label">Amount</Form.Label>
							<div className="cont">
								<input 
									className="effect-2"
									type="text" 
									placeholder="0" 
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									required
								/>
								<span class="focus-border"></span>
							</div>
							</Form.Group>

							<Form.Group controlId="category">
							<Form.Label className="form-label">Category</Form.Label>
							<div className="cont">
								<input
									className="effect-2"
									type="text" 
									placeholder="Category" 
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									required
								/>
								<span class="focus-border"></span>
							</div>
						</Form.Group>

						<Form.Group controlId="description">
						<Form.Label className="form-label">Description</Form.Label>
						<div className="cont">
							<input
								className="effect-2"
								type="text" 
								placeholder="Description" 
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
							<span class="focus-border"></span>
							</div>
						</Form.Group>

						<Button id="submitform" type="submit" style={{display: "none"}}>Submit</Button>
                        <center><label className="submitfrmbtn" htmlFor="submitform">Submit</label>
							<Link href='/transactions'>
							<label className="loginbtn">Back</label>
							</Link>
							</center>
						
					</Form>
				</div>
			</React.Fragment>
	)
}

export default AddTransaction
