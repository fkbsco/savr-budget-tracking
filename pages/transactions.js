import {useState, useEffect, useRef} from 'react';
import {Table, Row, Col, Alert} from 'react-bootstrap';
import moment from 'moment';

import Head from 'next/head'

export default function history({data}) {

	const [overview, setOverview] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchItem, setSearchItem] = useState([]);
	const handleChange = e => {
		setSearchTerm(e.target.value).then(dynamicSearch())
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
			<tr key={data._id}>
                <td>{data.type}</td>
                <td>{data.amount}</td>
                <td>{data.category}</td>
				<td>{moment(data.date).utc().format('MMMM DD YYYY')}</td>
			</tr>
		)
	})
    
    const content = overview.map(data => {
		return (
			<tr key={data._id}>
                <td>{data.type}</td>
                <td>{data.amount}</td>
                <td>{data.category}</td>
				<td>{moment(data.date).utc().format('MMMM DD YYYY')}</td>
			</tr>
		)
	})

	return (
		<React.Fragment>
			<Head>
				<title>Transaction Overview</title>
			</Head>
			<div>
				<input
					type="text"
					placeholder="Search"
					value={searchTerm}
					onChange={handleChange}
				/>

				<Row>
					<Col xs={12} lg={8}>
						{overview.length > 0
						?
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Type</th>
									<th>Amount</th>
									<th>Category</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								{(searchTerm === '')
								?
								content
								:
								filtered
								}
							</tbody>
						</Table>
						:
						<Alert variant="info">You have no transactions yet.</Alert>
						}
					</Col>
				</Row>
			</div>
		</React.Fragment>
	)
}