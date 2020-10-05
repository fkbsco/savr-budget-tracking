import {Card, CardDeck} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearchDollar} from '@fortawesome/free-solid-svg-icons'
import {faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons'
import {faChartLine} from '@fortawesome/free-solid-svg-icons'

export default function Features() { 
	return ( 
        <React.Fragment>
                <div className='features'>
                    Features
                </div>
                <CardDeck className="group">
                    <Card border="light" className="cards">
                        <hr />
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon ={faSearchDollar} className="icon"/>
                                <div className="header">
                                Track Your Savings
                                </div>
                            </Card.Title>
                            <Card.Text className="text">
                                Allows you to add income and expenses whenever, wherever. 
                            </Card.Text>
                        </Card.Body>
                        <hr />
                    </Card>
                    <Card border="light" className="cards">
                        <hr />
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon ={faChartLine} className="icon"/>
                                <div className="header">
                                Get Insights On Your Spending
                                </div>
                            </Card.Title>
                            <Card.Text className="text">
                                Provides a summary of your expenditures.
                            </Card.Text>
                        </Card.Body>
                        <hr />
                    </Card>
                    <Card border="light" className="cards">
                        <hr />
                        <Card.Body>
                            <Card.Title>
                            <FontAwesomeIcon icon ={faHandHoldingUsd} className="icon"/>
                            <div className="header">
                                Invest In The Long Run
                                </div>
                            </Card.Title>
                            <Card.Text className="text">
                                Keeps your goals in line by helping you manage your budget.
                            </Card.Text>
                        </Card.Body>
                        <hr />
                    </Card>
                </CardDeck>
        </React.Fragment>
	) 
}