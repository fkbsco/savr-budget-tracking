import {useState, useEffect} from 'react'
import {Pie} from 'react-chartjs-2'
import {colorRandomizer} from '../helpers'

export default function IncomePieChart({allData}){

	const [incomeCats, setIncomeCats] = useState([]);
	const [bgColors, setBgColors] = useState([]);
	const [incomeCatFreq, setIncomeCatFreq] = useState([]);
	const [catPercentage, setCatPercentage] = useState([]);

	useEffect(() => {
	let iCat = []
	
    allData.forEach(element => {
		if (element.type === 'Income') {
			if(!iCat.find(category => category === element.category)) {
				iCat.push(element.category)
			}
		}
	})
	
	console.log(allData)
	console.log(iCat)
	setIncomeCats(iCat)

	}, [allData])

	useEffect (() => {
		setIncomeCatFreq(incomeCats.map(category => {
			let frequency = 0

			allData.forEach(freq => {
				if (freq.type === "Income") {
					if (freq.category === category) {
						frequency++
					}
				}
			})

			return frequency
		}))

		console.log(incomeCatFreq)
		setBgColors(incomeCats.map(() => `#${colorRandomizer()}`))
	}, [incomeCats])

	let totalFrequency = incomeCatFreq.reduce((num1, num2, index)=>num1+num2,0)
		console.log(totalFrequency)

	useEffect(() => {
		let temp = []
		let percent = 0

		incomeCatFreq.forEach(data => {
			percent = Math.round((data/totalFrequency*100)*100)/100
			console.log(percent)
			temp.push(percent)
		})

		console.log(temp)
		setCatPercentage(temp)
		console.log(catPercentage)
	} ,[incomeCatFreq])

	
	const data = {
		labels: incomeCats,
		datasets: [{
			data: catPercentage,
			backgroundColor: bgColors,
			hoverBackgroundColor: bgColors
		}]
	}

	return (
		<Pie data={data} />
	)
}