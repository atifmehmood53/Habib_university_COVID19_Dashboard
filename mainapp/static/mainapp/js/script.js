var zone_wise_donut_data = [
// [Confirmed, Active, Recovered, Deceased]
    [4322, 3687, 572, 63],  // Pakistan
    [28, 27, 1, 0],         // AK
    [212, 134, 76, 2],      // Balochistan
    [213, 114, 96, 3],      // GB
    [102, 91, 10, 1],       // Islamabad
    [560, 466, 74, 20],     // KPK
    [2171, 2119, 35, 17],   // Punjab
    [1036, 736, 280, 20]    // Sindh
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
var a = national_donut_data()
var b = national_timeSeries_data()
var c = prediction_data()
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
                '#d56f28',
                '#b74e65',
                '#908834',
                '#c84533'
            ],
        }],
        labels: ['Confirmed Cases', 'Active Cases', 'Recovered', 'Deceased']
    },
    options:{
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


// Confirmed Cases Graph
var ctx1 = document.getElementById('time-series-graph-confirmed-cases').getContext('2d');
var trend_data = [
    [
        {x: new Date(2019, 11, 25), y: 2}, 
        {x: new Date(2020, 0, 25), y: 3}, 
        {x: new Date(2020, 1, 25), y: 6}, 
        {x: new Date(2020, 2, 25), y: 10}, 
        {x: new Date(), y: 12}
    ], // Recovered
    [
        {x: new Date(2019, 11, 25), y: 2},
        {x: new Date(2020, 0, 25), y: 5},
        {x: new Date(2020, 1, 25), y: 10},
        {x: new Date(2020, 2, 25), y: 25},
        {x: new Date(), y: 50}
    ], // Active
    [
        {x: new Date(2019, 11, 25), y: 2},
        {x: new Date(2020, 0, 25), y: 10},
        {x: new Date(2020, 1, 25), y: 50},
        {x: new Date(2020, 2, 25), y: 55},
        {x: new Date(), y: 60}
    ], // Deceased
    [
        {x: new Date(2019, 11, 25), y: 20},
        {x: new Date(2020, 0, 25), y: 50},
        {x: new Date(2020, 1, 25), y: 249},
        {x: new Date(2020, 2, 25), y: 500},
        {x: new Date(), y: 2650}
    ]   // Confirmed
];

var predictions = [
    [	//Prediction
        {x: new Date(2020, 5, 5), y: 21443.5505530686}, 
        {x: new Date(2020, 5, 6), y: 22744.4077759938}, 
        {x: new Date(2020, 5, 7), y: 24124.1805455889}, 
        {x: new Date(2020, 5, 8), y: 25587.6562154514}, 
        {x: new Date(2020, 5, 9), y: 27139.912560464}, 
        {x: new Date(2020, 5, 10), y: 28786.3353949879}, 
        {x: new Date(2020, 5, 11), y: 30532.6372598514}, 
        {x: new Date(2020, 5, 12), y: 32384.8772429708}, 
        {x: new Date(2020, 5, 13), y: 34349.4820023742}, 
        {x: new Date(2020, 5, 14), y: 36433.2680645726}, 
        {x: new Date(2020, 5, 15), y: 38643.465475644}, 
        {x: new Date(2020, 5, 16), y: 40987.7428870945}, 
        {x: new Date(2020, 5, 17), y: 43474.2341635334}, 
        {x: new Date(2020, 5, 18), y: 46111.5666044842}
    ], 
    [	//Upper Confidence Interval
        {x: new Date(2020, 5, 5), y: 29151.3111168548}, 
        {x: new Date(2020, 5, 6), y: 37234.2324940612}, 
        {x: new Date(2020, 5, 7), y: 46788.6236857732}, 
        {x: new Date(2020, 5, 8), y: 61184.9199870077}, 
        {x: new Date(2020, 5, 9), y: 82409.3170801257}, 
        {x: new Date(2020, 5, 10), y: 106359.112812027}, 
        {x: new Date(2020, 5, 11), y: 149464.957484317}, 
        {x: new Date(2020, 5, 12), y: 214271.301567264}, 
        {x: new Date(2020, 5, 13), y: 298545.13952532}, 
        {x: new Date(2020, 5, 14), y: 433862.800876074}, 
        {x: new Date(2020, 5, 15), y: 617403.034420462}, 
        {x: new Date(2020, 5, 16), y: 888553.408105456}, 
        {x: new Date(2020, 5, 17), y: 1321668.28696126}, 
        {x: new Date(2020, 5, 18), y: 1980675.13717109}
    ], 
    [	//Lower confidence interval
        {x: new Date(2020, 5, 5), y: 13307.1208858524}, 
        {x: new Date(2020, 5, 6), y: 11004.6147492879}, 
        {x: new Date(2020, 5, 7), y: 8597.57697032841}, 
        {x: new Date(2020, 5, 8), y: 6865.77380919728}, 
        {x: new Date(2020, 5, 9), y: 5291.93838440162}, 
        {x: new Date(2020, 5, 10), y: 3821.78207110513}, 
        {x: new Date(2020, 5, 11), y: 2711.20968701526}, 
        {x: new Date(2020, 5, 12), y: 1951.33814649287}, 
        {x: new Date(2020, 5, 13), y: 1289.07103456547}, 
        {x: new Date(2020, 5, 14), y: 828.875236721941}, 
        {x: new Date(2020, 5, 15), y: 552.002828714799}, 
        {x: new Date(2020, 5, 16), y: 362.027109888008}, 
        {x: new Date(2020, 5, 17), y: 220.988398290525}, 
        {x: new Date(2020, 5, 18), y: 143.570015272812}
    ]
];
var trend_chart_config = {
    type: 'line',
    data: {
        datasets: [{
                label: 'Recovered Cases',
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
                label: 'Active Cases',
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
                label: 'Deceased Cases',
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
            label: 'Confirmed Cases',
            pointBackgroundColor: '#d56f28',
            pointBorderColor: '#d56f28',
            pointRadius: 4,
            fill: false,
            backgroundColor: '#d56f28',
            borderColor: '#d56f28',
            data: b[3],
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
				time:{
					displayFormats: {
						day: 'MMM D'
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
    type: 'line',
    data: {
        datasets: [{
                label: 'Upper Confidence Interval',
                pointBackgroundColor: '#b74e65',
				pointBorderColor: '#b74e65',
				pointRadius: 5,
				fill: false,
				borderColor: '#b74e65',
				backgroundColor: '#b74e65',
				//data: c[2],
				data: predictions[1],
				borderWidth: 3
            },  
			{
				label: 'Prediction of Nationwide Cases',
				pointBackgroundColor: '#c96044',
				pointBorderColor: '#c96044',
				pointRadius: 5,
				fill: false,
				borderColor: '#c96044',
				backgroundColor: '#c96044',
				//data: c[1],
				data: predictions[0],
				borderWidth: 3
			},
			{
				label: 'Lower Confidence Interval',
				pointBackgroundColor: '#908834',
                pointBorderColor: '#908834',
                pointRadius: 4,
                fill: false,
				borderColor: '#908834',
                backgroundColor: '#908834',
                //data: c[0],
                data: predictions[2],
				borderWidth: 3
			}
		]
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

function national_donut_data(){
	data = Object.assign(global_data); //copying global data for safety purposes, can be removed later
	
	new_data = [];
	confirmed_sum = 0, active_sum = 0, recovered_sum = 0, deceased_sum = 0;
	
	for (var key in data){
		if (key === 'Sindh' || key === "Punjab" || key === "AJK" || key === "Balochistan" || key === "GB" || key === "KPTD" || key === "Taftan_mobile_lab" || key === "KP"){
			confirmed_sum += data[key][data[key].length - 1].total_tested_positive;
			active_sum += data[key][data[key].length - 1].total_admitted;
			recovered_sum += data[key][data[key].length - 1].total_discharged;
			deceased_sum += data[key][data[key].length - 1].total_died;
		}
	}
	new_data.push(confirmed_sum);
	new_data.push(active_sum);
	new_data.push(recovered_sum);
	new_data.push(deceased_sum);
	
	document.getElementById('total-cases').innerHTML = confirmed_sum;
	document.getElementById('total-recoveries').innerHTML = recovered_sum;
	document.getElementById('total-deaths').innerHTML = deceased_sum;
	total_infected.textContent = new_data[0] + " people have been infected in Pakistan till now.";
    most_infected_city.textContent = "Lahore is the city with most number of new cases.";
	
	return new_data
}

function national_timeSeries_data(){
	data = Object.assign(global_data); //copying global data for safety purposes, can be removed later
	
	new_data = [[], [], [], []];
	confirmed_sum = 0, active_sum = 0, recovered_sum = 0, deceased_sum = 0;
	
	for (var key in data){
		if (key === 'Sindh' || key === "Punjab" || key === "AJK" || key === "Balochistan" || key === "GB" || key === "KPTD" || key === "Taftan_mobile_lab" || key === "KP"){
			for (var i = 0; i < data[key].length; i++){
				d = new Date(data[key][i].date)
				if (new_data[0].length !== 0 && new_data[0][i] !== undefined){
					if (new_data[0][i].x.getTime() === d.getTime()){
						new_data[0][i].y += data[key][i].total_discharged;
						new_data[1][i].y += data[key][i].total_admitted;
						new_data[2][i].y += data[key][i].total_died;
						new_data[3][i].y += data[key][i].total_tested_positive;
					}
				}
				else{
					new_data[0].push({x: new Date(data[key][i].date), y: data[key][i].total_discharged})
					new_data[1].push({x: new Date(data[key][i].date), y: data[key][i].total_admitted})
					new_data[2].push({x: new Date(data[key][i].date), y: data[key][i].total_died})
					new_data[3].push({x: new Date(data[key][i].date), y: data[key][i].total_tested_positive})
					
				}
			}
		}
	}
	return new_data
}

function prediction_data(){
	data = global_data.Predictions;
	new_data = [[], [], []];
	for (var i = 0; i < data.length; i++){
		new_data[0].push({x: new Date(data[i].date), y: data[i].Lower_confidence_interval})
		new_data[1].push({x: new Date(data[i].date), y: data[i].Predictions})
		new_data[2].push({x: new Date(data[i].date), y: data[i].Upper_confidence_interval})
	}
	return new_data;
	
}

function clear_tooltip(e) {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = 'none';
}


function popup(e) {
    trend_slider.value = "0";

	//var tooltip = document.getElementById("tooltip");
    var province;
	var province_data;
    
    //console.log(last_selected_zone)

	/* if (tooltip.style.display == "block") {
		tooltip.style.display = "none"
	} */
	
    //tooltip.style.display = "block";
    if (e.target.id == 'PK-KP') {
        if (last_selected_zone == 'PK-TA') {
            last_selected_zone = 'PK-KP';
        }
    }

    else if (e.target.id == 'PK-TA') {
        if (last_selected_zone == 'PK-KP') {
            last_selected_zone = 'PK-TA';
        }
    }
    
    if (last_selected_zone == e.target.id) {
        //console.log("Deselecting " + last_selected_zone);
        reset_to_default();
    }

    else {

        last_selected_zone = e.target.id;
        if (e.target.id === "PK-PB") {
            province = "Punjab";
			province_data = global_data.Punjab;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Punjab till now.";
            most_infected_city.textContent = province_data[province_data.length - 1].most_infected_city + " is the city with most number of new cases.";
            center_list.style.listStyleType = 'disc';
            center_1.textContent = "Benazir Bhutto Hospital, Rawalpindi [(051) 9290301]";
            center_2.textContent = "Services Hospital, Lahore [(042) 99203402]";
            center_3.textContent = "Allied Teaching Hospital, Faisalabad [(041) 9210082]";
			
			update_donutData(donut_chart, province_data);
			update_timeSeries(myChart, province_data);
        }
        
        else if (e.target.id === "PK-SD") {
            province = "Sindh";
			province_data = global_data.Sindh;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Sindh till now.";
            most_infected_city.textContent = province_data[province_data.length - 1].most_infected_city + " is the city with most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_1.textContent = "Aga Khan University Hospital, Karachi [021-111-911-911]";
            center_2.textContent = "LUMHS hospital, Hyderabad [+92 322 9213305]";
            center_3.textContent = "Jinnah Postgraduate Medical Centre, Karachi";
			
			update_donutData(donut_chart, province_data);
			update_timeSeries(myChart, province_data);
            //updateData(donut_chart, zone_wise_donut_data[zones.SD]);
        }
        
        /* else if (e.target.id === "PK-TA") {
            province = "Tribal Areas";
            total_infected.textContent = "750 people have been infected in Tribal Areas till now.";
            most_infected_city.textContent = "Parachinar has the most number of cases.";
            center_list.style.listStyleType = 'none';
            center_1.textContent = "";
            center_2.textContent = "";
            center_3.textContent = "";
        } */
        
        else if (e.target.id === "PK-KP" || e.target.id == "PK-TA") {
			new_data = [[], [], [], []];
            province = "Khyber Pakhtunkhwa";
			province_data = global_data.KP;
			province_data2 = global_data.KPTD;
			for (var key in province_data){
				for (var i = 0; i < province_data[key].length; i++){
					d = new Date(province_data[key][i].date)
					if (province_data[0][i].x.getTime() === d.getTime()){
						province_data[0][i].y += province_data2[key][i].total_discharged;
						province_data[1][i].y += province_data2[key][i].total_admitted;
						province_data[2][i].y += province_data2[key][i].total_died;
						province_data[3][i].y += province_data2[key][i].total_tested_positive;
					}
				}
			}
			//console.log(province_data)
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in KPK till now.";
            most_infected_city.textContent = province_data[province_data.length - 1].most_infected_city + " is the city with most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_1.textContent = "Bacha Khan Medical Complex, Swabi [(0938) 280214]";
            center_2.textContent = "Ayub Teaching Hospital, Abbotabad [(0992) 381907]";
            center_3.textContent = "Lady Reading Hospital, Peshawar [(091) 9211441, (091) 9211430]";
			
			update_donutData(donut_chart, province_data);
			update_timeSeries(myChart, province_data);
            //updateData(donut_chart, zone_wise_donut_data[zones.KP]);
        }
        
        else if (e.target.id === "PK-AK") {
            province = "Azad Kashmir";
			province_data = global_data.AJK;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Azad Kashmir till now.";
            most_infected_city.textContent = province_data[province_data.length - 1].most_infected_city + " is the city with most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_1.textContent = "Abbas Institute of Medical Sciences, Muzzaffarabad [(058224) 39306]";
            center_2.textContent = "DHQ Hospital, Mirpur";
            center_3.textContent = "Sheikh Khalifa Bin Zaid (SKBZ) Hospital, Rawalakot";
			
			update_donutData(donut_chart, province_data);
			update_timeSeries(myChart, province_data);
            //updateData(donut_chart, zone_wise_donut_data[zones.AK]);
			
			
        }
        
        else if (e.target.id === "PK-IS") {
            province = "Islamabad";
			province_data = global_data.ICT;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Islamabad till now.";
            most_infected_city.textContent = province_data[province_data.length - 1].most_infected_city + " is the city with most number of new cases.";

            center_list.style.listStyleType = 'none';
            center_1.textContent = "Pakistan Institute of Medical Sciences (PIMS), Islamabad [(051) 9261170]";
            center_2.textContent = "";
            center_3.textContent = "";
			
			update_donutData(donut_chart, province_data);
			update_timeSeries(myChart, province_data);
            //updateData(donut_chart, zone_wise_donut_data[zones.IS]);
        }
        
        else if (e.target.id === "PK-GB") {
            province = "Gilgit-Baltistan";
			province_data = global_data.GB;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Gilgit-Baltistan till now.";
            most_infected_city.textContent = province_data[province_data.length - 1].most_infected_city + " is the city with most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_1.textContent = "Civil Hospital, Hunza [(051) 3920187]";
            center_2.textContent = "DHQ Hospital, Gilgit [(058119) 20253]";
            center_3.textContent = "DHQ Hospital, Skardu";
			
			update_donutData(donut_chart, province_data);
			update_timeSeries(myChart, province_data);
            //updateData(donut_chart, zone_wise_donut_data[zones.GB]);
        }
        
        else if (e.target.id === "PK-BA") {
            province = "Balochistan";
			province_data = global_data.Balochistan;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Balochistan till now.";
            most_infected_city.textContent = province_data[province_data.length - 1].most_infected_city + " is the city with most number of new cases.";

            center_list.style.listStyleType = 'disc';
            center_1.textContent = "Red Crescent Hospital, Gwadar [(021) 35833973]";
            center_2.textContent = "Fatima Jinnah General and Chest Hospital, Quetta";
            center_3.textContent = "DHQ Teaching Hospital, Turbat";
			update_donutData(donut_chart, province_data);
			update_timeSeries(myChart, province_data);
            //updateData(donut_chart, zone_wise_donut_data[zones.BA]);
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
            document.getElementById('PK-KP').style.fill = '#F0CB69';
            document.getElementById('PK-TA').style.fill = '#F0CB69';
        }
        else {
            selected_province.style.fill = '#F0CB69';
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
    }
    else if (tip_text.textContent == tips[1]) {
        tip_text.textContent = tips[2]
    }
    else if (tip_text.textContent == tips[2]) {
        tip_text.textContent = tips[0]
    }
    tip_text.style.fontStyle = 'italic';
}

function update_timeSeries(chart, data){
	new_data = [[], [], [], []]
	for (var i = 0; i < data.length; i++){
		new_data[0].push({x: new Date(data[i].date), y: data[i].total_discharged})
		new_data[1].push({x: new Date(data[i].date), y: data[i].total_admitted})
		new_data[2].push({x: new Date(data[i].date), y: data[i].total_died})
		new_data[3].push({x: new Date(data[i].date), y: data[i].total_tested_positive})
	}
	chart.data.datasets[0].data = new_data[0];
	chart.data.datasets[1].data = new_data[1];
	chart.data.datasets[2].data = new_data[2];
	chart.data.datasets[3].data = new_data[3];
	
	chart.update();
}
function update_donutData(chart, data) {
    //console.log("Updating donut chart")
	//console.log(data)
	new_data = [];
	new_data.push(data[data.length - 1].total_tested_positive);
	new_data.push(data[data.length - 1].total_admitted);
	new_data.push(data[data.length - 1].total_discharged);
	new_data.push(data[data.length - 1].total_died);
    chart.data.datasets[0].data = new_data;
    chart.update();
}

function updateData(chart, data, type) {
    //console.log("Updating chart")
	if (type === 'donut'){
		chart.data.datasets[0].data = data;
	}
	else if (type === 'time series'){
		chart.data.datasets[0].data = data[0];
		chart.data.datasets[1].data = data[1];
		chart.data.datasets[2].data = data[2];
		chart.data.datasets[3].data = data[3];
	}
    chart.update();
}

function reset_to_default() {
    //console.log("resetting...")

    total_infected.textContent = a[0] + " people have been infected in Pakistan till now.";
	
    most_infected_city.textContent = "Lahore is the city with most number of new cases.";

    center_list.style.listStyleType = 'none';
    center_1.textContent = "";
    center_2.textContent = "";
    center_3.textContent = "";
    
    updateData(donut_chart, a, 'donut');
	updateData(myChart, b, 'time series');
    
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
        document.getElementById('PK-KP').style.fill = '#F0CB69';
        document.getElementById('PK-TA').style.fill = '#F0CB69';
    }
    else {
        document.getElementById(e.target.id).style.fill = '#F0CB69';
    }
}

function highlight_release(e) {
    if (e.target.id == 'PK-KP') {
        if (last_selected_zone == 'PK-TA') {
            last_selected_zone = 'PK-KP';
        }
    }

    else if (e.target.id == 'PK-TA') {
        if (last_selected_zone == 'PK-KP') {
            last_selected_zone = 'PK-TA';
        }
    }

    if (e.target.id !== last_selected_zone) {
        if (e.target.id == 'PK-KP' || e.target.id == 'PK-TA') {
            document.getElementById('PK-KP').style.fill = '#000000';
            document.getElementById('PK-TA').style.fill = '#000000';
        }
        else if (e.target.id == 'PK-IS') {
            document.getElementById('PK-IS').style.fill = '#d4d4d4';
        }
        else if (e.target.id == 'PK-AK') {
            document.getElementById('PK-AK').style.fill = '#585858';
        }
        else {
            document.getElementById(e.target.id).style.fill = '#000000';
        }
    }
}

function expand_buttons(e){
    //console.log("EXPAND BUTTONS CALLED");
    //console.log(e.target.id);
	//console.log(data);
    selected_expansion_button = document.getElementById(e.target.id);

	var emergency_content = document.getElementById("emergency_content");
	var symptoms_content = document.getElementById("symptoms_content");
	var precautions_content = document.getElementById("precautions_content");
	
	
	if (e.target.id === "emergency"){
		if (symptoms_content.style.display !== "none"){
			symptoms_content.style.display = "none"
		}
		if (precautions_content.style.display !== "none"){
			precautions_content.style.display = "none"
		}
		emergency_content.style.display = "block";
	}
	else if (e.target.id === "symptoms"){
		if (emergency_content.style.display !== "none"){
			emergency_content.style.display = "none"
		}
		if (precautions_content.style.display !== "none"){
			precautions_content.style.display = "none"
		}
		symptoms_content.style.display = "block"
	}
	else if (e.target.id === "precautions"){
		if (emergency_content.style.display !== "none"){
			emergency_content.style.display = "none"
		}
		if (symptoms_content.style.display !== "none"){
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

function startIntro(){
    var intro = introJs();
      intro.setOptions({
        steps: [
          { 
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
              intro: 'This graph shows a prediction for the number of cases for the next 14 days. Keep in mind that this only a prediction.',
              position: 'top'
          },
          {
              element: '#feedback-button',
              intro: 'You can give feedback about this dashboard by clicking here.',
              position: 'bottom'
          },
          {
              element: '#tutorial-button',
              intro: 'Click here to start the tutorial again at any time!.',
              position: 'bottom'
          },
          {
              element: '#navbar',
              intro: 'And that is all you need to know to use this dashboard. Stay safe, stay in-doors! Click on Done to finish the tutorial.',
              position: 'bottom'
          }
        ]
      });
      intro.setOption('showProgress', true);
      intro.start();
}
var copy_b = JSON.parse(JSON.stringify(b));
var prev_val = 0;
var len = b[0].length;
//console.log('length', len)
trend_slider.max = len-7;
trend_slider.oninput = function() {
    var val = parseInt(this.value);
	//console.log(val)
	if (val > prev_val){
		for (var i = 0; i < b.length; i++){ 
			for (var j = prev_val; j < val; j++){
				copy_b[i].splice(0,1);
			}
		}
	}
	else if (val < prev_val){
		//console.log(prev_val, val);
		for (var i = 0; i < b.length; i++){ 
			for (var j = prev_val; j > val; j--){
				copy_b[i].unshift(b[i][j])
			}
		}
	}
	updateData(myChart, copy_b, 'time series');
	prev_val = val;	
}

function updated_time(){
	var current = new Date(2020, 1, 1);
	for (var key in global_data){
		for (var i = 0; i < global_data[key].length; i++){
			d = new Date(global_data[key][i].date)
			if (d > current){
				//console.log([d.getDate(), d.getMonth(), d.getFullYear], [current.getDate(), current.getMonth(), current.getFullYear()])
				current = d;
			}
		}
	}
	update_text.textContent = "Last updated on: " + current.getDate() + "/" + current.getMonth() + "/" + current.getFullYear();
}
$('#tutorial_modal').modal();