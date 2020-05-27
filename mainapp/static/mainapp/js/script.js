var zone_wise_donut_data = [
    // [Confirmed, Active, Recovered, Deceased]
    [4322, 3687, 572, 63], // Pakistan
    [28, 27, 1, 0], // AK
    [212, 134, 76, 2], // Balochistan
    [213, 114, 96, 3], // GB
    [102, 91, 10, 1], // Islamabad
    [560, 466, 74, 20], // KPK
    [2171, 2119, 35, 17], // Punjab
    [1036, 736, 280, 20] // Sindh
];

const zones = {
    PK: 0,
    AK: 1,
    BA: 2,
    GB: 3,
    IS: 4,
    KP: 5,
    PB: 6,
    SD: 7
};

Object.freeze(zones);

const hospital_zones = {
    AK: 0,
    BA: 1,
    GB: 2,
    IS: 3,
    KP: 4,
    PB: 5,
    SD: 6
};

Object.freeze(hospital_zones);

// Global selectors
var last_selected_zone;
var selected_expansion_button;
var total_infected = document.getElementById("total-infected");
var most_infected_city = document.getElementById("most-infected-city")
var center_1 = document.getElementById("center-1");
var center_2 = document.getElementById("center-2");
var center_3 = document.getElementById("center-3");
var center_list = document.getElementById("center-list");
var trend_slider = document.getElementById('trend_slider');
var update_text = document.getElementById("update-text");
var week_slider = document.getElementById("week_slider");

// Add link to webpage as a string in place of the empty string as "http://www.webpage.com".
// Ensure the "http://"
var hospital_info = [
    [
        ["Abbas Institute of Medical Sciences, Muzzaffarabad", ""],
        ["DHQ Hospital, Mirpur", ""],
        ["Sheikh Khalifa Bin Zaid (SKBZ) Hospital, Rawalakot", ""]
    ], //AK

    [
        ["Red Crescent Hospital, Gwadar", ""],
        ["Fatima Jinnah General and Chest Hospital, Quetta", ""],
        ["DHQ Teaching Hospital, Turbat", ""]
    ], //BA

    [
        ["Civil Hospital, Hunza", ""],
        ["DHQ Hospital, Gilgit", ""],
        ["DHQ Hospital, Skardu", ""]
    ], //GB

    [
        ["Pakistan Institute of Medical Sciences (PIMS), Islamabad", ""]
    ], //IS

    [
        ["Bacha Khan Medical Complex, Swabi", ""],
        ["Ayub Teaching Hospital, Abbotabad", ""],
        ["Lady Reading Hospital, Peshawar", ""]
    ], //KP

    [
        ["Benazir Bhutto Hospital, Rawalpindi", ""],
        ["Services Hospital, Lahore", ""],
        ["Allied Teaching Hospital, Faisalabad", ""]
    ], //PB

    [
        ["Aga Khan University Hospital, Karachi", ""],
        ["LUMHS hospital, Hyderabad", ""],
        ["Jinnah Postgraduate Medical Centre, Karachi", ""]
    ] //SD
];
var hospital_links = [
    [], //AK
    [], //BA
    [], //GB
    [], //IS
    [], //KP
    [], //PB
    [], //SD
];

var i;
var x;
for (i = 0; i < hospital_info.length; i++) {
    for (x = 0; x < hospital_info[i].length; x++) {
        var link = document.createElement('a');
        link.textContent = hospital_info[i][x][0];
        link.setAttribute('href', hospital_info[i][x][1]);
        link.setAttribute('target', 'blank');
        link.setAttribute('class', 'hospital');
        link.setAttribute('style', 'color: white');

        var list_element = document.createElement("li");
        list_element.appendChild(link);
        hospital_links[i].push(list_element);
    }
}
console.log(hospital_links);


var all_provinces = [
    document.getElementById('PK-PB'),
    document.getElementById('PK-SD'),
    document.getElementById('PK-BA'),
    document.getElementById('PK-KP'),
    document.getElementById('PK-GB'),
    document.getElementById('PK-IS'),
    document.getElementById('PK-AK'),
    document.getElementById('PK-TA')
];
var month_list = [];
var a = national_donut_data()
var national_timeSeries = national_timeSeries_data()
var n = national_timeSeries;
var c = prediction_data()
var d = monthly_data(n);
//var copy_d = JSON.parse(JSON.stringify(d));
//var copy_b = JSON.parse(JSON.stringify(d));
var today = new Date();
var current_month = today.getMonth();
//var b = current_month_data(n, current_month);
var currently_selected = undefined;
var month_data;
var weekly_data_list = weekly_data(n, 'national');
console.log(weekly_data_list)
var updated_data = []
for (var i = 0; i < weekly_data_list.length; i++) {
    updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1])
}
console.log(updated_data)
b = updated_data;

//console.log(d);
var province_donut = province_donut_data()
var province_labels;
updated_time();
//console.log(a)

// Donut Chart
var donut_ctx = document.getElementById('donut-chart').getContext('2d');
var donut_config = {
    type: 'doughnut',
    data: {
        datasets: [{
            //data: zone_wise_donut_data[zones.PK], // Displays Pakistan wide info by default.
            data: a,
            backgroundColor: [
                //'#ff482b', peach
                /*'#f57200',
                '#f5d400',
                '#50bf0f',
                '#d10d0d'*/
                //'#d56f28',
                '#b74e65',
                '#908834',
                '#c84533'
            ],
        }],
        labels: ['Active', 'Recovered', 'Deceased']
    },
    options: {
        title: {
            display: true,
            text: 'Nationwide Cases Distribution'
        },
        responsive: true,
        legend: {
            position: 'top',
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
};
var donut_chart = new Chart(donut_ctx, donut_config);

var donut_ctx2 = document.getElementById('donut-chart2').getContext('2d');
var donut_config = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: province_donut, // Displays Pakistan wide info by default.

            backgroundColor: [
                //'#d56f28',
                '#b74e65',
                '#908834',
                '#c84533',
                '#e8702f',
                '#d7aa00',
                '#7FA62E',
                '#a90022',

            ],
        }],
        labels: province_labels
    },
    options: {
        title: {
            display: true,
            text: 'Province wide Confirmed Cases'
        },
        responsive: true,
        legend: {
            position: 'top',
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
};
var donut_chart2 = new Chart(donut_ctx2, donut_config);



// Confirmed Cases Graph
var ctx1 = document.getElementById('time-series-graph-confirmed-cases').getContext('2d');
var trend_chart_config = {
    type: 'line',
    data: {
        datasets: [{
                label: 'Recovered',
                pointBackgroundColor: '#908834',
                pointBorderColor: '#908834',
                pointRadius: 4,
                fill: false,
                backgroundColor: '#908834',
                borderColor: '#908834',
                //data: trend_data[0],
                data: b[0],
                borderWidth: 3
            },
            {
                label: 'Active',
                pointBackgroundColor: '#b74e65',
                pointBorderColor: '#b74e65',
                pointRadius: 4,
                fill: false,
                backgroundColor: '#b74e65',
                borderColor: '#b74e65',
                data: b[1],
                //data: trend_data[1],
                borderWidth: 3
            },
            {
                label: 'Deceased',
                pointBackgroundColor: '#c84533',
                pointBorderColor: '#c84533',
                pointRadius: 4,
                fill: false,
                backgroundColor: '#c84533',
                borderColor: '#c84533',
                //data: trend_data[2],
                data: b[2],
                borderWidth: 3
            },
            {
                label: 'Confirmed',
                pointBackgroundColor: '#d56f28',
                pointBorderColor: '#d56f28',
                pointRadius: 4,
                fill: false,
                backgroundColor: '#d56f28',
                borderColor: '#d56f28',
                data: b[3],
                borderWidth: 3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: true,
                type: 'time',
                time: {
                    displayFormats: {
                        'millisecond': 'MMM DD',
                        'second': 'MMM DD',
                        'minute': 'MMM DD',
                        'hour': 'MMM DD',
                        'day': 'MMM DD',
                        'week': 'MMM DD',
                        'month': 'MMM DD',
                        'quarter': 'MMM DD',
                        'year': 'MMM DD',
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                },
                ticks: {
                    source: 'data',
                    autoSkip: true,
                    maxTicksLimit: 20
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Number of Cases'
                }
            }]
        }
    }
};
var myChart = new Chart(ctx1, trend_chart_config);

// Prediction Graph
var today = new Date();
var prediction_graph_canvas = document.getElementById('time-series-graph-prediction').getContext('2d');
var prediction_graph_config = {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Prediction of Nationwide Cases',
            pointBackgroundColor: '#c96044',
            pointBorderColor: '#c96044',
            pointRadius: 5,
            fill: false,
            borderColor: '#c96044',
            backgroundColor: '#c96044',
            data: c[1],
            //data: predictions[0],
            borderWidth: 3
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
};
var prediction_graph = new Chart(prediction_graph_canvas, prediction_graph_config);

var prediction_details_canvas = document.getElementById('time-series-prediction-details').getContext('2d');
var prediction_details_config = {
    type: 'line',
    data: {
        datasets: [{
                label: 'Upper Confidence Interval',
                //pointBackgroundColor: '#d7aa00',
                //pointBorderColor: '#d7aa00',
                //pointRadius: 5,
                borderDash: [20, 5],
                borderColor: '#d7aa00',
                backgroundColor: 'rgba(215, 170, 0, 0.5)',
                data: c[2],
                //data: predictions[1],
                fill: '+1',
                borderWidth: 3
            },
            {
                label: 'Prediction of Nationwide Cases',
                pointBackgroundColor: '#c96044',
                pointBorderColor: '#c96044',
                pointRadius: 5,
                borderColor: '#c96044',
                backgroundColor: '#c96044',
                data: c[1],
                fill: false,
                //data: predictions[0],
                borderWidth: 3
            },
            {
                label: 'Lower Confidence Interval',
                //pointBackgroundColor: '#908834',
                //pointBorderColor: '#908834',
                //pointRadius: 4,
                borderDash: [20, 5],
                borderColor: '#d7aa00',
                backgroundColor: 'rgba(215, 170, 0, 0.5)',
                data: c[0],
                fill: '-1',
                //data: predictions[2],
                borderWidth: 3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 0
            }
        },
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
                ticks: {
                    max: 100000,
                    min: 0
                },
                scaleLabel: {
                    display: true,
                    labelString: '# of people'
                }
            }]
        }
    }
};
//var prediction_details = new Chart(prediction_details_canvas, prediction_details_config);


function national_donut_data() {
    data = Object.assign(global_data); //copying global data for safety purposes, can be removed later

    new_data = [];
    confirmed_sum = 0, active_sum = 0, recovered_sum = 0, deceased_sum = 0;

    for (var key in data) {
        if (key === 'Sindh' || key === "Punjab" || key === "AJK" || key === "Balochistan" || key === "GB" || key === "KPTD" || key === "Taftan_mobile_lab" || key === "KP") {
            confirmed_sum += data[key][data[key].length - 1].total_tested_positive;
            active_sum += data[key][data[key].length - 1].total_admitted;
            recovered_sum += data[key][data[key].length - 1].total_discharged;
            deceased_sum += data[key][data[key].length - 1].total_died;
        }
    }
    //new_data.push(confirmed_sum);
    new_data.push(active_sum);
    new_data.push(recovered_sum);
    new_data.push(deceased_sum);

    document.getElementById('total-cases').innerHTML = confirmed_sum;
    document.getElementById('total-recoveries').innerHTML = recovered_sum;
    document.getElementById('total-deaths').innerHTML = deceased_sum;
    total_infected.textContent = confirmed_sum + " people have been infected in Pakistan till now.";
    most_infected_city.textContent = "Lahore is the city with the most number of new cases.";

    return new_data
}

function province_donut_data() {
    data = Object.assign(global_data);
    var kpk = 0;
    var new_data = [],
        labels = [];

    for (var key in data) {
        if (key == 'KP' || key == 'KPTD') {
            kpk += data[key][data[key].length - 1].total_tested_positive;
            if (key == 'KPTD') {
                new_data.push(kpk);
                labels.push('KP');
            }
        } else if (key === 'Sindh' || key === "Punjab" || key === "AJK" || key === "Balochistan" || key === "GB") {
            new_data.push(parseInt(data[key][data[key].length - 1].total_tested_positive));
            labels.push(key);
        }

    }
    //console.log(new_data)
    //console.log(labels)
    province_labels = labels;
    return new_data
}

function national_timeSeries_data() {
    data = Object.assign(global_data); //copying global data for safety purposes, can be removed later

    new_data = [
        [],
        [],
        [],
        []
    ];
    confirmed_sum = 0, active_sum = 0, recovered_sum = 0, deceased_sum = 0;

    for (var key in data) {
        if (key === 'Sindh' || key === "Punjab" || key === "AJK" || key === "Balochistan" || key === "GB" || key === "KPTD" || key === "Taftan_mobile_lab" || key === "KP") {
            for (var i = 0; i < data[key].length; i++) {
                d = new Date(data[key][i].date)
                d_month = d.getMonth();
                if (month_list.indexOf(d_month) < 0) {
                    month_list.push(d_month);
                }
                if (new_data[0].length !== 0 && new_data[0][i] !== undefined) {
                    if (new_data[0][i].x.getTime() === d.getTime()) {
                        new_data[0][i].y += data[key][i].total_discharged;
                        new_data[1][i].y += data[key][i].total_admitted;
                        new_data[2][i].y += data[key][i].total_died;
                        new_data[3][i].y += data[key][i].total_tested_positive;
                    }
                } else {
                    new_data[0].push({ x: new Date(data[key][i].date), y: data[key][i].total_discharged })
                    new_data[1].push({ x: new Date(data[key][i].date), y: data[key][i].total_admitted })
                    new_data[2].push({ x: new Date(data[key][i].date), y: data[key][i].total_died })
                    new_data[3].push({ x: new Date(data[key][i].date), y: data[key][i].total_tested_positive })

                }
            }
        }
    }
    return new_data
}

function monthly_data(data) {
	//console.log(data);
    var month_data = [];
    var i = 0;
    while (month_data[i] === undefined && i <= month_list[month_list.length - 1]) {
        month_data.push([
            [],
            [],
            [],
            []
        ])
        i++;
    }
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            var temp = data[i][j].x.getMonth();
            month_data[temp][i].push(data[i][j])
        }
    }
    //console.log(month_data)
    return month_data;
}

/*function current_month_data(data, month) {
    var current_data = monthly_data(data)[month];
    return current_data;
}*/

function weekly_data(data, type) {
	var new_data = [[], [], [], []];
    var week_count = 0;
    var temp = [];
	console.log(type)
    if (type === 'national'){
		for (var i = 0; i < new_data.length; i++) {
			week_count = 0;
			for (var j = 0; j < data[i].length; j++) {
				if (j === 0) {
					temp.push(data[i][j])
				} else if ((j % 7) === 0) {
					new_data[i][week_count] = temp;
					temp = [];
					week_count++;
					temp.push(data[i][j])
				} else {
					temp.push(data[i][j])
				}
			}
			if (temp.length !== 0) {
				new_data[i][week_count] = temp;
				temp = []
			}
		}
    }
	else if (type === 'province'){
		for (var i = 0; i < new_data.length; i++) {
			week_count = 0;
			for (var j = 0; j < data.length; j++) {
				if (j === 0) {
					if (i === 0) temp.push({ x: new Date(data[j].date), y: data[j].total_discharged })
					if (i === 1) temp.push({ x: new Date(data[j].date), y: data[j].total_admitted })
					if (i === 2) temp.push({ x: new Date(data[j].date), y: data[j].total_died })
					if (i === 3) temp.push({ x: new Date(data[j].date), y: data[j].total_tested_positive })
					//temp.push(data[j])
				} else if ((j % 7) === 0) {
					new_data[i][week_count] = temp;
					temp = [];
					week_count++;
					if (i === 0) temp.push({ x: new Date(data[j].date), y: data[j].total_discharged })
					if (i === 1) temp.push({ x: new Date(data[j].date), y: data[j].total_admitted })
					if (i === 2) temp.push({ x: new Date(data[j].date), y: data[j].total_died })
					if (i === 3) temp.push({ x: new Date(data[j].date), y: data[j].total_tested_positive })
					//temp.push(data[j])
				} else {
					if (i === 0) temp.push({ x: new Date(data[j].date), y: data[j].total_discharged })
					if (i === 1) temp.push({ x: new Date(data[j].date), y: data[j].total_admitted })
					if (i === 2) temp.push({ x: new Date(data[j].date), y: data[j].total_died })
					if (i === 3) temp.push({ x: new Date(data[j].date), y: data[j].total_tested_positive })
					//temp.push(data[j])
				}
			}
			if (temp.length !== 0) {
				new_data[i][week_count] = temp;
				temp = []
			}
		}
	}
	
	return new_data;
}

function prediction_data() {
    data = global_data.Predictions;
    new_data = [
        [],
        [],
        []
    ];
    for (var i = 0; i < data.length; i++) {
        new_data[0].push({ x: new Date(data[i].date), y: Math.round(data[i].Lower_confidence_interval) })
        new_data[1].push({ x: new Date(data[i].date), y: Math.round(data[i].Predictions) })
        new_data[2].push({ x: new Date(data[i].date), y: Math.round(data[i].Upper_confidence_interval) })
    }
    return new_data;

}

function clear_tooltip(e) {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = 'none';
}

function update_provinceMonth(province, province_data) {
    var month_data = [];
    var i = 0;
    while (month_data[i] === undefined && i <= month_list[month_list.length - 1]) {
        month_data.push([])
        i++;
    }
    //console.log(month_data)
    //console.log(province_data[0])
    for (var i = 0; i < province_data.length; i++) {
        var date = new Date(province_data[i].date);
        var temp = date.getMonth();
        month_data[temp].push(province_data[i])
    }

    //console.log(month_data)
    d = month_data
    copy_d = JSON.parse(JSON.stringify(month_data));
    copy_b = JSON.parse(JSON.stringify(month_data));
    currently_selected = province;
    return month_data;
}

function popup(e) {
    //trend_slider.value = "0";
    trend_slider.value = trend_slider.max;
    //console.log(trend_slider.value)

    var province_data;

    if (e.target.id == 'PK-KP') {
        if (last_selected_zone == 'PK-TA') {
            last_selected_zone = 'PK-KP';
        }
    } else if (e.target.id == 'PK-TA') {
        if (last_selected_zone == 'PK-KP') {
            last_selected_zone = 'PK-TA';
        }
    }

    if (last_selected_zone == e.target.id) {
        //console.log("Deselecting " + last_selected_zone);
        reset_to_default();
    } else {

        last_selected_zone = e.target.id;
        if (e.target.id === "PK-PB") {
            //province = "Punjab";
            province_data = global_data.Punjab;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Punjab till now.";
            most_infected_city.innerHTML = province_data[province_data.length - 1].most_infected_city + " is the city with the most number of new cases.";
            center_list.style.listStyleType = 'disc';
            center_list.innerHTML = '';
            var i;
            for (i = 0; i < hospital_links[hospital_zones.PB].length; i++) {
                center_list.appendChild(hospital_links[hospital_zones.PB][i]);
            }
			
			weekly_data_list = weekly_data(province_data, 'province')
			var updated_data = []
			for (var i = 0; i < weekly_data_list.length; i++) {
				updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1])
			}
			
            update_donutData(donut_chart, province_data);
            updateData(myChart, updated_data, 'time series')
			//console.log(weekly_data_list)
			
        } else if (e.target.id === "PK-SD") {
            //province = "Sindh";
            province_data = global_data.Sindh;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Sindh till now.";
            most_infected_city.innerHTML = province_data[province_data.length - 1].most_infected_city + " is the city with the most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_list.innerHTML = '';
            var i;
            for (i = 0; i < hospital_links[hospital_zones.SD].length; i++) {
                center_list.appendChild(hospital_links[hospital_zones.SD][i]);
            }

			weekly_data_list = weekly_data(province_data, 'province')
			var updated_data = []
			for (var i = 0; i < weekly_data_list.length; i++) {
				updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1])
			}
			
            update_donutData(donut_chart, province_data);
            updateData(myChart, updated_data, 'time series')
			
        } else if (e.target.id === "PK-KP" || e.target.id == "PK-TA") {
            new_data = [
                [],
                [],
                [],
                []
            ];
            //province = "Khyber Pakhtunkhwa";
            province_data = global_data.KP;
            province_data2 = global_data.KPTD;
            for (var key in province_data) {
                for (var i = 0; i < province_data[key].length; i++) {
                    d = new Date(province_data[key][i].date)
                    if (province_data[0][i].x.getTime() === d.getTime()) {
                        province_data[0][i].y += province_data2[key][i].total_discharged;
                        province_data[1][i].y += province_data2[key][i].total_admitted;
                        province_data[2][i].y += province_data2[key][i].total_died;
                        province_data[3][i].y += province_data2[key][i].total_tested_positive;
                    }
                }
            }
            //console.log(province_data)
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in KPK till now.";
            most_infected_city.innerHTML = province_data[province_data.length - 1].most_infected_city + " is the city with the most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_list.innerHTML = '';
            var i;
            for (i = 0; i < hospital_links[hospital_zones.KP].length; i++) {
                center_list.appendChild(hospital_links[hospital_zones.KP][i]);
            }
			weekly_data_list = weekly_data(province_data, 'province')
			var updated_data = []
			for (var i = 0; i < weekly_data_list.length; i++) {
				updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1])
			}
			
            update_donutData(donut_chart, province_data);
            updateData(myChart, updated_data, 'time series')
			
        } else if (e.target.id === "PK-AK") {
            //province = "Azad Kashmir";
            province_data = global_data.AJK;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Azad Kashmir till now.";
            most_infected_city.innerHTML = province_data[province_data.length - 1].most_infected_city + " is the city with the most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_list.innerHTML = '';
            var i;
            for (i = 0; i < hospital_links[hospital_zones.AK].length; i++) {
                center_list.appendChild(hospital_links[hospital_zones.AK][i]);
            }

			weekly_data_list = weekly_data(province_data, 'province')
			var updated_data = []
			for (var i = 0; i < weekly_data_list.length; i++) {
				updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1])
			}
			
            update_donutData(donut_chart, province_data);
            updateData(myChart, updated_data, 'time series')
			
        } else if (e.target.id === "PK-IS") {
            //province = "Islamabad";
            province_data = global_data.ICT;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Islamabad till now.";
            most_infected_city.innerHTML = province_data[province_data.length - 1].most_infected_city + " is the city with the most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_list.innerHTML = '';
            var i;
            for (i = 0; i < hospital_links[hospital_zones.IS].length; i++) {
                center_list.appendChild(hospital_links[hospital_zones.IS][i]);
            }

            weekly_data_list = weekly_data(province_data, 'province')
			var updated_data = []
			for (var i = 0; i < weekly_data_list.length; i++) {
				updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1])
			}
			
            update_donutData(donut_chart, province_data);
            updateData(myChart, updated_data, 'time series')
			
        } else if (e.target.id === "PK-GB") {
            //province = "Gilgit-Baltistan";
            province_data = global_data.GB;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Gilgit-Baltistan till now.";
            most_infected_city.innerHTML = province_data[province_data.length - 1].most_infected_city + " is the city with the most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_list.innerHTML = '';
            var i;
            for (i = 0; i < hospital_links[hospital_zones.GB].length; i++) {
                center_list.appendChild(hospital_links[hospital_zones.GB][i]);
            }

            weekly_data_list = weekly_data(province_data, 'province')
			var updated_data = []
			for (var i = 0; i < weekly_data_list.length; i++) {
				updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1])
			}
			
            update_donutData(donut_chart, province_data);
            updateData(myChart, updated_data, 'time series')
			
        } else if (e.target.id === "PK-BA") {
            //province = "Balochistan";
            province_data = global_data.Balochistan;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Balochistan till now.";
            most_infected_city.innerHTML = province_data[province_data.length - 1].most_infected_city + " is the city with the most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_list.innerHTML = '';
            var i;
            for (i = 0; i < hospital_links[hospital_zones.BA].length; i++) {
                center_list.appendChild(hospital_links[hospital_zones.BA][i]);
            }

            weekly_data_list = weekly_data(province_data, 'province')
			var updated_data = []
			for (var i = 0; i < weekly_data_list.length; i++) {
				updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1])
			}
			
            update_donutData(donut_chart, province_data);
            updateData(myChart, updated_data, 'time series')
			
        }
        if (province_data[province_data.length - 1].most_infected_city === "None") {
            most_infected_city.textContent = "";
            most_infected_city.style.display = "none";
        } else {
            most_infected_city.style.display = "block";
        }

        //console.log("Clicked! X: "+e.pageX+" Y: "+e.pageY);

        var selected_province = document.getElementById(e.target.id);

        var x;
        for (x of all_provinces) {
            x.style.fill = '#000000';
        }

        document.getElementById('PK-IS').style.fill = '#d4d4d4';
        document.getElementById('PK-AK').style.fill = '#585858';


        if (selected_province.id == 'PK-KP' || selected_province.id == 'PK-TA') {
            document.getElementById('PK-KP').style.fill = '#e48438';
            document.getElementById('PK-TA').style.fill = '#e48438';
        } else {
            selected_province.style.fill = '#e48438';
        }
    }
};

var tips = [
    "Tip: Click on a province to populate the page with its info.",
    "Tip: Scroll down to take a look at the trends.",
    "Tip: Contact on one of the helplines given below, in case of emergency."
];

function update_tip_text() {
    var tip_text = document.getElementById('tip-text');
    if (tip_text.textContent == tips[0]) {
        tip_text.textContent = tips[1]
    } else if (tip_text.textContent == tips[1]) {
        tip_text.textContent = tips[2]
    } else if (tip_text.textContent == tips[2]) {
        tip_text.textContent = tips[0]
    }
    tip_text.style.fontStyle = 'italic';
}

function update_timeSeries(chart, data) {
    new_data = [
        [],
        [],
        [],
        []
    ]
	//console.log(data)
	for (var a = 0; a < data.length; a++){
		for (var i = 0; i < data[a].length; i++) {
			new_data[0].push({ x: new Date(data[a][i].date), y: data[a][i].total_discharged })
			new_data[1].push({ x: new Date(data[a][i].date), y: data[a][i].total_admitted })
			new_data[2].push({ x: new Date(data[a][i].date), y: data[a][i].total_died })
			new_data[3].push({ x: new Date(data[a][i].date), y: data[a][i].total_tested_positive })
		}
		break;
	}
	//console.log(new_data)
    /*for (var i = 0; i < data.length; i++) {
        new_data[0].push({ x: new Date(data[i].date), y: data[i].total_discharged })
        new_data[1].push({ x: new Date(data[i].date), y: data[i].total_admitted })
        new_data[2].push({ x: new Date(data[i].date), y: data[i].total_died })
        new_data[3].push({ x: new Date(data[i].date), y: data[i].total_tested_positive })
    }*/
    chart.data.datasets[0].data = new_data[0];
    chart.data.datasets[1].data = new_data[1];
    chart.data.datasets[2].data = new_data[2];
    chart.data.datasets[3].data = new_data[3];
    chart.clear()
    chart.update();
}

function update_donutData(chart, data) {
    //console.log("Updating donut chart")
    //console.log(data)
    new_data = [];
    //new_data.push(data[data.length - 1].total_tested_positive);
    new_data.push(data[data.length - 1].total_admitted);
    new_data.push(data[data.length - 1].total_discharged);
    new_data.push(data[data.length - 1].total_died);
    chart.data.datasets[0].data = new_data;
    chart.update();
}

function updateData(chart, data, type) {
	console.log(data)
    //console.log("Updating chart")
    if (type === 'donut') {
        chart.data.datasets[0].data = data;
    } else if (type === 'time series') {
        chart.data.datasets[0].data = data[0];
        chart.data.datasets[1].data = data[1];
        chart.data.datasets[2].data = data[2];
        chart.data.datasets[3].data = data[3];
    }
	//console.log(data)
    //chart.clear();
    chart.update();
}

function reset_to_default() {
    //console.log("resetting...")

    total_infected.textContent = a[0] + " people have been infected in Pakistan till now.";

    most_infected_city.innerHTML = "Lahore is the city with the most number of new cases.";

    center_list.style.listStyleType = 'none';
    center_list.innerHTML = '';
    
	
	weekly_data_list = weekly_data(n, 'national');
	var updated_data = []
	for (var i = 0; i < weekly_data_list.length; i++) {
		updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1])
	}

    updateData(donut_chart, a, 'donut');
    updateData(myChart, updated_data, 'time series');
    /*slider_data[0] = myChart.data.datasets[0].data
    slider_data[1] = myChart.data.datasets[1].data
    slider_data[2] = myChart.data.datasets[2].data
    slider_data[3] = myChart.data.datasets[3].data
    copy_b = JSON.parse(JSON.stringify(slider_data));*/

    var x;
    for (x of all_provinces) {
        x.style.fill = '#000000';
    }

    document.getElementById('PK-IS').style.fill = '#d4d4d4';
    document.getElementById('PK-AK').style.fill = '#585858';

    last_selected_zone = "PK";
    //console.log("Reset complete");
}

function highlight(e) {
    if (e.target.id == 'PK-TA' || e.target.id == 'PK-KP') {
        document.getElementById('PK-KP').style.fill = '#e48438';
        document.getElementById('PK-TA').style.fill = '#e48438';
    } else {
        document.getElementById(e.target.id).style.fill = '#e48438';
    }
}

function highlight_release(e) {
    if (e.target.id == 'PK-KP') {
        if (last_selected_zone == 'PK-TA') {
            last_selected_zone = 'PK-KP';
        }
    } else if (e.target.id == 'PK-TA') {
        if (last_selected_zone == 'PK-KP') {
            last_selected_zone = 'PK-TA';
        }
    }

    if (e.target.id !== last_selected_zone) {
        if (e.target.id == 'PK-KP' || e.target.id == 'PK-TA') {
            document.getElementById('PK-KP').style.fill = '#000000';
            document.getElementById('PK-TA').style.fill = '#000000';
        } else if (e.target.id == 'PK-IS') {
            document.getElementById('PK-IS').style.fill = '#d4d4d4';
        } else if (e.target.id == 'PK-AK') {
            document.getElementById('PK-AK').style.fill = '#585858';
        } else {
            document.getElementById(e.target.id).style.fill = '#000000';
        }
    }
}

function expand_buttons(e) {
    //console.log("EXPAND BUTTONS CALLED");
    //console.log(e.target.id);
    //console.log(data);
    selected_expansion_button = document.getElementById(e.target.id);

    var emergency_content = document.getElementById("emergency_content");
    var symptoms_content = document.getElementById("symptoms_content");
    var precautions_content = document.getElementById("precautions_content");


    if (e.target.id === "emergency") {
        if (symptoms_content.style.display !== "none") {
            symptoms_content.style.display = "none"
        }
        if (precautions_content.style.display !== "none") {
            precautions_content.style.display = "none"
        }
        emergency_content.style.display = "block";
    } else if (e.target.id === "symptoms") {
        if (emergency_content.style.display !== "none") {
            emergency_content.style.display = "none"
        }
        if (precautions_content.style.display !== "none") {
            precautions_content.style.display = "none"
        }
        symptoms_content.style.display = "block"
    } else if (e.target.id === "precautions") {
        if (emergency_content.style.display !== "none") {
            emergency_content.style.display = "none"
        }
        if (symptoms_content.style.display !== "none") {
            symptoms_content.style.display = "none"
        }
        precautions_content.style.display = "block"
    }
}
var emergency = document.getElementById("emergency_content");
emergency.style.display = "block";
center_list.style.listStyleType = 'none';
center_1.textContent = "";
center_2.textContent = "";
center_3.textContent = "";


setInterval(update_tip_text, 5000);

function startIntro() {
    var intro = introJs();
    intro.setOptions({
        steps: [{
                element: '#navbar',
                intro: "Welcome to Pakistan COVID-19 Resource Center. Click on Next to start the tutorial."
            },
            {
                element: '#navbar',
                intro: "The dashboard is divided into 3 sections."
            },
            {
                element: '#map',
                intro: "This is the map. You can click on any province to see its data.",
                position: 'right'
            },
            {
                element: '#stat-section',
                intro: 'This is the general statistics section. When you click on a province on the map, the data will be shown here.',
                position: 'left'
            },
            {
                element: '#donut',
                intro: "This doughnut chart shows current numbers for confirmed, active, recorvered, and deceased cases. Hover over any colored segment to see the exact number of cases.",
                position: 'left'
            },
            {
                element: '#donut',
                intro: 'You can also click on any of the names to remove them from the chart. Try clicking on Confirmed Cases to remove it. You can always click on them again to bring them back!',
                position: 'left'
            },
            {
                element: '#info-sec',
                intro: 'This section has contact information for different hospitals/health centers in the province you selected.',
                position: 'right'
            },
            {
                element: '#info-sec-buttons',
                intro: 'In addition to contact info, you can use these buttons to view the precautions and symtoms of COVID-19 as well.',
                position: 'right'
            },
            {
                element: '#trend-section',
                intro: 'This is where you can see the trends for each type of case as well a prediction for the next two weeks!',
                position: 'top'
            },
            {
                element: '#trend-graph',
                intro: 'This graph shows the trends for the same cases as the doughnut chart. Just like the doughnut chart, you can click on any of the names to remove them from the graph. Click on them again to get them back!',
                position: 'top'
            },
            {
                element: '#trend_slider',
                intro: 'Use this slider to set how far back you want to see the trends from! You can go as far back as the beginning of the pandemic.',
                position: 'top'
            },
            {
                element: '#prediction-graph',
                intro: 'This graph shows a prediction for the number of cases for the next 14 days. Keep in mind that this is only a prediction.',
                position: 'top'
            },
            {
                element: '#feedback-button',
                intro: 'You can give feedback about this dashboard by clicking here.',
                position: 'bottom'
            },
            {
                element: '#tutorial-button',
                intro: 'Click here to start the tutorial again at any time!',
                position: 'bottom'
            },
            {
                element: '#navbar',
                intro: 'And that is all you need to know to use this dashboard. Stay safe, stay indoors! Click on Done to finish the tutorial.',
                position: 'bottom'
            }
        ]
    });
    intro.setOption('showProgress', true);
    intro.start();
}

var slider_data = [
    [],
    [],
    [],
    []
]
slider_data[0] = myChart.data.datasets[0].data
slider_data[1] = myChart.data.datasets[1].data
slider_data[2] = myChart.data.datasets[2].data
slider_data[3] = myChart.data.datasets[3].data

var copy_b = JSON.parse(JSON.stringify(slider_data));

trend_slider.max = weekly_data_list[0].length - 1;

trend_slider.oninput = function() {
	var val = parseInt(this.value);
    var updated_data = []
	//console.log(weekly_data_list)
    for (var i = 0; i < weekly_data_list.length; i++) {
        updated_data.push(weekly_data_list[i][val])
    }
	console.log(updated_data)
	updateData(myChart, updated_data, 'time series')
}

/*week_slider.max = weekly_data_list.length;
week_slider.value = week_slider.max;
console.log(week_slider.value)
var prev_val2;

week_slider.oninput = function() {
    var val = parseInt(this.value);
    //var idx = val;
    //console.log(b)

    //console.log(weekly_data_list)
    var updated_data = []
    for (var i = 0; i < weekly_data_list.length; i++) {
        updated_data.push(weekly_data_list[i][val])
    }
    updateData(myChart, updated_data, 'time series')

    //prev_val2 = val;
}*/

function updated_time() {
    var current = new Date(2020, 1, 1);
    for (var key in global_data) {
        for (var i = 0; i < global_data[key].length; i++) {
            d = new Date(global_data[key][i].datetime_of_entry)
            if (d > current) {
                current = d;
            }
        }
    }
    update_text.textContent = "Last updated on: " + current.getDate() + "/" + (current.getMonth() + 1) + "/" + current.getFullYear();
}

function showGraph() {
    var prediction_details = new Chart(prediction_details_canvas, prediction_details_config);
    if (document.getElementById('time-series-prediction-details').style.visibility === "hidden") {
        document.getElementById('time-series-prediction-details').style.visibility = "visible";
    } else if (document.getElementById('time-series-prediction-details').style.visibility === "visible") {
        prediction_details.destroy()
        document.getElementById('time-series-prediction-details').style.visibility = "hidden";
    }

}


$('#prediction-details').on('hidden.bs.collapse', function() {
    $('#viewmore-button').text('View More Details');
    showGraph()
});
$('#prediction-details').on('shown.bs.collapse', function() {
    $('#viewmore-button').text('View Less Details');
    showGraph()
});

$('#tutorial_modal').modal();