const chartContainer = document.querySelector('.chart');
const chartDayExpenses = document.querySelector('#expenses-by-day-chart');

fetch('./src/data/data.json')
  .then(response => response.json())
  .then(data => {
    const labels = data.map(item => item.day);
    const amounts = data.map(item => item.amount);
    createChart(labels, amounts);
  })
  .catch(error => {
    console.error('Error:', error);
  });

const colorMax = ['hsl(186, 34%, 60%)', 'hsl(186, 34%, 60%, 0.7)'];
const colorDefault = ['hsl(10, 79%, 65%)', 'hsl(10, 79%, 65%, 0.7)'];

function createChart(labels, amounts) {

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
          ticks: {
            font: {
              size: 15
            }
          }
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
        tooltip: {
          enabled: false,
          position: 'average',
          external: function(context) {
            let tooltipEl = document.getElementById('chartjs-tooltip');

            // Create tooltip element if it doesn't exist
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.classList.add('tooltip');
              chartContainer.append(tooltipEl);
            }

            // Hide tooltip if it's not visible
            if (context.tooltip.opacity === 0) {
              tooltipEl.style.opacity = '0';
              return;
            }

            // Set tooltip content
            tooltipEl.innerHTML = '$' + context.tooltip.dataPoints[0].raw;

            // Set tooltip position
            tooltipEl.style.left = context.tooltip.caretX - (tooltipEl.offsetWidth / 2) + 'px';
            tooltipEl.style.top = context.tooltip.caretY - tooltipEl.offsetHeight - 10 + 'px';
            tooltipEl.style.opacity = '1';
          }
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
    },
  });
}