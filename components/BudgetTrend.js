import {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'

import moment from 'moment'

export default function BudgetTrend({allData}){

    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [lineData, setLineData] = useState({});
    const [incomeDateArray, setIncomeDateArray] = useState([]);
    const [expenseDateArray, setExpenseDateArray] = useState([]);

    useEffect(() => {
        let income = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let expense = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        allData.forEach(element => {
            if (element.type === 'Income') {
                income[moment(element.date).month()]
                += parseInt(element.amount)
            } else if (element.type === 'Expense') {
                expense[moment(element.date).month()]
                += parseInt(element.amount)
            } 
        })
        
        setLineData({
            labels: months,
            datasets: [{
                label: 'Income',
                data: income,
                fill: false,
                backgroundColor: 'rgba(235, 64, 52, 0.8)',
                borderColor: 'rgba(189, 49, 40, 0.7)'
            },
            {
                label: 'Expense',
                data: expense,
                fill: false,
                backgroundColor: 'rgba(46, 153, 219, 0.8)',
                borderColor: 'rgba(40, 134, 191, 0.7)'
            }]
        })
          
    }, [allData])

    useEffect(() => {
        setIncome(incomeDateArray.map(dates => {
            let total = 0

            allData.forEach(element => {
                if(element.date === dates) {
                    total += element.amount
                }
            })

            return total
        }))

        console.log(income)
    }, [incomeDateArray])


    const config = {
		legend: {
			display: true,
			labels: {
				boxWidth: 45,
				fontSize: 15
			}
		}
	}

	return (
		<Line data={lineData} options={config}/>
	)
}