import {useState, useEffect, useRef} from 'react';
import {Alert, Container, Row, Col} from 'react-bootstrap';
import moment from 'moment';

import Head from 'next/head'
import Link from 'next/link'

export default function history({data}) {

	const [overview, setOverview] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchItem, setSearchItem] = useState([]);
	const [incomeArr, setIncomeArr] = useState([]);
	const [expenseArr, setExpenseArr] = useState([]);
	const [totalIncome, setTotalIncome] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [balance, setBalance] = useState(0);
	const handleChange = e => {
		setSearchTerm(e.target.value)
		dynamicSearch()
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
			if (data._id){
				setOverview(data.transactions)
			} else {
				setOverview([])
			}
		})
	}, [])

	useEffect (() => {
		const amounts = overview.forEach(data => {
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

			let bal = totali - totale
			setBalance(bal);

	}, [overview])

	
	
	const dynamicSearch = () => {
		const searchItem = overview.filter(record => 
			record.category.toLowerCase().includes(searchTerm))
		console.log(searchItem)
		setSearchItem(searchItem)

		// fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/searchrecord`, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify({
		// 			searchTerm: searchTerm	
		// 		})
		// })
		// .then(res => res.json())
		// .then(data => {
		// 	// setSearchItem(data)
		// 	console.log(data)
		// })
	}

	// useEffect(() => {
	// 	if (searchTerm !== '') {
	// 		dynamicSearch()
	// 	}
	// }, [searchTerm])

	const filtered = searchItem.map(data => {
		return (
			<Container key={data._id}>
				<div className="recordbg" key={data._id}>
					<div>
						<span className="rectype">{data.type}</span>
						<span className="recdate">{moment(data.date).utc().format('MMMM DD YYYY')}</span>
					</div>
					<div>
						<span className="reccat">{data.category}</span>
						<span className="recamount">{data.amount}</span>
					</div>
					<p className="recdescription">"sept sahod"</p>
				</div>
			</Container>
		)
	})

	const content = overview.map(data => {
		return (
			<div className="recordcont">
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
							`+${data.amount}`
							:
							`-${data.amount}`
							}
						</span>
					</div>
					<p className="recdescription">{data.description}</p>
				</div>
			</div>
		)
	})
	
    
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
						<div class="display">
							<p>Income</p>
							<p style={{fontSize: '25px'}}>{totalIncome}</p>
						</div>
						<div class="display">
							<p>Expenses</p>
							<p style={{fontSize: '25px'}}>{totalExpenses}</p>
						</div>
						<div class="display">
							<p>Balance</p>
							<p style={{fontSize: '25px'}}>{balance}</p>
						</div>
					</div>
				</div>
			</Col>
			<Col xs={12} lg={7}>
				<div className="bar">
					Search: &nbsp;
					<input
						className="effect-2"
						type="text"
						value={searchTerm}
						onChange={handleChange}
					/>
					<Link href="/addtransactions">
						<a className="signupbtn">+</a>
					</Link>
				</div>
						{overview.length > 0
						?
								(searchTerm === '')
								?
								content
								:
								filtered
								
						:
						<Alert variant="info">You have no transactions yet.</Alert>
						}
			</Col>
		</Row>
		</React.Fragment>
	)
}