var zone_wise_donut_data = [
  [4322, 3687, 572, 63],
  [28, 27, 1, 0],
  [212, 134, 76, 2],
  [213, 114, 96, 3],
  [102, 91, 10, 1],
  [560, 466, 74, 20],
  [2171, 2119, 35, 17],
  [1036, 736, 280, 20],
];
const zones = { PK: 0, AK: 1, BA: 2, GB: 3, IS: 4, KP: 5, PB: 6, SD: 7 };
Object.freeze(zones);
const hospital_zones = { AK: 0, BA: 1, GB: 2, IS: 3, KP: 4, PB: 5, SD: 6 };
var last_selected_zone, selected_expansion_button;
Object.freeze(hospital_zones);
var total_infected = document.getElementById("total-infected"),
  center_1 = document.getElementById("center-1"),
  center_2 = document.getElementById("center-2"),
  center_3 = document.getElementById("center-3"),
  center_list = document.getElementById("center-list"),
  trend_slider = document.getElementById("trend_slider"),
  update_text = document.getElementById("update-text"),
  week_slider = document.getElementById("week_slider"),
  cities_table = document.getElementById("cities-table"),
  contents = document.getElementById("tableContents"),
  tab_general_stats = document.getElementById("tab-general-stat"),
  tab_common_symp = document.getElementById("tab-common-symp"),
  tab_other_symp = document.getElementById("tab-other-symp"),
  general_stats_section = document.getElementById("nested-general-stats"),
  common_symp_section = document.getElementById("nested-common-symp"),
  other_symp_section = document.getElementById("nested-other-symp");
tab_general_stats.style.backgroundColor = "#8C0618";
var hospital_info = [
    [
      ["Abbas Institute of Medical Sciences, Muzzaffarabad", "#"],
      ["DHQ Hospital, Mirpur", "#"],
      ["Sheikh Khalifa Bin Zaid (SKBZ) Hospital, Rawalakot", "#"],
    ],
    [
      ["Red Crescent Hospital, Gwadar", "#"],
      ["Fatima Jinnah General and Chest Hospital, Quetta", "#"],
      ["DHQ Teaching Hospital, Turbat", "#"],
    ],
    [
      ["Civil Hospital, Hunza", "#"],
      ["DHQ Hospital, Gilgit", "#"],
      ["DHQ Hospital, Skardu", "#"],
    ],
    [
      [
        "Pakistan Institute of Medical Sciences (PIMS), Islamabad",
        "https://pims.gov.pk/",
      ],
    ],
    [
      [
        "Bacha Khan Medical Complex, Swabi",
        "http://gkmcs.edu.pk/ath/bacha-khan-medical-complex-shah-mansoor/2",
      ],
      ["Ayub Teaching Hospital, Abbotabad", "http://ath.gov.pk/"],
      ["Lady Reading Hospital, Peshawar", "https://www.lrh.edu.pk/"],
    ],
    [
      ["Benazir Bhutto Hospital, Rawalpindi", "#"],
      ["Services Hospital, Lahore", "http://sims.edu.pk/shl.aspx"],
      [
        "Allied Teaching Hospital, Faisalabad",
        "https://www.facebook.com/alliedhospital/",
      ],
    ],
    [
      [
        "Aga Khan University Hospital, Karachi",
        "https://hospitals.aku.edu/pakistan/karachi/pages/default.aspx",
      ],
      ["LUMHS hospital, Hyderabad", "https://www.lumhs.edu.pk/"],
      [
        "Jinnah Postgraduate Medical Centre, Karachi",
        "https://www.jpmc.edu.pk/",
      ],
    ],
  ],
  hospital_links = [[], [], [], [], [], [], []],
  i,
  x;
for (i = 0; i < hospital_info.length; i++)
  for (x = 0; x < hospital_info[i].length; x++) {
    var link = document.createElement("a");
    (link.textContent = hospital_info[i][x][0]),
      link.setAttribute("href", hospital_info[i][x][1]),
      link.setAttribute("target", "blank"),
      link.setAttribute("class", "hospital"),
      link.setAttribute("style", "color: white");
    var list_element = document.createElement("li");
    list_element.appendChild(link), hospital_links[i].push(list_element);
  }
var all_provinces = [
    document.getElementById("PK-PB"),
    document.getElementById("PK-SD"),
    document.getElementById("PK-BA"),
    document.getElementById("PK-KP"),
    document.getElementById("PK-GB"),
    document.getElementById("PK-IS"),
    document.getElementById("PK-AK"),
    document.getElementById("PK-TA"),
  ],
  month_list = [],
  a = national_donut_data(),
  national_timeSeries = national_timeSeries_data(),
  n = national_timeSeries,
  predictions = prediction_data(),
  d = monthly_data(n),
  complete_citywise_data = provincial_cities_data();
console.log(complete_citywise_data);
for (
  var top_12_citywise_data = [
      [[], [], [], []],
      [[], [], [], []],
    ],
    i = 0;
  i < 3;
  i++
)
  for (var j = 0; j < 12; j++)
    top_12_citywise_data[0][i].push(complete_citywise_data[0][i][j]),
      top_12_citywise_data[1][i].push(complete_citywise_data[1][i][j]);
(top_12_citywise_data[0][3] = complete_citywise_data[0][3]),
  (top_12_citywise_data[1][3] = complete_citywise_data[1][3]),
  console.log("Top 12 Citywise Data:"),
  console.log(top_12_citywise_data);
var default_table_data = [[], [], [], []],
  national_citywise_data = [[], []];
for (var district in global_data["City Wise"].Balochistan)
  "Quetta" == global_data["City Wise"].Balochistan[district].district &&
    (national_citywise_data[0].push(
      global_data["City Wise"].Balochistan[district].casePerMillionPopulation
    ),
    national_citywise_data[1].push(
      global_data["City Wise"].Balochistan[district].district
    ),
    default_table_data[0].push(
      global_data["City Wise"].Balochistan[district].district
    ),
    default_table_data[1].push(
      global_data["City Wise"].Balochistan[district].Population
    ),
    default_table_data[2].push(
      global_data["City Wise"].Balochistan[district].casePerMillionPopulation
    ),
    default_table_data[3].push(
      global_data["City Wise"].Balochistan[district].total
    ));
for (var district in global_data["City Wise"].Punjab)
  "Lahore" == global_data["City Wise"].Punjab[district].district &&
    (national_citywise_data[0].push(
      global_data["City Wise"].Punjab[district].casePerMillionPopulation
    ),
    national_citywise_data[1].push(
      global_data["City Wise"].Punjab[district].district
    ),
    default_table_data[0].push(
      global_data["City Wise"].Punjab[district].district
    ),
    default_table_data[1].push(
      global_data["City Wise"].Punjab[district].Population
    ),
    default_table_data[2].push(
      global_data["City Wise"].Punjab[district].casePerMillionPopulation
    ),
    default_table_data[3].push(
      global_data["City Wise"].Punjab[district].total
    ));
for (var district in global_data["City Wise"].Sindh)
  "Karachi" == global_data["City Wise"].Sindh[district].district &&
    (national_citywise_data[0].push(
      global_data["City Wise"].Sindh[district].casePerMillionPopulation
    ),
    national_citywise_data[1].push(
      global_data["City Wise"].Sindh[district].district
    ),
    default_table_data[0].push(
      global_data["City Wise"].Sindh[district].district
    ),
    default_table_data[1].push(
      global_data["City Wise"].Sindh[district].Population
    ),
    default_table_data[2].push(
      global_data["City Wise"].Sindh[district].casePerMillionPopulation
    ),
    default_table_data[3].push(global_data["City Wise"].Sindh[district].total));
for (var district in global_data["City Wise"].KPK)
  "Peshawar" == global_data["City Wise"].KPK[district].district &&
    (national_citywise_data[0].push(
      global_data["City Wise"].KPK[district].casePerMillionPopulation
    ),
    national_citywise_data[1].push(
      global_data["City Wise"].KPK[district].district
    ),
    default_table_data[0].push(global_data["City Wise"].KPK[district].district),
    default_table_data[1].push(
      global_data["City Wise"].KPK[district].Population
    ),
    default_table_data[2].push(
      global_data["City Wise"].KPK[district].casePerMillionPopulation
    ),
    default_table_data[3].push(global_data["City Wise"].KPK[district].total));
for (
  var today,
    current_month = (today = new Date()).getMonth(),
    currently_selected = void 0,
    month_data,
    weekly_data_list = weekly_data(n, "national"),
    updated_data = [],
    i = 0;
  i < weekly_data_list.length;
  i++
)
  updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1]);
b = updated_data;
var province_donut = province_donut_data(),
  province_labels;
updated_time();
var two_week_accuracy_data = accuracy_data(),
  table_data = citywise_table_data("default");
update_table_data();
var donut_ctx = document.getElementById("donut-chart").getContext("2d"),
  donut_config = {
    type: "doughnut",
    data: {
      datasets: [
        { data: a, backgroundColor: ["#d56f28", "#759441", "#bb2635"] },
      ],
      labels: ["Active", "Recovered", "Deceased"],
    },
    options: {
      title: { display: !0, text: "Cases Distribution" },
      responsive: !0,
      legend: { position: "top" },
      animation: { animateScale: !0, animateRotate: !0 },
    },
  },
  donut_chart = new Chart(donut_ctx, donut_config),
  donut_ctx2 = document.getElementById("donut-chart2").getContext("2d"),
  donut_config = {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: province_donut,
          backgroundColor: [
            "#d7aa00",
            "#e8702f",
            "#c84533",
            "#be5465",
            "#538c72",
            "#759441",
          ],
        },
      ],
      labels: province_labels,
    },
    options: {
      title: { display: !0, text: "Province wide Confirmed Cases" },
      responsive: !0,
      legend: { position: "top" },
      animation: { animateScale: !0, animateRotate: !0 },
    },
  },
  donut_chart2 = new Chart(donut_ctx2, donut_config),
  ctx1 = document
    .getElementById("time-series-graph-confirmed-cases")
    .getContext("2d"),
  trend_chart_config = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Recovered",
          pointBackgroundColor: "#759441",
          pointBorderColor: "#759441",
          pointRadius: 4,
          fill: !1,
          backgroundColor: "#759441",
          borderColor: "#759441",
          data: b[0],
          borderWidth: 3,
        },
        {
          label: "Active",
          pointBackgroundColor: "#d56f28",
          pointBorderColor: "#d56f28",
          pointRadius: 4,
          fill: !1,
          backgroundColor: "#d56f28",
          borderColor: "#d56f28",
          data: b[1],
          borderWidth: 3,
        },
        {
          label: "Deceased",
          pointBackgroundColor: "#bb2635",
          pointBorderColor: "#bb2635",
          pointRadius: 4,
          fill: !1,
          backgroundColor: "#bb2635",
          borderColor: "#bb2635",
          data: b[2],
          borderWidth: 3,
        },
        {
          label: "Confirmed",
          pointBackgroundColor: "#d7aa00",
          pointBorderColor: "#d7aa00",
          pointRadius: 4,
          fill: !1,
          backgroundColor: "#d7aa00",
          borderColor: "#d7aa00",
          data: b[3],
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      title: { display: !0, text: "Trends" },
      scales: {
        xAxes: [
          {
            display: !0,
            type: "time",
            time: {
              displayFormats: {
                millisecond: "MMM DD",
                second: "MMM DD",
                minute: "MMM DD",
                hour: "MMM DD",
                day: "MMM DD",
                week: "MMM DD",
                month: "MMM DD",
                quarter: "MMM DD",
                year: "MMM DD",
              },
            },
            scaleLabel: { display: !0, labelString: "Date" },
            ticks: { source: "data", autoSkip: !0, maxTicksLimit: 20 },
          },
        ],
        yAxes: [
          {
            display: !0,
            scaleLabel: { display: !0, labelString: "Number of Cases" },
          },
        ],
      },
    },
  },
  myChart = new Chart(ctx1, trend_chart_config),
  today = new Date(),
  prediction_graph_canvas = document
    .getElementById("time-series-graph-prediction")
    .getContext("2d"),
  prediction_graph_config = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Nationwide Cases",
          pointBackgroundColor: "#c96044",
          pointBorderColor: "#c96044",
          pointRadius: 5,
          fill: !1,
          borderColor: "#c96044",
          backgroundColor: "#c96044",
          data: predictions[1],
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      title: { display: !0, text: "Predictions" },
      scales: {
        xAxes: [
          {
            type: "time",
            display: !0,
            scaleLabel: { display: !0, labelString: "Date" },
            ticks: { source: "data" },
          },
        ],
        yAxes: [
          {
            display: !0,
            scaleLabel: { display: !0, labelString: "Number of cases" },
          },
        ],
      },
    },
  },
  prediction_graph = new Chart(
    prediction_graph_canvas,
    prediction_graph_config
  ),
  prediction_details_canvas = document
    .getElementById("time-series-prediction-details")
    .getContext("2d"),
  prediction_details_config = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Upper Confidence Interval",
          borderDash: [20, 5],
          borderColor: "#d7aa00",
          backgroundColor: "rgba(215, 170, 0, 0.5)",
          data: predictions[2],
          fill: "+1",
          borderWidth: 3,
        },
        {
          label: "Prediction of Nationwide Cases",
          pointBackgroundColor: "#c96044",
          pointBorderColor: "#c96044",
          pointRadius: 5,
          borderColor: "#c96044",
          backgroundColor: "#c96044",
          data: predictions[1],
          fill: !1,
          borderWidth: 3,
        },
        {
          label: "Lower Confidence Interval",
          borderDash: [20, 5],
          borderColor: "#d7aa00",
          backgroundColor: "rgba(215, 170, 0, 0.5)",
          data: predictions[0],
          fill: "-1",
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      title: { display: !0, text: "Detailed Predictions" },
      elements: { point: { radius: 0 } },
      scales: {
        xAxes: [
          {
            type: "time",
            display: !0,
            scaleLabel: { display: !0, labelString: "Date" },
            ticks: { source: "data" },
          },
        ],
        yAxes: [
          {
            display: !0,
            scaleLabel: { display: !0, labelString: "Number of cases" },
          },
        ],
      },
    },
  },
  prediction_accuracy_canvas = document
    .getElementById("prediction-accuracy")
    .getContext("2d"),
  prediction_accuracy_config = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Prediction",
          pointBackgroundColor: "#908834",
          pointBorderColor: "#908834",
          pointRadius: 4,
          fill: !1,
          backgroundColor: "#908834",
          borderColor: "#908834",
          data: predictions[1],
          borderWidth: 3,
        },
        {
          label: "Actual Data",
          pointBackgroundColor: "#b74e65",
          pointBorderColor: "#b74e65",
          pointRadius: 4,
          fill: !1,
          backgroundColor: "#b74e65",
          borderColor: "#b74e65",
          data: two_week_accuracy_data,
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      title: { display: !0, text: "Prediction Accuracy" },
      scales: {
        xAxes: [
          {
            display: !0,
            type: "time",
            time: {
              displayFormats: {
                millisecond: "MMM DD",
                second: "MMM DD",
                minute: "MMM DD",
                hour: "MMM DD",
                day: "MMM DD",
                week: "MMM DD",
                month: "MMM DD",
                quarter: "MMM DD",
                year: "MMM DD",
              },
            },
            scaleLabel: { display: !0, labelString: "Date" },
            ticks: { source: "data", autoSkip: !0, maxTicksLimit: 20 },
          },
        ],
        yAxes: [
          {
            display: !0,
            scaleLabel: { display: !0, labelString: "Number of Cases" },
          },
        ],
      },
    },
  },
  prediction_accuracy_graph = new Chart(
    prediction_accuracy_canvas,
    prediction_accuracy_config
  ),
  cities_canvas = document.getElementById("cities-graph").getContext("2d"),
  cities_config = {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Cases Per Million",
          borderColor: "#538c72",
          backgroundColor: "#538c72",
          data: national_citywise_data[0],
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      title: { display: !0, text: "City-wise Data" },
      elements: { point: { radius: 0 } },
      scales: {
        xAxes: [
          {
            display: !0,
            type: "category",
            labels: national_citywise_data[1],
            scaleLabel: { display: !0, labelString: "District" },
          },
        ],
        yAxes: [
          {
            display: !0,
            scaleLabel: { display: !0, labelString: "Cases Per Million" },
          },
        ],
      },
    },
  },
  cities_graph = new Chart(cities_canvas, cities_config);
function national_donut_data() {
  for (var key in ((data = Object.assign(global_data)),
  (new_data = []),
  (confirmed_sum = 0),
  (active_sum = 0),
  (recovered_sum = 0),
  (deceased_sum = 0),
  data))
    ("Sindh" !== key &&
      "Punjab" !== key &&
      "AJK" !== key &&
      "Balochistan" !== key &&
      "GB" !== key &&
      "KPTD" !== key &&
      "Taftan_mobile_lab" !== key &&
      "KP" !== key &&
      "ICT" !== key) ||
      ((confirmed_sum += data[key][data[key].length - 1].total_tested_positive),
      (active_sum += data[key][data[key].length - 1].total_admitted),
      (recovered_sum += data[key][data[key].length - 1].total_discharged),
      (deceased_sum += data[key][data[key].length - 1].total_died));
  return (
    new_data.push(active_sum),
    new_data.push(recovered_sum),
    new_data.push(deceased_sum),
    (document.getElementById("total-cases").innerHTML = confirmed_sum),
    (document.getElementById("total-recoveries").innerHTML = recovered_sum),
    (document.getElementById("total-deaths").innerHTML = deceased_sum),
    (total_infected.textContent =
      confirmed_sum + " people have been infected in Pakistan till now."),
    new_data
  );
}
function province_donut_data() {
  data = Object.assign(global_data);
  var kpk = 0,
    new_data = [],
    labels = [];
  for (var key in data)
    "KP" == key || "KPTD" == key
      ? ((kpk += data[key][data[key].length - 1].total_tested_positive),
        "KPTD" == key && (new_data.push(kpk), labels.push("KP")))
      : ("Sindh" !== key &&
          "Punjab" !== key &&
          "AJK" !== key &&
          "Balochistan" !== key &&
          "GB" !== key) ||
        (new_data.push(
          parseInt(data[key][data[key].length - 1].total_tested_positive)
        ),
        labels.push(key));
  return (province_labels = labels), new_data;
}
function national_timeSeries_data() {
  data = Object.assign(global_data);
  var j = 0;
  for (var key in ((new_data = [[], [], [], []]),
  (confirmed_sum = 0),
  (active_sum = 0),
  (recovered_sum = 0),
  (deceased_sum = 0),
  data)) {
    j = 0;
    var length_of_provincial_data = data[key].length;
    if (
      "Sindh" === key ||
      "Punjab" === key ||
      "AJK" === key ||
      "Balochistan" === key ||
      "GB" === key ||
      "KPTD" === key ||
      "Taftan_mobile_lab" === key ||
      "KP" === key ||
      "ICT" === key
    )
      for (var i = 0; i < length_of_provincial_data; i++)
        (d = new Date(data[key][j].date)),
          (d_month = d.getMonth()),
          month_list.indexOf(d_month) < 0 && month_list.push(d_month),
          0 !== new_data[0].length && void 0 !== new_data[0][i]
            ? new_data[0][i].x.getTime() === d.getTime()
              ? ((new_data[0][i].y += data[key][j].total_discharged),
                (new_data[1][i].y += data[key][j].total_admitted),
                (new_data[2][i].y += data[key][j].total_died),
                (new_data[3][i].y += data[key][j].total_tested_positive))
              : ((new_data[0][i].y += 0),
                (new_data[1][i].y += 0),
                (new_data[2][i].y += 0),
                (new_data[3][i].y += 0),
                j--,
                length_of_provincial_data++)
            : (new_data[0].push({
                x: new Date(data[key][j].date),
                y: data[key][j].total_discharged,
              }),
              new_data[1].push({
                x: new Date(data[key][j].date),
                y: data[key][j].total_admitted,
              }),
              new_data[2].push({
                x: new Date(data[key][j].date),
                y: data[key][j].total_died,
              }),
              new_data[3].push({
                x: new Date(data[key][j].date),
                y: data[key][j].total_tested_positive,
              })),
          j++;
  }
  return new_data;
}
function provincial_cities_data() {
  data = Object.assign(global_data);
  var city_data = [
    [[], [], [], []],
    [[], [], [], []],
  ];
  for (var district in data["City Wise"].Balochistan)
    city_data[0][0].push(
      data["City Wise"].Balochistan[district].casePerMillionPopulation
    ),
      city_data[1][0].push(data["City Wise"].Balochistan[district].district);
  for (var district in data["City Wise"].Punjab)
    city_data[0][1].push(
      data["City Wise"].Punjab[district].casePerMillionPopulation
    ),
      city_data[1][1].push(data["City Wise"].Punjab[district].district);
  for (var district in data["City Wise"].Sindh)
    city_data[0][2].push(
      data["City Wise"].Sindh[district].casePerMillionPopulation
    ),
      city_data[1][2].push(data["City Wise"].Sindh[district].district);
  for (var district in data["City Wise"].KPK)
    city_data[0][3].push(
      data["City Wise"].KPK[district].casePerMillionPopulation
    ),
      city_data[1][3].push(data["City Wise"].KPK[district].district);
  return city_data;
}
function citywise_table_data(province) {
  data = Object.assign(global_data);
  var city_data = [[], [], [], [], []];
  if ("default" === province) city_data = default_table_data;
  else
    for (var district in data["City Wise"][province])
      city_data[0].push(data["City Wise"][province][district].district),
        city_data[1].push(data["City Wise"][province][district].Population),
        city_data[2].push(
          data["City Wise"][province][district].casePerMillionPopulation
        ),
        city_data[3].push(data["City Wise"][province][district].total);
  return city_data;
}
function update_table_data() {
  contents.innerHTML = "";
  for (var i = 0; i < table_data[0].length; i++)
    contents.innerHTML +=
      "<tr><td>" +
      table_data[0][i] +
      "</td><td>" +
      table_data[3][i] +
      "</td><td>" +
      table_data[1][i] +
      "</td><td>" +
      table_data[2][i] +
      "</td></tr>";
}
function accuracy_data() {
  for (
    var starting_date = new Date(
        predictions[1][0].x.getFullYear(),
        predictions[1][0].x.getMonth(),
        predictions[1][0].x.getDate()
      ),
      i = 0;
    i <= national_timeSeries[3].length;

  ) {
    var current_date;
    if (void 0 !== national_timeSeries[3][i])
      if (
        new Date(
          national_timeSeries[3][i].x.getFullYear(),
          national_timeSeries[3][i].x.getMonth(),
          national_timeSeries[3][i].x.getDate()
        ).getTime() === starting_date.getTime()
      )
        break;
    i++;
  }
  return national_timeSeries[3].slice(i, i + 14);
}
function monthly_data(data) {
  for (
    var month_data = [], i = 0;
    void 0 === month_data[i] && i <= month_list[month_list.length - 1];

  )
    month_data.push([[], [], [], []]), i++;
  for (var i = 0; i < data.length; i++)
    for (var j = 0; j < data[i].length; j++) {
      var temp;
      month_data[data[i][j].x.getMonth()][i].push(data[i][j]);
    }
  return month_data;
}
function weekly_data(data, type) {
  var new_data = [[], [], [], []],
    week_count = 0,
    temp = [];
  if ("national" === type)
    for (var i = 0; i < new_data.length; i++) {
      week_count = 0;
      for (var j = 0; j < data[i].length; j++)
        0 === j
          ? temp.push(data[i][j])
          : j % 7 == 0
          ? ((new_data[i][week_count] = temp),
            week_count++,
            (temp = []).push(data[i][j]))
          : temp.push(data[i][j]);
      if (0 !== temp.length) {
        for (var k = 0; k < temp.length; k++)
          new_data[i][week_count - 1].push(temp[k]);
        temp = [];
      }
    }
  else if ("province" === type)
    for (var i = 0; i < new_data.length; i++) {
      week_count = 0;
      for (var j = 0; j < data.length; j++)
        0 === j
          ? (0 === i &&
              temp.push({
                x: new Date(data[j].date),
                y: data[j].total_discharged,
              }),
            1 === i &&
              temp.push({
                x: new Date(data[j].date),
                y: data[j].total_admitted,
              }),
            2 === i &&
              temp.push({ x: new Date(data[j].date), y: data[j].total_died }),
            3 === i &&
              temp.push({
                x: new Date(data[j].date),
                y: data[j].total_tested_positive,
              }))
          : j % 7 == 0
          ? ((new_data[i][week_count] = temp),
            (temp = []),
            week_count++,
            0 === i &&
              temp.push({
                x: new Date(data[j].date),
                y: data[j].total_discharged,
              }),
            1 === i &&
              temp.push({
                x: new Date(data[j].date),
                y: data[j].total_admitted,
              }),
            2 === i &&
              temp.push({ x: new Date(data[j].date), y: data[j].total_died }),
            3 === i &&
              temp.push({
                x: new Date(data[j].date),
                y: data[j].total_tested_positive,
              }))
          : (0 === i &&
              temp.push({
                x: new Date(data[j].date),
                y: data[j].total_discharged,
              }),
            1 === i &&
              temp.push({
                x: new Date(data[j].date),
                y: data[j].total_admitted,
              }),
            2 === i &&
              temp.push({ x: new Date(data[j].date), y: data[j].total_died }),
            3 === i &&
              temp.push({
                x: new Date(data[j].date),
                y: data[j].total_tested_positive,
              }));
      if (0 !== temp.length) {
        for (var k = 0; k < temp.length; k++)
          new_data[i][week_count - 1].push(temp[k]);
        temp = [];
      }
    }
  return new_data;
}
function prediction_data() {
  (data = global_data.Predictions), (new_data = [[], [], []]);
  for (var i = 0; i < data.length; i++)
    new_data[0].push({
      x: new Date(data[i].date),
      y: Math.round(data[i].Lower_confidence_interval),
    }),
      new_data[1].push({
        x: new Date(data[i].date),
        y: Math.round(data[i].Predictions),
      }),
      new_data[2].push({
        x: new Date(data[i].date),
        y: Math.round(data[i].Upper_confidence_interval),
      });
  return new_data;
}
function clear_tooltip(e) {
  var tooltip;
  document.getElementById("tooltip").style.display = "none";
}
function update_provinceMonth(province, province_data) {
  for (
    var month_data = [], i = 0;
    void 0 === month_data[i] && i <= month_list[month_list.length - 1];

  )
    month_data.push([]), i++;
  for (var i = 0; i < province_data.length; i++) {
    var date, temp;
    month_data[new Date(province_data[i].date).getMonth()].push(
      province_data[i]
    );
  }
  return (
    (d = month_data),
    (copy_d = JSON.parse(JSON.stringify(month_data))),
    (copy_b = JSON.parse(JSON.stringify(month_data))),
    (currently_selected = province),
    month_data
  );
}
function update_citywise_data(province) {
  "Balochistan" == province
    ? ((cities_graph.data.datasets[0].data = top_12_citywise_data[0][0]),
      (cities_graph.options.scales.xAxes[0].labels =
        top_12_citywise_data[1][0]))
    : "Punjab" == province
    ? ((cities_graph.data.datasets[0].data = top_12_citywise_data[0][1]),
      (cities_graph.options.scales.xAxes[0].labels =
        top_12_citywise_data[1][1]))
    : "Sindh" == province
    ? ((cities_graph.data.datasets[0].data = top_12_citywise_data[0][2]),
      (cities_graph.options.scales.xAxes[0].labels =
        top_12_citywise_data[1][2]))
    : "KPK" == province
    ? ((cities_graph.data.datasets[0].data = top_12_citywise_data[0][3]),
      (cities_graph.options.scales.xAxes[0].labels =
        top_12_citywise_data[1][3]))
    : "National" == province &&
      ((cities_graph.data.datasets[0].data = national_citywise_data[0]),
      (cities_graph.options.scales.xAxes[0].labels =
        national_citywise_data[1])),
    cities_graph.update();
}
function popup(e) {
  var province_data;
  if (
    ((trend_slider.value = trend_slider.max),
    "PK-KP" == e.target.id
      ? "PK-TA" == last_selected_zone && (last_selected_zone = "PK-KP")
      : "PK-TA" == e.target.id &&
        "PK-KP" == last_selected_zone &&
        (last_selected_zone = "PK-TA"),
    last_selected_zone == e.target.id)
  )
    reset_to_default();
  else {
    if (((last_selected_zone = e.target.id), "PK-PB" === e.target.id)) {
      var i;
      for (
        province_data = global_data.Punjab,
          table_data = citywise_table_data("Punjab"),
          update_table_data(),
          total_infected.textContent =
            province_data[province_data.length - 1].total_tested_positive +
            " people have been infected in Punjab till now.",
          center_list.style.listStyleType = "disc",
          center_list.innerHTML = "",
          i = 0;
        i < hospital_links[hospital_zones.PB].length;
        i++
      )
        center_list.appendChild(hospital_links[hospital_zones.PB][i]);
      weekly_data_list = weekly_data(province_data, "province");
      for (var updated_data = [], i = 0; i < weekly_data_list.length; i++)
        updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1]);
      update_donutData(donut_chart, province_data),
        updateData(myChart, updated_data, "time series"),
        update_citywise_data("Punjab");
    } else if ("PK-SD" === e.target.id) {
      var i;
      for (
        province_data = global_data.Sindh,
          table_data = citywise_table_data("Sindh"),
          update_table_data(),
          total_infected.textContent =
            province_data[province_data.length - 1].total_tested_positive +
            " people have been infected in Sindh till now.",
          center_list.style.listStyleType = "disc",
          center_list.innerHTML = "",
          i = 0;
        i < hospital_links[hospital_zones.SD].length;
        i++
      )
        center_list.appendChild(hospital_links[hospital_zones.SD][i]);
      weekly_data_list = weekly_data(province_data, "province");
      for (var updated_data = [], i = 0; i < weekly_data_list.length; i++)
        updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1]);
      update_donutData(donut_chart, province_data),
        updateData(myChart, updated_data, "time series"),
        update_citywise_data("Sindh");
    } else if ("PK-KP" === e.target.id || "PK-TA" == e.target.id) {
      for (var key in ((new_data = [[], [], [], []]),
      (province_data = global_data.KP),
      (province_data2 = global_data.KPTD),
      province_data))
        for (var i = 0; i < province_data[key].length; i++)
          (d = new Date(province_data[key][i].date)),
            province_data[0][i].x.getTime() === d.getTime() &&
              ((province_data[0][i].y +=
                province_data2[key][i].total_discharged),
              (province_data[1][i].y += province_data2[key][i].total_admitted),
              (province_data[2][i].y += province_data2[key][i].total_died),
              (province_data[3][i].y +=
                province_data2[key][i].total_tested_positive));
      var i;
      for (
        table_data = citywise_table_data("KPK"),
          update_table_data(),
          total_infected.textContent =
            province_data[province_data.length - 1].total_tested_positive +
            " people have been infected in KPK till now.",
          center_list.style.listStyleType = "disc",
          center_list.innerHTML = "",
          i = 0;
        i < hospital_links[hospital_zones.KP].length;
        i++
      )
        center_list.appendChild(hospital_links[hospital_zones.KP][i]);
      weekly_data_list = weekly_data(province_data, "province");
      for (var updated_data = [], i = 0; i < weekly_data_list.length; i++)
        updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1]);
      update_donutData(donut_chart, province_data),
        updateData(myChart, updated_data, "time series"),
        update_citywise_data("KPK");
    } else if ("PK-AK" === e.target.id) {
      var i;
      for (
        province_data = global_data.AJK,
          table_data = citywise_table_data("default"),
          update_table_data(),
          total_infected.textContent =
            province_data[province_data.length - 1].total_tested_positive +
            " people have been infected in Azad Kashmir till now.",
          center_list.style.listStyleType = "disc",
          center_list.innerHTML = "",
          i = 0;
        i < hospital_links[hospital_zones.AK].length;
        i++
      )
        center_list.appendChild(hospital_links[hospital_zones.AK][i]);
      weekly_data_list = weekly_data(province_data, "province");
      for (var updated_data = [], i = 0; i < weekly_data_list.length; i++)
        updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1]);
      update_donutData(donut_chart, province_data),
        updateData(myChart, updated_data, "time series"),
        update_citywise_data("National");
    } else if ("PK-IS" === e.target.id) {
      var i;
      for (
        province_data = global_data.ICT,
          table_data = citywise_table_data("default"),
          update_table_data(),
          total_infected.textContent =
            province_data[province_data.length - 1].total_tested_positive +
            " people have been infected in Islamabad till now.",
          center_list.style.listStyleType = "disc",
          center_list.innerHTML = "",
          i = 0;
        i < hospital_links[hospital_zones.IS].length;
        i++
      )
        center_list.appendChild(hospital_links[hospital_zones.IS][i]);
      weekly_data_list = weekly_data(province_data, "province");
      for (var updated_data = [], i = 0; i < weekly_data_list.length; i++)
        updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1]);
      update_donutData(donut_chart, province_data),
        updateData(myChart, updated_data, "time series"),
        update_citywise_data("National");
    } else if ("PK-GB" === e.target.id) {
      var i;
      for (
        province_data = global_data.GB,
          table_data = citywise_table_data("default"),
          update_table_data(),
          total_infected.textContent =
            province_data[province_data.length - 1].total_tested_positive +
            " people have been infected in Gilgit-Baltistan till now.",
          center_list.style.listStyleType = "disc",
          center_list.innerHTML = "",
          i = 0;
        i < hospital_links[hospital_zones.GB].length;
        i++
      )
        center_list.appendChild(hospital_links[hospital_zones.GB][i]);
      weekly_data_list = weekly_data(province_data, "province");
      for (var updated_data = [], i = 0; i < weekly_data_list.length; i++)
        updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1]);
      update_donutData(donut_chart, province_data),
        updateData(myChart, updated_data, "time series"),
        update_citywise_data("National");
    } else if ("PK-BA" === e.target.id) {
      var i;
      for (
        province_data = global_data.Balochistan,
          table_data = citywise_table_data("Balochistan"),
          update_table_data(),
          total_infected.textContent =
            province_data[province_data.length - 1].total_tested_positive +
            " people have been infected in Balochistan till now.",
          center_list.style.listStyleType = "disc",
          center_list.innerHTML = "",
          i = 0;
        i < hospital_links[hospital_zones.BA].length;
        i++
      )
        center_list.appendChild(hospital_links[hospital_zones.BA][i]);
      weekly_data_list = weekly_data(province_data, "province");
      for (var updated_data = [], i = 0; i < weekly_data_list.length; i++)
        updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1]);
      update_donutData(donut_chart, province_data),
        updateData(myChart, updated_data, "time series"),
        update_citywise_data("Balochistan");
    }
    var selected_province = document.getElementById(e.target.id),
      x;
    for (x of all_provinces) x.style.fill = "#000000";
    (document.getElementById("PK-IS").style.fill = "#d4d4d4"),
      (document.getElementById("PK-AK").style.fill = "#585858"),
      "PK-KP" == selected_province.id || "PK-TA" == selected_province.id
        ? ((document.getElementById("PK-KP").style.fill = "#e48438"),
          (document.getElementById("PK-TA").style.fill = "#e48438"))
        : (selected_province.style.fill = "#e48438");
  }
}
var tips = [
  "Tip: Click on a province to populate the page with its info.",
  "Tip: Scroll down to take a look at the trends.",
  "Tip: Contact on one of the helplines given below, in case of emergency.",
];
function update_tip_text() {
  var tip_text = document.getElementById("tip-text");
  tip_text.textContent == tips[0]
    ? (tip_text.textContent = tips[1])
    : tip_text.textContent == tips[1]
    ? (tip_text.textContent = tips[2])
    : tip_text.textContent == tips[2] && (tip_text.textContent = tips[0]),
    (tip_text.style.fontStyle = "italic");
}
function update_timeSeries(chart, data) {
  new_data = [[], [], [], []];
  for (var a = 0; a < data.length; a++) {
    for (var i = 0; i < data[a].length; i++)
      new_data[0].push({
        x: new Date(data[a][i].date),
        y: data[a][i].total_discharged,
      }),
        new_data[1].push({
          x: new Date(data[a][i].date),
          y: data[a][i].total_admitted,
        }),
        new_data[2].push({
          x: new Date(data[a][i].date),
          y: data[a][i].total_died,
        }),
        new_data[3].push({
          x: new Date(data[a][i].date),
          y: data[a][i].total_tested_positive,
        });
    break;
  }
  (chart.data.datasets[0].data = new_data[0]),
    (chart.data.datasets[1].data = new_data[1]),
    (chart.data.datasets[2].data = new_data[2]),
    (chart.data.datasets[3].data = new_data[3]),
    chart.clear(),
    chart.update();
}
function update_donutData(chart, data) {
  (new_data = []),
    new_data.push(data[data.length - 1].total_admitted),
    new_data.push(data[data.length - 1].total_discharged),
    new_data.push(data[data.length - 1].total_died),
    (chart.data.datasets[0].data = new_data),
    chart.update();
}
function updateData(chart, data, type) {
  "donut" === type
    ? (chart.data.datasets[0].data = data)
    : "time series" === type &&
      ((chart.data.datasets[0].data = data[0]),
      (chart.data.datasets[1].data = data[1]),
      (chart.data.datasets[2].data = data[2]),
      (chart.data.datasets[3].data = data[3])),
    chart.update();
}
function reset_to_default() {
  (total_infected.textContent =
    a[0] + " people have been infected in Pakistan till now."),
    (center_list.style.listStyleType = "none"),
    (center_list.innerHTML = ""),
    (weekly_data_list = weekly_data(n, "national"));
  for (var updated_data = [], i = 0, x; i < weekly_data_list.length; i++)
    updated_data.push(weekly_data_list[i][weekly_data_list[i].length - 1]);
  for (x of (updateData(donut_chart, a, "donut"),
  updateData(myChart, updated_data, "time series"),
  update_citywise_data("National"),
  (table_data = citywise_table_data("default")),
  update_table_data(),
  all_provinces))
    x.style.fill = "#000000";
  (document.getElementById("PK-IS").style.fill = "#d4d4d4"),
    (document.getElementById("PK-AK").style.fill = "#585858"),
    (last_selected_zone = "PK");
}
function highlight(e) {
  "PK-TA" == e.target.id || "PK-KP" == e.target.id
    ? ((document.getElementById("PK-KP").style.fill = "#e48438"),
      (document.getElementById("PK-TA").style.fill = "#e48438"))
    : (document.getElementById(e.target.id).style.fill = "#e48438");
}
function highlight_release(e) {
  "PK-KP" == e.target.id
    ? "PK-TA" == last_selected_zone && (last_selected_zone = "PK-KP")
    : "PK-TA" == e.target.id &&
      "PK-KP" == last_selected_zone &&
      (last_selected_zone = "PK-TA"),
    e.target.id !== last_selected_zone &&
      ("PK-KP" == e.target.id || "PK-TA" == e.target.id
        ? ((document.getElementById("PK-KP").style.fill = "#000000"),
          (document.getElementById("PK-TA").style.fill = "#000000"))
        : "PK-IS" == e.target.id
        ? (document.getElementById("PK-IS").style.fill = "#d4d4d4")
        : "PK-AK" == e.target.id
        ? (document.getElementById("PK-AK").style.fill = "#585858")
        : (document.getElementById(e.target.id).style.fill = "#000000"));
}
function expand_buttons(e) {
  selected_expansion_button = document.getElementById(e.target.id);
  var emergency_content = document.getElementById("emergency_content"),
    precautions_content = document.getElementById("precautions_content");
  "emergency" === e.target.id
    ? ("none" !== precautions_content.style.display &&
        (precautions_content.style.display = "none"),
      (emergency_content.style.display = "block"))
    : "precautions" === e.target.id &&
      ("none" !== emergency_content.style.display &&
        (emergency_content.style.display = "none"),
      (precautions_content.style.display = "block"));
}
var emergency = document.getElementById("emergency_content");
function startIntro() {
  var intro = introJs();
  intro.setOptions({
    steps: [
      {
        element: "#navbar",
        intro:
          "Welcome to Pakistan COVID-19 Resource Center. Click on Next to start the tutorial.",
      },
      {
        element: "#navbar",
        intro: "The dashboard is divided into 5 sections.",
      },
      {
        element: "#map",
        intro:
          "This is the map. You can click on any province to see its data.",
        position: "right",
      },
      {
        element: "#nested-general-stats",
        intro:
          "This is the general statistics section. When you click on a province on the map, the data will be shown here.",
        position: "left",
      },
      {
        element: "#donut",
        intro:
          "This doughnut chart shows current numbers for active, recorvered, and deceased cases. Hover over any colored segment to see the exact number of cases.",
        position: "left",
      },
      {
        element: "#donut",
        intro:
          "You can also click on any of the names to remove them from the chart. Try clicking on Active Cases to remove it. You can always click on them again to bring them back!",
        position: "left",
      },
      {
        element: "#donut-chart2",
        intro:
          "This doughnut chart shows current number of confirmed cases for each province. Hover over any colored segment to see the exact number of cases.",
        position: "right",
      },
      {
        element: "#donut-chart2",
        intro:
          "You can also click on any of the names to remove them from the chart. Try clicking on Sindh to remove it. You can always click on them again to bring them back!",
        position: "right",
      },
      {
        element: "#tab-row",
        intro: "Click on any of the tabs to show the corresponding section.",
        position: "left",
      },
      {
        element: "#nested-common-symp",
        intro:
          "This section lists some of the most common symptoms for COVID-19.",
        position: "left",
      },
      {
        element: "#headingOne",
        intro: "Click on each symptom to read more about it.",
        position: "top",
      },
      {
        element: "#nested-other-symp",
        intro: "This section lists other symptoms for COVID-19.",
        position: "left",
      },
      {
        element: "#info-sec",
        intro:
          "This section has contact information for different hospitals/health centers in the province you selected.",
        position: "right",
      },
      {
        element: "#precautions-button",
        intro:
          "In addition to contact info, you can use this button to view the necessary precautions for COVID-19 as well.",
        position: "right",
      },
      {
        element: "#trend-section-header",
        intro:
          "This is where you can see the trends for each type of case as well data for districts inside each province.",
        position: "right",
      },
      {
        element: "#trend-graph",
        intro:
          "This graph shows the trends for the same cases as the doughnut chart. Just like the doughnut chart, you can click on any of the names to remove them from the graph. Click on them again to get them back!",
        position: "top",
      },
      {
        element: "#trend_slider",
        intro:
          "Use this slider to set how far back you want to see the trends from! You can go as far back as the beginning of the pandemic.",
        position: "top",
      },
      {
        element: "#cities-graph",
        intro:
          "This graph shows number of cases for the top 12 districts (by population) for each province. If a province is not selected or the data for the selected province doesn't exist, data for provincial captials will be shown.",
        position: "top",
      },
      {
        element: "#viewmore-cities-button",
        intro:
          "Click this to view all the available data for each district of the chosen province.",
        position: "bottom",
      },
      {
        element: "#prediction-graph",
        intro:
          "This graph shows a prediction for the number of cases for the next 14 days. Keep in mind that this is only a prediction.",
        position: "right",
      },
      {
        element: "#prediction-accuracy",
        intro:
          "This graph shows a comparison between the predictions alongwith the data for the days that have already elapsed so you can see how accurate the predictions were!",
        position: "left",
      },
      {
        element: "#viewmore-button",
        intro: "Click this to see a more detailed prediction graph!",
        position: "left",
      },
      {
        element: "#time-series-prediction-details",
        intro:
          "This graph provides more details about the predictions. Between the Upper and Lower Confidence Interval is the range in which the predictions are most likely to lie.",
        position: "right",
      },
      {
        element: "#factchecking-section-header",
        intro:
          "This section shows some of the prevailing myths, misconceptions as well as facts regarding COVID-19 and to what extent they are true.",
        position: "bottom",
      },
      {
        element: "#factheadingOne",
        intro:
          "Click on each fact to learn more about it and view the source of information as well.",
        position: "bottom",
      },
      {
        element: "#contributors-row",
        intro:
          "These are the people who built this dashboard for you and are working very hard to maintain it everyday! 👏",
        position: "top",
      },
      {
        element: "#feedback-button",
        intro: "You can give feedback about this dashboard by clicking here.",
        position: "bottom",
      },
      {
        element: "#tutorial-button",
        intro: "Click here to start the tutorial again at any time!",
        position: "bottom",
      },
      {
        element: "#navbar",
        intro:
          "And that is all you need to know to use this dashboard. Stay safe, stay indoors! Click on Done to finish the tutorial.",
        position: "bottom",
      },
    ],
  }),
    intro.setOption("showProgress", !0),
    intro.setOption("showBullets", !1),
    intro.setOption("exitOnOverlayClick", "false"),
    intro.onbeforechange(function (nextElement) {
      "nested-common-symp" === nextElement.id && $("#tab-common-symp").click(),
        "nested-other-symp" === nextElement.id && $("#tab-other-symp").click(),
        "precautions-button" === nextElement.id &&
          $("#precautions-button").click(),
        "viewmore-cities-button" === nextElement.id &&
          "View More Details" === $("#viewmore-cities-button").text() &&
          $("#viewmore-cities-button").click(),
        "time-series-prediction-details" === nextElement.id &&
          "View More Details" === $("#viewmore-button").text() &&
          $("#viewmore-button").click(),
        "feedback-button" === nextElement.id &&
          ($("#tab-general-stat").click(),
          $("#emergency").click(),
          "View Less Details" === $("#viewmore-cities-button").text() &&
            $("#viewmore-cities-button").click(),
          "View Less Details" === $("#viewmore-button").text() &&
            $("#viewmore-button").click());
    }),
    intro.start();
}
(emergency.style.display = "block"),
  (center_list.style.listStyleType = "none"),
  (center_1.textContent = ""),
  (center_2.textContent = ""),
  (center_3.textContent = "");
var slider_data = [[], [], [], []];
(slider_data[0] = myChart.data.datasets[0].data),
  (slider_data[1] = myChart.data.datasets[1].data),
  (slider_data[2] = myChart.data.datasets[2].data),
  (slider_data[3] = myChart.data.datasets[3].data);
var copy_b = JSON.parse(JSON.stringify(slider_data));
function updated_time() {
  var current = new Date(2020, 1, 1);
  for (var key in global_data)
    for (var i = 0; i < global_data[key].length; i++)
      (d = new Date(global_data[key][i].datetime_of_entry)) > current &&
        (current = d);
  update_text.textContent =
    "Last updated on: " +
    current.getDate() +
    "/" +
    (current.getMonth() + 1) +
    "/" +
    current.getFullYear();
}
function showPredictionGraph() {
  var prediction_details = new Chart(
    prediction_details_canvas,
    prediction_details_config
  );
  "hidden" ===
  document.getElementById("time-series-prediction-details").style.visibility
    ? (document.getElementById(
        "time-series-prediction-details"
      ).style.visibility = "visible")
    : "visible" ===
        document.getElementById("time-series-prediction-details").style
          .visibility &&
      (prediction_details.destroy(),
      (document.getElementById(
        "time-series-prediction-details"
      ).style.visibility = "hidden"));
}
function showCitiesTable() {
  update_table_data();
}
function display_general_stats() {
  console.log("General Stats"),
    (general_stats_section.style.display = "block"),
    (common_symp_section.style.display = "none"),
    (other_symp_section.style.display = "none"),
    (tab_general_stats.style.backgroundColor = "#8C0618"),
    (tab_common_symp.style.backgroundColor = "#59030E"),
    (tab_other_symp.style.backgroundColor = "#59030E");
}
function display_common_symp() {
  console.log("Common Symptoms"),
    (common_symp_section.style.display = "block"),
    (general_stats_section.style.display = "none"),
    (other_symp_section.style.display = "none"),
    (tab_common_symp.style.backgroundColor = "#8C0618"),
    (tab_general_stats.style.backgroundColor = "#59030E"),
    (tab_other_symp.style.backgroundColor = "#59030E");
}
function display_other_symp() {
  console.log("Other Symptoms"),
    (other_symp_section.style.display = "block"),
    (general_stats_section.style.display = "none"),
    (common_symp_section.style.display = "none"),
    (tab_other_symp.style.backgroundColor = "#8C0618"),
    (tab_common_symp.style.backgroundColor = "#59030E"),
    (tab_general_stats.style.backgroundColor = "#59030E");
}
(trend_slider.max = weekly_data_list[0].length - 1),
  (trend_slider.oninput = function () {
    for (
      var val = parseInt(this.value), updated_data = [], i = 0;
      i < weekly_data_list.length;
      i++
    )
      updated_data.push(weekly_data_list[i][val]);
    updateData(myChart, updated_data, "time series");
  }),
  $("#prediction-details").on("hidden.bs.collapse", function () {
    $("#viewmore-button").text("View More Details"), showPredictionGraph();
  }),
  $("#prediction-details").on("shown.bs.collapse", function () {
    $("#viewmore-button").text("View Less Details"), showPredictionGraph();
  }),
  $("#cities-details").on("hidden.bs.collapse", function () {
    $("#viewmore-cities-button").text("View More Details"), showCitiesTable();
  }),
  $("#cities-details").on("shown.bs.collapse", function () {
    $("#viewmore-cities-button").text("View Less Details"), showCitiesTable();
  }),
  $("#viewmore-susceptibility-button").click(function (event) {
    "View More Details" === $("#viewmore-susceptibility-button").text()
      ? $("#viewmore-susceptibility-button").text("View Less Details")
      : "View Less Details" === $("#viewmore-susceptibility-button").text() &&
        $("#viewmore-susceptibility-button").text("View More Details");
  }),
  $("#viewmore-transmission-button").click(function (event) {
    "View More Details" === $("#viewmore-transmission-button").text()
      ? $("#viewmore-transmission-button").text("View Less Details")
      : "View Less Details" === $("#viewmore-transmission-button").text() &&
        $("#viewmore-transmission-button").text("View More Details");
  }),
  $("#collapse5").on("shown.bs.collapse", function (event) {
    event.stopPropagation();
  }),
  $("#collapse5").on("hidden.bs.collapse", function (event) {
    event.stopPropagation();
  }),
  $("#collapse6").on("shown.bs.collapse", function (event) {
    event.stopPropagation();
  }),
  $("#collapse6").on("hidden.bs.collapse", function (event) {
    event.stopPropagation();
  }),
  $("#collapse8").on("shown.bs.collapse", function (event) {
    event.stopPropagation();
  }),
  $("#collapse8").on("hidden.bs.collapse", function (event) {
    event.stopPropagation();
  }),
  $("#collapse9").on("shown.bs.collapse", function (event) {
    event.stopPropagation();
  }),
  $("#collapse9").on("hidden.bs.collapse", function (event) {
    event.stopPropagation();
  }),
  $("#tutorial_modal").modal();
