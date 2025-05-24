let chartInstance = null;

document.getElementById("carbonForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const carKm = parseFloat(document.getElementById("carKm").value) || 0;
  const flights = parseInt(document.getElementById("flights").value) || 0;
  const meals = parseInt(document.getElementById("meals").value) || 0;
  const electricity = parseFloat(document.getElementById("electricity").value) || 0;

  const carCO2 = carKm * 0.21 * 52;
  const flightCO2 = flights * 250;
  const foodCO2 = meals * 2.5 * 52;
  const electricityCO2 = electricity * 0.4 * 12;

  const total = carCO2 + flightCO2 + foodCO2 + electricityCO2;

  // Approx: 1 tree absorbs 21 kg CO2/year
  const trees = Math.ceil(total / 21);

  let message = `
    <h2>Your Annual Carbon Footprint</h2>
    <p><strong>${total.toFixed(1)} kg CO₂/year</strong></p>
    <p>🌳 You'd need to plant <strong>${trees}</strong> trees to offset this!</p>
  `;

  if (total > 10000) {
    message += "<p>⚠️ Try reducing car use, switching to plant-based meals, or improving home energy efficiency.</p>";
  } else if (total < 5000) {
    message += "<p>✅ Great job! Your footprint is below the global average.</p>";
  } else {
    message += "<p>🔍 Consider flying less and making energy-efficient upgrades.</p>";
  }

  const results = document.getElementById("results");
  results.innerHTML = message;
  results.style.display = "block";

  const ctx = document.getElementById("co2Chart").getContext("2d");

  const data = {
    labels: ["Car Travel", "Flights", "Meat Meals", "Electricity"],
    datasets: [{
      data: [carCO2, flightCO2, foodCO2, electricityCO2],
      backgroundColor: ["#43a047", "#fb8c00", "#e53935", "#29b6f6"],
      borderWidth: 1,
    }],
  };

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: "CO₂ Emissions Breakdown"
        }
      }
    },
  });
});
