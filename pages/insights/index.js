import {useState, useEffect, useRef} from 'react';
import {Alert, Container, Row, Col, Form} from 'react-bootstrap';
import moment from 'moment';

import Head from 'next/head'
import Link from 'next/link'

import OnePageFooter from '../../components/OnePageFooter'
import IncomePieChart from '../../components/IncomePieChart';

export default function history({data}) {

    const [allData, setAllData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data._id){
                setAllData(data.transactions)
            } else {
                setAllData([])
            }
        })
    }, [])

    return (
		<React.Fragment>
            <IncomePieChart allData={allData}/>
            <OnePageFooter />
		</React.Fragment>
	)
}