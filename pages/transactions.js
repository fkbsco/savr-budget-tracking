import {useState, useEffect, useRef} from 'react';
import {Table, Row, Col, Alert} from 'react-bootstrap';
import moment from 'moment';

import Head from 'next/head'

export default function history({data}) {

    const [overview, setOverview] = useState([]);

    useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
            console.log(data)
			if (data._id){
				setOverview(data.transactions)
			} else {
				setOverview([])
			}
		})
    }, [])
    
    const content = overview.map(data => {
		return (
			<tr key={data._id}>
                <td>{data.type}</td>
                <td>{data.amount}</td>
                <td>{data.category}</td>
				<td>{moment(data.transactionDate).format('MMMM DD YYYY')}</td>
			</tr>
		)
	})

	return (
		<React.Fragment>
			<Head>
				<title>Transaction Overview</title>
			</Head>
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
							{content}
						</tbody>
					</Table>
					:
					<Alert variant="info">You have no transactions yet.</Alert>
					}
				</Col>
			</Row>
		</React.Fragment>
	)
}