import {useEffect, useState, useRef, useContext} from 'react';
import {Button, Form} from 'react-bootstrap';

import Router from 'next/router'
import Link from 'next/link'

import moment from 'moment';

import UserContext from '../../UserContext'
import Footer from '../../components/Footer'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const AddTransaction = () => {
	
	const {user} = useContext(UserContext);

	const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('Add category');
	const [categoryInput, setCategoryInput] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState(new Date());	
	const [defaultCats, setDefaultCats] = useState([]);
	const [isOthers, setIsOthers] = useState(false);
	const [addedCats, setAddedCats] = useState([]);
	const [addedIncome, setAddedIncome] = useState([]);
	const [addedExpense, setAddedExpense] = useState([]);

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
				category: categoryInput,
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

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
            setAddedCats(data.categories)
		})
	}, [])

	useEffect(() => {
		addedCats.forEach(cat => {
			if (cat.type === "Income") {
				if (cat.name !== 'Salary' && cat.name !== 'Dividends' && cat.name !== 'Investment') {
					addedIncome.push(cat.name)
				}
			} else if (cat.type === "Expense") {
				if (cat.name !== 'Home' && cat.name !== 'Bills' && cat.name !== 'Travel' && cat.name !== 'Food' && cat.name !== 'Transportation' && cat.name !== 'Education') {
					addedExpense.push(cat.name)
				}
			}
		})

		console.log(addedIncome)
		console.log(addedExpense)
	}, [addedCats])

	useEffect(() => {
		if (type === "Income") {
			setDefaultCats(['Salary', 'Dividends', 'Investment', ...addedIncome])
		} else {
			setDefaultCats(['Home', 'Bills','Travel', 'Food', 'Transportation', 'Education', ...addedExpense])
		}
	}, [type])

	useEffect(() => {
		if (category === 'Add category') {
			setIsOthers(true)
		} else {
			setIsOthers(false)
		}
	}, [category])

	useEffect(() => {
		if (category !== 'Add category') {
			setCategoryInput(category)
		}
	}, [category])

	return (
		<React.Fragment>
			<div className="addtransformcontainer">
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
									defaultValue= ""
									className={classes.textField}
									InputLabelProps={{
									shrink: true,
									}}
									onChange={(e) => setDate(e.target.value)}
									required
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

						<Form.Group controlId="defaultcategories">
						<Form.Label className="form-label">Category</Form.Label>
						<select onChange={e => setCategory(e.target.value)} className="dropdown">
								{defaultCats.map(cats => {
									return(
										<option key={cats} value={cats}>{cats}</option>
									)
								})}
								<option key="others" value="Add category">Add category</option>
						</select>
						</Form.Group>

						{(isOthers === true)
							?
							<Form.Group controlId="category">
								<Form.Label className="form-label">New category</Form.Label>
								<div className="cont">
									<input
										className="effect-2"
										type="text" 
										placeholder="Category name" 
										value={categoryInput}
										onChange={(e) => setCategoryInput(e.target.value)}
									/>
									<span class="focus-border"></span>
								</div>
							</Form.Group>
							: 
							null
						}

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
				<Footer />
			</React.Fragment>
	)
}

export default AddTransaction
