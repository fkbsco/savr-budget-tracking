import {useEffect, useState, useContext} from 'react';
import {Row, Col, Card, Button, Alert, Form} from 'react-bootstrap';

import Router from 'next/router'
import Head from 'next/head'

import UserContext from '../UserContext'

const AddCategory = () => {
	
	const {user} = useContext(UserContext);

	const [type, setType] = useState('');
    const [name, setName] = useState('')


	function addCat(e) {

		e.preventDefault()

        // const match = countriesStats.find(country => country.country_name.toLowerCase() === targetCountry.toLowerCase())

        console.log(e)

		if (type === 'Income') {
            if (name.toLowerCase() === 'salary' || name.toLowerCase() === 'dividend' || name.toLowerCase() === 'investment') {
                console.log ('Category is already available. Please try again')
            } else {
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/existing-category`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        type: type,
                        name: name
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data === false) {
                        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/categories`, {
                            method: 'POST',
                            headers : {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                type: type,
                                name: name
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log('Category successfully added')
                        })
                    } else {
                        console.log('Category is already available. Please try again')
                    }
                })
            }
        }
        // } else {
        //     if (type === "Expense") {
        //         if (name.toLowerCase() === 'salary' || name.toLowerCase() === 'dividend' || name.toLowerCase() === 'investment') {
        //             console.log ('Category is already available. Please try again')
        //         } else {
        //             fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`, {
        //                 headers: {
        //                     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //                 }
        //             })
        //             .then(res => res.json())
        //             .then(data => {
        //                 data.categories.find(category => {
        //                     if (category.name.toLowerCase() === name.toLowerCase()) {
        //                         console.log('Category is already available. Please try again')
        //                     } else {
        //                        console.log(data)
        //                     }
        //                 }) 
        //             })
        //         }
        //     }
        // }
    }

	return (
		<React.Fragment>
			 <Form onSubmit={e => addCat(e)}>
				<Form.Group controlId="Type" onChange={(e) => setType(e.target.value)}>
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

				<Form.Group controlId="amount">
					<Form.Label>Category</Form.Label>
					<Form.Control 
						type="text" 
						placeholder="Category" 
						value={name}
						onChange={(e) => setName(e.target.value)}
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

export default AddCategory