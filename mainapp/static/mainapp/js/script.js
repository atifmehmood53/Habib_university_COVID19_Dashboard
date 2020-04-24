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
            label: 'Prediction of Cases',
            pointBackgroundColor: '#c96044',
            pointBorderColor: '#c96044',
            pointRadius: 5,
            fill: false,
            borderColor: '#c96044',
            backgroundColor: '#c96044',
            data: [
                {
                    x: today.setDate(today.getDate() + 2),
                    y: 4000
                },{
                    x: today.setDate(today.getDate() + 2),
                    y: 4100
                },{
                    x: today.setDate(today.getDate() + 2),
                    y: 4300
                },{
                    x: today.setDate(today.getDate() + 2),
                    y: 4400
                },{
                    x: today.setDate(today.getDate() + 2),
                    y: 4500
                },{
                    x: today.setDate(today.getDate() + 2),
                    y: 4700
                },{
                    x: today.setDate(today.getDate() + 2),
                    y: 4800
                }
            ],
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

function national_donut_data(){
	data = Object.assign(global_data); //copying global data for safety purposes, can be removed later
	
	new_data = [];
	confirmed_sum = 0, active_sum = 0, recovered_sum = 0, deceased_sum = 0;
	
	for (var key in data){
		if (key === 'Sindh' || key === "Punjab" || key === "AJK" || key === "Balochistan" || key === "GB" || key === "KPTD" || key === "Taftan_mobile_lab"){
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
	
	return new_data
}

function national_timeSeries_data(){
	data = Object.assign(global_data); //copying global data for safety purposes, can be removed later
	
	new_data = [[], [], [], []];
	confirmed_sum = 0, active_sum = 0, recovered_sum = 0, deceased_sum = 0;
	
	for (var key in data){
		if (key === 'Sindh' || key === "Punjab" || key === "AJK" || key === "Balochistan" || key === "GB" || key === "KPTD" || key === "Taftan_mobile_lab"){
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


function clear_tooltip(e) {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = 'none';
}


function popup(e) {

	//var tooltip = document.getElementById("tooltip");
    var province;
	var province_data;
    
    console.log(last_selected_zone)

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
        console.log("Deselecting " + last_selected_zone);
        reset_to_default();
    }

    else {

        last_selected_zone = e.target.id;
        if (e.target.id === "PK-PB") {
            province = "Punjab";
			province_data = global_data.Punjab;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Punjab till now.";
            most_infected_city.textContent = "Lahore has the most number of cases.";

            center_list.style.listStyleType = 'disc';
            center_1.textContent = "Benazir Bhutto Hospital, Rawalpindi [(051) 9290301]";
            center_2.textContent = "Services Hospital, Lahore [(042) 99203402]";
            center_3.textContent = "Allied Teaching Hospital, Faisalabad [(041) 9210082]";
			
			update_donutData(donut_chart, province_data);
			update_timeSeries(myChart, province_data);
			//updateData(donut_chart, zone_wise_donut_data[zones.PB]);
        }
        
        else if (e.target.id === "PK-SD") {
            province = "Sindh";
			province_data = global_data.Sindh;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in Sindh till now.";
            most_infected_city.textContent = "Karachi has the most number of cases.";

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
            province = "Khyber Pakhtunkhwa";
			province_data = global_data.KP;
            total_infected.textContent = province_data[province_data.length - 1].total_tested_positive + " people have been infected in KPK till now.";
            most_infected_city.textContent = "Peshawar has the most number of cases.";

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
            most_infected_city.textContent = "Muzaffarabad has the most number of cases.";

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
            most_infected_city.textContent = "Islamabad has the most number of cases.";

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
            most_infected_city.textContent = "Gilgit has the most number of cases.";

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
            most_infected_city.textContent = "Quetta has the most number of cases.";

            center_list.style.listStyleType = 'disc';
            center_1.textContent = "Red Crescent Hospital, Gwadar [(021) 35833973]";
            center_2.textContent = "Fatima Jinnah General and Chest Hospital, Quetta";
            center_3.textContent = "DHQ Teaching Hospital, Turbat";

			update_donutData(donut_chart, province_data);
			update_timeSeries(myChart, province_data);
            //updateData(donut_chart, zone_wise_donut_data[zones.BA]);
        }

        console.log("Clicked! X: "+e.pageX+" Y: "+e.pageY);
        
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
		//var [year, month, day] = data[i].date.split("-")
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
    console.log("Updating donut chart")
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
    console.log("Updating chart")
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
    console.log("resetting...")

    total_infected.textContent = zone_wise_donut_data[zones.PK][0] + " people have been infected in Pakistan till now.";
    most_infected_city.textContent = "Lahore has the most number of cases.";

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
    console.log("Reset complete");
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
    console.log("EXPAND BUTTONS CALLED");
    console.log(e.target.id);
	console.log(global_variable.a);
	console.log(data);
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
            intro: "Welcome to the COVID19 Dashboard. Click on Next to start the tutorial."
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
              element: '#navbar',
              intro: 'And that is all you need to know to use this dashboard. Stay safe, stay in-doors! Click on Done to finish the tutorial.',
              position: 'top'
          }
        ]
      });
      intro.setOption('showProgress', true);
      intro.start();
}

var trend_slider = document.getElementById('trend_slider');
trend_slider.oninput = function() {
    console.log(this.value);
	/*var today = new Date();
	var weekAgo = new Date(today.setDate(today.getDate()-7))
	var temp = false;
	var copy_b = jQuery.extend({}, b);
	//console.log(b[0])
	for (var i = 0; i < b.length; i++){ 
		for (var j = 0; j < b[i].length; j++){
			//console.log(this.value, j)
			if (this.value == j && j > 0){
				copy_b[i].splice(0, 1);
				temp = true;
				break;
			}
		}
	}
	//if (temp == false){
	//	copy_b = [[],[],[],[]]
	//}
	updateData(myChart, copy_b, 'time series');*/
}
$('#tutorial_modal').modal();