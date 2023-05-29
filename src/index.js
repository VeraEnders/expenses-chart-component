const chartDayExpenses = document.querySelector('#expenses-by-day-chart');

fetch('./src/data/data.json')
  .then(response => response.json())
  .then(data => {
    const labels = data.map(item => item.day);
    const amounts = data.map(item => item.amount);
    drawChart(labels, amounts);
  })
  .catch(error => {
    console.error('Error:', error);
  });

const colorMax = ['hsl(186, 34%, 60%)', 'hsl(186, 34%, 60%, 0.7)'];
const colorDefault = ['hsl(10, 79%, 65%)', 'hsl(10, 79%, 65%, 0.7)'];

function drawChart(labels, amounts) {

  // Find the index of the highest value
  let maxIndex = amounts.indexOf(Math.max(...amounts));

  // Set colors 
  let colors = amounts.map((value, index) => index === maxIndex ? colorMax[0] : colorDefault[0]);

  let colorsHover = amounts.map((value, index) => index === maxIndex ? colorMax[1] : colorDefault[1]);

  // Create the chart
  new Chart(chartDayExpenses, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '',
        data: amounts,
        backgroundColor: colors,
        hoverBackgroundColor: colorsHover,
        borderRadius: 3,
        borderSkipped: false
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          border: {
            display: false
          },
          grid: {
            display: false
          },
        },
        y: {
          beginAtZero: true,
          display: false
        }
      },
      plugins: {
        legend: {
          display: false
        },
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
    },
  });
}