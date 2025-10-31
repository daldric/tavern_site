fetch('home/hours.csv')
  .then(response => response.text())
  .then(csvText => {
    const data = Papa.parse(csvText, { header: true }).data;

    const hoursDiv = document.getElementById('hours');
    data.forEach(item => {
      if (!item.day) return; // Skip empty rows
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `<strong>${item.day} - ${item.hours}</strong>`;
      hoursDiv.appendChild(itemDiv);
    });
  })
  .catch(err => console.error('Error loading CSV:', err));
