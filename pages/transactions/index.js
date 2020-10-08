import {useState, useEffect, useRef} from 'react';
import {Alert, Button, Row, Col, Form, Modal, Table} from 'react-bootstrap';
import moment from 'moment';

import Head from 'next/head'
import Link from 'next/link'

import OnePageFooter from '../../components/OnePageFooter'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {faMinus} from '@fortawesome/free-solid-svg-icons'

export default function history({data}) {

	const [overview, setOverview] = useState([]);
	const [reserve, setReserve] = useState([]);
	const [forBalance, setForBalance] = useState([]);
	const [myCategories, setMyCategories] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchItem, setSearchItem] = useState([]);
	const [incomeArr, setIncomeArr] = useState([]);
	const [expenseArr, setExpenseArr] = useState([]);
	const [totalIncome, setTotalIncome] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [balance, setBalance] = useState(0);
	const [searchFilter, setSearchFilter] = useState('byCat');
	const [typeFilter, setTypeFilter] = useState('');
	const [show, setShow] = useState(false);
	// const [categoryId, setCategoryId] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleChange = e => {
		setSearchTerm(e.target.value)
	}

    useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data.transactions)
			// setCategoryId(data._id)
			if (data._id){
				setOverview(data.transactions)
				setReserve(data.transactions)
				setForBalance(data.transactions)
				setMyCategories(data.categories)
			} else {
				setOverview([])
			}
		})
	}, [])

	// function deleteCategory(categoryId) {
	// 	fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${categoryId}`, {
	// 		method: 'DELETE',
	// 		headers: {
	// 			'Authorization': `Bearer ${localStorage.getItem('token')}`
	// 		}
	// 	})
	// 	.then(res => {
	// 		return res.json()
	// 	})
	// 	.then(data => {
	// 		// if course was archived successfully
	// 		if(data === true){
	// 			Swal.fire(
	// 				'Category Deleted',
	// 				'You have successfully deleted the category.',
	// 				'success'
	// 			)
	// 		} else {
	// 			Swal.fire(
	// 				'Oops',
	// 				'We encountered a problem. Please try again.',
	// 				'error'
	// 			)
	// 		}
	// 	})
	// }

	useEffect (() => {
		const amounts = forBalance.forEach(data => {
			if (data.type === "Income") {
				incomeArr.push(data.amount)
			} else {
				expenseArr.push(data.amount)
			}
		})
			console.log(incomeArr)
			console.log(expenseArr)

			let totali = incomeArr.reduce((num1, num2, index)=>num1+num2,0)
			setTotalIncome(totali);

			let totale = expenseArr.reduce((num1, num2, index)=>num1+num2,0)
			setTotalExpenses(totale);

			let bal = totali-totale;
			setBalance(bal)

	}, [forBalance])

	const filtered = searchItem.map(data => {
		return (
			<React.Fragment>
			<Row>
				<Col sm={12} lg={12}>
					<div className="recordbg" key={data._id}>
						<div>
							<span className="rectype">{data.type}</span>
							<span className="recdate">{moment(data.date).utc().format('MMMM DD YYYY')}</span>
						</div>
						<div>
							<span className="reccat">{data.category}</span>
							<span className="recamount">
								{ (data.type === "Income")
								?
								`+ ${data.amount}`
								:
								`- ${data.amount}`
								}
							</span>
						</div>
						<p className="recdescription">"{data.description}"</p>
					</div>
				</Col>
				{/* <Col sm={12} lg={1}>
					<div className="editDelete">
						<FontAwesomeIcon icon ={faMinus} className="deletebtn"/>
					</div>
					<div>
					<div className="editDeleteMobile">
						<span className="deletebtn">Delete</span>
					</div>
					</div>
				</Col> */}
			</Row>
			</React.Fragment>
		)
	})

	const content = overview.map(data => {
		return (
			<React.Fragment>
			<Row>
				<Col sm={12} lg={12}>
					<div className="recordbg" key={data._id}>
						<div>
							<span className="rectype">{data.type}</span>
							<span className="recdate">{moment(data.date).utc().format('MMMM DD YYYY')}</span>
						</div>
						<div>
							<span className="reccat">{data.category}</span>
							<span className="recamount">
								{ (data.type === "Income")
								?
								`+ ${data.amount}`
								:
								`- ${data.amount}`
								}
							</span>
						</div>
						<p className="recdescription">"{data.description}"</p>
					</div>
				</Col>
				{/* <Col sm={12} lg={1}>
					<div className="editDelete">
						<FontAwesomeIcon icon ={faMinus} className="deletebtn"/>
					</div>
					<div>
					<div className="editDeleteMobile">
						<span className="deletebtn">Delete</span>
					</div>
					</div>
				</Col> */}
			</Row>
			</React.Fragment>
		)
	})

	const manageCats = myCategories.map(indivCats => {
		return (
			<tr key={indivCats._id}>
				<td>{indivCats.type}</td>
				<td>{indivCats.name}</td>
				{/* <td><a className="loginbtn">Delete</a>
				</td> */}
			</tr>
		)
	})

	const filterIncome = () => {
		const view = reserve.map(item => item)
		setOverview(view.filter(item => item.type == 'Income'))
	}

	const filterExpense = () => {
		const view = reserve.map(item => item)
		setOverview(view.filter(item => item.type == 'Expense'))
	}

	const dynamicSearchCat = () => {
		const searchItem = overview.filter(record => 
			record.category.toLowerCase().includes(searchTerm.toLowerCase()))
		console.log(searchItem)
		setSearchItem(searchItem)
	}

	const dynamicSearchDate = () => {
		const searchItem = overview.filter(record => 
			record.date.toLowerCase().includes(searchTerm.toLowerCase()))
		console.log(searchItem)
		setSearchItem(searchItem)
	}

	const dynamicSearchDesc = () => {
		const searchItem = overview.filter(record => 
			record.description.toLowerCase().includes(searchTerm.toLowerCase()))
		console.log(searchItem)
		setSearchItem(searchItem)
	}

	useEffect(() => {
		if (searchFilter === "byCat") {
			dynamicSearchCat()
		} else if (searchFilter === "byDate") {
			dynamicSearchDate()
		} else if (searchFilter === "byDesc") {
			dynamicSearchDesc()
		}
	}, [searchTerm, typeFilter, overview]);

	useEffect(() => {
		if (typeFilter === "All") {
			setOverview(reserve)
		} else if (typeFilter === "Income") {
			filterIncome()
		} else if (typeFilter === "Expense") {
			filterExpense()
		}
	}, [typeFilter, searchTerm])
    
	return (
		<React.Fragment>
		<Row>
			<Col xs={12} lg={5}>
				<Head>
					<title>Overview</title>
				</Head>
				<div className="recordformcontainer">
					<div className="formhead">Transaction Overview</div>
					<div className="displaycont">
						<div className="display">
							<p>Income</p>
							<p style={{fontSize: '25px'}}>{totalIncome}</p>
						</div>
						<div className="display">
							<p>Expenses</p>
							<p style={{fontSize: '25px'}}>{totalExpenses}</p>
						</div>
						<div className="display">
							<p>Balance</p>
							<p style={{fontSize: '25px'}}>{balance}</p>
						</div>
					</div>
						<Link href="/transactions/add">
							<center><a className="submitfrmbtn">Add Transaction</a></center>
						</Link><br />
                        <center><a className="submitfrmbtn" onClick={handleShow}>Manage My Categories</a></center>
				</div>
			</Col>
			<Col xs={12} lg={7}>
				<div>
					<div className="radiotrans" onChange={(e) => setTypeFilter(e.target.value)}>
						<Form.Check
							type="radio"
							value="All"
							label="All"
							name="search"
						/> &nbsp;&nbsp;&nbsp;&nbsp;
						<Form.Check
							type="radio"
							value="Income"
							label="Income"
							name="search"
						/>&nbsp;&nbsp;&nbsp;&nbsp;
						<Form.Check
							type="radio"
							value="Expense"
							label="Expense"
							name="search"
						/>
					</div>
					<div className="searchDrop">
						<div className="bar">
							<input
								className="effect-2"
								type="text"
								placeholder="Search"
								value={searchTerm}
								onChange={handleChange}
							/>
						</div>

						<div className="dropdowncont">
							<select className="dropdownsearch" onChange={(e) => setSearchFilter(e.target.value)}>
								<option key="bcategory" value="byCat">Category</option>
								<option key="bdate" value="byDate">Date</option>
								<option key="bdesc" value="byDesc">Description</option>
							</select>
						</div>
					</div>
				</div>
				<div className="recordscontainer">
					{overview.length > 0
					?
							(searchTerm === '')
							?
							content
							:
							filtered
							
					:
					<Alert variant="success">You have no transactions yet.</Alert>
					}
				</div>
			</Col>
		</Row>

		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
			<Modal.Title className="modallabel">Manage My Categories</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Type</th>
							<th>Name</th>
							{/* <th>Action</th> */}
						</tr>
					</thead>
					<tbody>
						{ manageCats }
					</tbody>
				</Table>
			</Modal.Body>
			<Modal.Footer>
			<a className="loginbtn" onClick={handleClose}>Back</a>
			</Modal.Footer>
		</Modal>

		<OnePageFooter />
		</React.Fragment>
	)
}