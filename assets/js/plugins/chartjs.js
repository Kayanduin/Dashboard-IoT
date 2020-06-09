var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options:gradientChartOptionsConfiguration});

// General configuration for the charts with Line gradientStroke
gradientChartOptionsConfiguration =  {
    maintainAspectRatio: false,
    legend: {
          display: false
     },
  
     tooltips: {
       backgroundColor: '#fff',
       titleFontColor: '#333',
       bodyFontColor: '#666',
       bodySpacing: 0,
       xPadding: 12,
       mode: "nearest",
       intersect: 0,
       position: "nearest"
     },
     responsive: true,
     scales:{
       yAxes: [{
         barPercentage: 1.6,
             gridLines: {
               drawBorder: false,
                 color: 'rgba(29,140,248,0.0)',
                 zeroLineColor: "transparent",
             },
             ticks: {
               suggestedMin:50,
               suggestedMax: 110,
                 padding: 20,
                 fontColor: "#9a9a9a"
             }
           }],
  
       xAxes: [{
         barPercentage: 1.6,
             gridLines: {
               drawBorder: false,
                 color: 'rgba(220,53,69,0.1)',
                 zeroLineColor: "transparent",
             },
             ticks: {
                 padding: 20,
                 fontColor: "#9a9a9a"
             }
           }]
       }
  };