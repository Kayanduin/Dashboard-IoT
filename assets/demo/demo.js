/*
-------------------------------------------------------------
FIREBASE CONFIG
-------------------------------------------------------------
*/

var tempStream = 0;
var humidityStream = 0;
var ultraStream = 0;
var lightStream = 0;
var sensorPresenca;

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA43cFkz3-fQjMvh6J3ABp7k1TjYvB4jGE",
    authDomain: "sist-distribuidos-f4dfb.firebaseapp.com",
    databaseURL: "https://sist-distribuidos-f4dfb.firebaseio.com",
    projectId: "sist-distribuidos-f4dfb",
    storageBucket: "sist-distribuidos-f4dfb.appspot.com",
    messagingSenderId: "1037688823491",
    appId: "1:1037688823491:web:a70551246d2a7cdd060c76",
    measurementId: "G-Y1VLE3L5WQ"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.database();

const inputPresenca = document.querySelector("#presenca");
const inputPorta = document.querySelector("#porta");
const docRef = firestore.ref("sala");

function set_ar(){
  if(document.getElementById("set_ar").checked == true)
    firestore.ref("sala/set_ar").set(1);
  else
  firestore.ref("sala/set_ar").set(0);
};

function set_porta(){
  if(document.getElementById("set_porta").checked == true)
    firestore.ref("sala/set_porta").set(1);
  else
  firestore.ref("sala/set_porta").set(0);
};

function set_luminosidade(){
  if(document.getElementById("set_luminosidade").checked == true)
    firestore.ref("sala/set_luminosidade").set(1);
  else
  firestore.ref("sala/set_luminosidade").set(0);
};

function set_multimidia(){
  if(document.getElementById("set_multimidia").checked == true)
    firestore.ref("sala/set_multimidia").set(1);
  else
  firestore.ref("sala/set_multimidia").set(0);
};

getUpdate = function() {

    docRef.on('value', function (doc){
        if (doc && doc.exists) {
            const myData = doc.val();
            tempStream = myData.temperatura;
            humidityStream = myData.umidade;
            ultraStream = myData.ultrasom;
            lightStream = myData.luminosidade;

            if(myData.presenca == 1)
              inputPresenca.innerText = "Sensor de presença:   Existe alguém no local ";
            else if (myData.presenca == 0 ) 
              inputPresenca.innerText = "Sensor de presença:   A sala está vazia ";
            else
              inputPresenca.innerText = "Sensor de presença:   Erro na leitura do sensor!";
            if(myData.porta == 1)
              inputPorta.innerText = "Estado da porta:   A porta está fechada";
            else if (myData.porta == 0 ) 
              inputPorta.innerText = "Estado da porta:   A porta está aberta";
            else
              inputPorta.innerText = "Estado da porta:   Erro na leitura do sensor!";
            if(myData.set_ar == 1)
              document.getElementById("set_ar").checked = true;
            else if(myData.set_ar == 0)
              document.getElementById("set_ar").checked = false;
            if(myData.set_porta == 1)
              document.getElementById("set_porta").checked = true;
            else if(myData.set_porta == 0)
              document.getElementById("set_porta").checked = false;
              if(myData.set_luminosidade == 1)
              document.getElementById("set_luminosidade").checked = true;
            else if(myData.set_luminosidade == 0)
              document.getElementById("set_luminosidade").checked = false;
              if(myData.set_multimidia == 1)
              document.getElementById("set_multimidia").checked = true;
            else if(myData.set_multimidia == 0)
              document.getElementById("set_multimidia").checked = false;
        }
    })
/*
    docRef.onSnapshot(function (doc){
        if (doc && doc.exists) {
            const myData = doc.data();
            
        }
    })
    */
}

getUpdate();

/*
-------------------------------------------------------------
FIREBASE CONFIG
-------------------------------------------------------------
*/


var updateInterval = 1000;
var numberElements = 60;
var updateCount = 0;

type = ['primary', 'info', 'success', 'warning', 'danger'];

demo = {

  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  initTempChart: function(){

    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          display: true,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 50,
            padding: 10,
            fontColor: "#9a9a9a"
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'second',
            displayFormats: {
              
              second : 'h:mm:ss a'
            }
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          },
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    ctx = document.getElementById('tempChart').getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(119,52,169,0)");
    gradientFill.addColorStop(1, "rgba(72,72,176,0.2)");

    tempChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        datasets: [{
          label: 'Temperatura',
          borderColor: "#d048b6",
          pointBorderColor: 'rgba(255,255,255,0)',
          pointBackgroundColor: "#d048b6",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: new Array()
        }]
      },
      options : gradientChartOptionsConfiguration
    });

  },

  addTempData : function(){
  var newTemp = {x : new Date(), y : tempStream};
  
  if(tempChart){
    tempChart.data.labels.push(new Date());
    tempChart.data.datasets.forEach((dataset) => {dataset.data.push(newTemp)});
    if(updateCount > numberElements){
      tempChart.data.labels.shift();
      tempChart.data.datasets[0].data.shift();
      }
    else updateCount++;
    tempChart.update();
    }
  },

  initHumidityChart : function(){

    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {

        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          display: true,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 60,
            padding: 10,
            fontColor: "#2380f7"
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'second',
            displayFormats: {
              second : 'h:mm:ss a'
            }
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          },
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    ctx = document.getElementById('humidityChart').getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(119,52,169,0)");
    gradientFill.addColorStop(1, "rgba(72,72,176,0.2)");

    humidityChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        datasets: [{
          label: 'Umidade',
          backgroundColor: gradientStroke,
          borderColor: "#00d6b4",
          pointBorderColor: 'rgba(255,255,255,0)',
          pointBackgroundColor: "#00d6b4",
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: new Array()
        }]
      },
      options : gradientChartOptionsConfiguration
    });

  },

  addHumidityData : function(){
    var newHumidity = {x : new Date(), y : humidityStream};
    if(humidityChart){
      humidityChart.data.labels.push(new Date());
      humidityChart.data.datasets.forEach((dataset) => {dataset.data.push(newHumidity)});
      if(updateCount > numberElements){
        humidityChart.data.labels.shift();
        humidityChart.data.datasets[0].data.shift();
      }
      else updateCount++;
    humidityChart.update();
    }
  },

  initUltraChart : function(){

    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {

        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          display: true,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 3,
            padding: 10,
            fontColor: "#2380f7"
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'second',
            displayFormats: {
              second : 'h:mm:ss a'
            }
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          },
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    ctx = document.getElementById('ultraChart').getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, 'rgba(255,51,0,0.6)');
    gradientStroke.addColorStop(0.4, 'rgba(255,51,0,0)'); 
    gradientStroke.addColorStop(0, 'rgba(255,51,0,0)'); 

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(119,52,169,0)");
    gradientFill.addColorStop(1, "rgba(72,72,176,0.2)");

    ultraChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        datasets: [{
          label: 'Distância',
          backgroundColor: gradientStroke,
          borderColor: "#FF3300",
          pointBorderColor: 'rgba(255,255,255,0)',
          pointBackgroundColor: "#FF3300",
          pointHoverBackgroundColor: '#FF3300',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: new Array()
        }]
      },
      options : gradientChartOptionsConfiguration
    });

  },

  addUltraData : function(){
    var newUltra = {x : new Date(), y : ultraStream};
    if(ultraChart){
      ultraChart.data.labels.push(new Date());
      ultraChart.data.datasets.forEach((dataset) => {dataset.data.push(newUltra)});
      if(updateCount > numberElements){
        ultraChart.data.labels.shift();
        ultraChart.data.datasets[0].data.shift();
      }
      else updateCount++;
      ultraChart.update();
    }
  },

  initLightChart : function(){

    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {

        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          display: true,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 1023,
            padding: 10,
            fontColor: "#2380f7"
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'second',
            displayFormats: {
              second : 'h:mm:ss a'
            }
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          },
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    ctx = document.getElementById('lightChart').getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, 'rgba(255,51,0,0.6)');
    gradientStroke.addColorStop(0.4, 'rgba(255,51,0,0)'); 
    gradientStroke.addColorStop(0, 'rgba(255,51,0,0)'); 

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(119,52,169,0)");
    gradientFill.addColorStop(1, "rgba(72,72,176,0.2)");

    lightChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        datasets: [{
          label: 'Luminosidade',
          backgroundColor: gradientStroke,
          borderColor: "#ffd600",
          pointBorderColor: 'rgba(255,255,255,0)',
          pointBackgroundColor: "#ffd600",
          pointHoverBackgroundColor: '#ffd600',
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: new Array()
        }]
      },
      options : gradientChartOptionsConfiguration
    });

  },

  addLightData : function(){
    var newLight = {x : new Date(), y : lightStream};
    if(lightChart){
      lightChart.data.labels.push(new Date());
      lightChart.data.datasets.forEach((dataset) => {dataset.data.push(newLight)});
      if(updateCount > numberElements){
        lightChart.data.labels.shift();
        lightChart.data.datasets[0].data.shift();
      }
      else updateCount++;
      lightChart.update();
    }
  }

};

function updateData (){
  demo.addTempData();  
  demo.addHumidityData();
  demo.addUltraData();
  demo.addLightData();
  setTimeout(updateData, updateInterval);
  
};