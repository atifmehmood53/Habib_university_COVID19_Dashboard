var ctx1 = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx1, {
    type: 'line',
    data: {
        datasets: [{
            label: '# Of Cases All Over Pakistan',
            pointBackgroundColor: '#F0CB69',
            pointBorderColor: '#F0CB69',
            pointRadius: 5,
            fill: true,
            backgroundColor: '#8C0618',
            data: [
                {
                    x: new Date(2019, 11, 25),
                    y: 20
                },{
                    x: new Date(2020, 0, 25),
                    y: 50
                },{
                    x: new Date(2020, 1, 25),
                    y: 249
                },{
                    x: new Date(2020, 2, 25),
                    y: 500
                },{
                    x: new Date(),
                    y: 2650
                }
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                },
                ticks: {
                    source: 'data'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: '# of people'
                }
            }]
        }
    }
});


var ctx2 = document.getElementById('chart2').getContext('2d');

var cities = ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta'];
var dataset = [500, 600, 100, 50, 40];

var options = {
    type: 'horizontalBar',
    data: {
        labels: cities,
        datasets: [{
            label: '# Of Cases All Over Pakistan',
            fill: true,
            backgroundColor: '#8C0618',
            data: dataset,
            borderWidth: 1,
            offset: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{

            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: '# of people'
                },
                gridLines: {
                    display: false
                },
            }]
        }
    }
};

var chart2 = new Chart(ctx2, options);

function clear_tooltip(e) {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = 'none';
}

function popup(e) {
	console.log('clicked')

	var tooltip = document.getElementById("tooltip");
	var province;

	if (tooltip.style.display == "block") {
		tooltip.style.display = "none"
	}
	
	tooltip.style.display = "block";
	if (e.target.id === "PK-PB") {
		province = "Punjab";
	}
	else if (e.target.id === "PK-SD") {
		province = "Sindh";
	}
	else if (e.target.id === "PK-TA") {
		province = "Tribal Areas";
	}
	else if (e.target.id === "PK-KP") {
		province = "Khyber Pakhtunkhwa";
	}
	else if (e.target.id === "PK-JK") {
		province = "Azad Kashmir";
	}
	else if (e.target.id === "PK-IS") {
		province = "Islamabad";
	}
	else if (e.target.id === "PK-GB") {
		province = "Gilgit-Baltistan";
	}
	else if (e.target.id === "PK-BA") {
		province = "Balochistan";
	}

	tooltip.innerHTML = "<span class='heading'>" + province + "</span> <br /> Total cases: <span style='color: blue; font-weight: bold;'> 500 </span> <br /> Recovered: <span style='color: green; font-weight: bold;'> 300 </span> <br /> Deaths: <span style='color: red; font-weight: bold;'> 30 </span>"

	tooltip.style.left = e.pageX - 50 + 'px';
	tooltip.style.top = e.pageY - 100 + 'px';
	
}