mainUrl = 'http://icomms.ru/inf/meteo.php?tid=59'


	document.getElementById("myChart1").style.display = "none";
	document.getElementById("myChart2").style.display = "none";
	document.getElementById("myChart3").style.display = "none";
	document.getElementById("myChart4").style.display = "none";

document.getElementById("tempDinNav").addEventListener("click", () => {
	document.getElementById("myChart1").style.display = "block";
	document.getElementById("myChart2").style.display = "none";
	document.getElementById("myChart3").style.display = "none";
	document.getElementById("name").innerText = "Динамика температур"
})
document.getElementById("presDinNav").addEventListener("click", () => {
	document.getElementById("myChart2").style.display = "block";
	document.getElementById("myChart1").style.display = "none";
	document.getElementById("myChart3").style.display = "none";
	document.getElementById("name").innerText = "Динамика температур"

})
document.getElementById("windDinNav").addEventListener("click", () => {
	document.getElementById("myChart3").style.display = "block";
	document.getElementById("myChart1").style.display = "none";
	document.getElementById("myChart2").style.display = "none";
	document.getElementById("name").innerText = "Динамика ветра"

})


let dataArr = {};



const chart1 = document.getElementById('myChart1').getContext('2d');
const chart2 = document.getElementById('myChart2').getContext('2d');
const chart3 = document.getElementById('myChart3').getContext('2d');
const chart4 = document.getElementById('myChart4').getContext('2d');

async function get() {
    let url = mainUrl;
    let obj = await (await fetch(url)).json();
    //console.log(obj);
    return obj;
}

var tags;
async function sus(){
	tags = await get()
	    
	let gSDate = document.getElementById("start").value
	let gEDate = document.getElementById("end").value

	console.log(tags);
	let dates = [];
	tags.forEach((item) => {if(item.date>=gSDate && item.date<=gEDate) dates.push(item.date)})
	let temp = [];
	tags.forEach((item) => {if(item.date>=gSDate && item.date<=gEDate) temp.push(parseInt(item.temp))})
	let pressures = [];

	let maxTemp = Math.max(...temp);
	console.log(Math.max(...temp));
	let daysMoreNorm = 0;
	console.log(pressures)

	tags.forEach((item) => {if(item.date>=gSDate && item.date<=gEDate) pressures.push(parseInt(item.pressure))})

	for(sis in pressures) {
			if(sis!=750) {
			daysMoreNorm++;
		}
	}
	document.getElementById("max").innerText="Макс температура:"+maxTemp
	document.getElementById("nopres").innerText="Давление:"+daysMoreNorm
	console.log(dates);
	let Chart1 = new Chart(chart1, {
		type: 'line',
		data:
			{
				labels: dates,
				datasets:[{
					label: 'Temperature dynamics',
					data: temp,
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.1
				}]
			},
		})
	let Chart2 = new Chart(chart2, 
	  {
	  type: 'bar',
		data:
		{
			labels: dates, 
			datasets:[{
				backgroundColor: ['rgba(255, 99, 132, 0.2)'],
				label: 'Temperature dynamics',
				data: pressures,
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}]
		},
	  options: {
		scales: {
		  y: {
			beginAtZero: false,
			min: 720,
			max: 780,
		  }
		}
	  },
	})
	let n = new Set();
	tags.forEach((item) => {n.add(item.wind.split(' ')[0])})
	console.log(n);
	windDir = [...n]
	windCount = []
	windDir.forEach( (windit) =>{
	let n = 0;
	tags.forEach((item) => {
			if(item.wind.split(' ')[0]===windit && item.date>=gSDate && item.date<=gEDate){
				n++;
			}
		})
	windCount.push(n);
	})
	console.log(windCount);
	console.log(windDir);
	let Chart3 = new Chart(chart3, {
		type: 'radar',
		label: 'динамика ветра',
		data: {
			labels: windDir,
			datasets: [{
				data:   windCount,
				borderColor: [
				  'rgb(255, 99, 132)',
				  'rgb(54, 162, 235)',
				  'rgb(255, 205, 86)',
				  'rgb(255, 123, 0)',
				  'rgb(245, 66, 239)',
				  'rgb(66, 224, 245)',
				  'rgb(0, 255, 140)',
				  'rgb(255, 234, 0)',
				],
				}]
			}
		})

	}


document.getElementById("count").addEventListener("click", () => {
	sus();
})
