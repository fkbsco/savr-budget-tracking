import {useState, useEffect, useRef} from 'react';
import {Alert, Container, Row, Col, Form} from 'react-bootstrap';
import moment from 'moment';

import Head from 'next/head'
import Link from 'next/link'

import OnePageFooter from '../../components/OnePageFooter'
import Footer from '../../components/Footer'
import IncomePieChart from '../../components/IncomePieChart';
import ExpensePieChart from '../../components/ExpensePieChart';
import BudgetTrend from '../../components/BudgetTrend'

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
            <Head>
					<title>Insights</title>
				</Head>
            <div className="formhead">Insights</div>
            { (allData.length > 0)
                ?
                <div>
                <Row xs={12} className="piechartscont">
                    <Col className="chartscontainer" xs={12} lg={5}>
                        <p className="chartlabel">Monthly Incoming Transactions Per Category</p>
                        <p className="chartsubhead">(in percent %)</p>
                        <IncomePieChart allData={allData}/>
                    </Col>
                    <Col className="chartscontainer" xs={12} lg={5}>
                        <p className="chartlabel">Monthly Outgoing Transactions Per Category</p>
                        <p className="chartsubhead">(in percent %)</p>
                        <ExpensePieChart allData={allData}/>
                    </Col>
                </Row>
                <Row xs={12} className="linechartscont">
                    <Col xs={12} lg={11} className="chartscontainer">
                        <p className="chartlabel">Yearly Overview Of Income And Expense</p>
                        <BudgetTrend allData={allData}/>
                    </Col>
                </Row>
                <Footer /> 
                </div>
                :
                <div>
                <center><Alert variant="success">You have no transactions yet.</Alert></center>
                <OnePageFooter />
                </div>
            }
            
		</React.Fragment>
	)
}