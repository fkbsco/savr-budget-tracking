import {useState, useEffect} from 'react'
import {Pie} from 'react-chartjs-2'
import {colorRandomizer} from '../helpers'

import moment from 'moment'

export default function ExpensePieChart({allData}){

	const [expenseCats, setExpenseCats] = useState([]);
	const [bgColors, setBgColors] = useState([]);
	const [expenseCatFreq, setExpenseCatFreq] = useState([]);
	const [catPercentage, setCatPercentage] = useState([]);

	useEffect(() => {
	let iCat = []
	
    allData.forEach(element => {
		if (element.type === 'Expense' && moment(element.date).utc().month() === moment(Date.now()).month()) {
			if(!iCat.find(category => category === element.category)) {
				iCat.push(element.category)
			}
		}
	})
	
	console.log(allData)
	console.log(iCat)
	setExpenseCats(iCat)

	}, [allData])

	useEffect (() => {
		setExpenseCatFreq(expenseCats.map(category => {
			let frequency = 0

			allData.forEach(freq => {
				if (freq.type === "Expense") {
					if (freq.category === category) {
						frequency++
					}
				}
			})

			return frequency
		}))

		console.log(expenseCatFreq)
		setBgColors(expenseCats.map(() => `#${colorRandomizer()}`))
	}, [expenseCats])

	let totalFrequency = expenseCatFreq.reduce((num1, num2, index)=>num1+num2,0)
		console.log(totalFrequency)

	useEffect(() => {
		let temp = []
		let percent = 0

		expenseCatFreq.forEach(data => {
			percent = Math.round((data/totalFrequency*100)*100)/100
			console.log(percent)
			temp.push(percent)
		})

		console.log(temp)
		setCatPercentage(temp)
		console.log(catPercentage)
	} ,[expenseCatFreq])

	
	const data = {
		labels: expenseCats,
		datasets: [{
			data: catPercentage,
			backgroundColor: bgColors,
			hoverBackgroundColor: bgColors
		}]
	}

	const config = {
		legend: {
			display: true,
			position: 'right',
			labels: {
				boxWidth: 25,
				fontSize: 15
			}
		}
	}

	return (
		<Pie data={data} options={config}/>
	)
}