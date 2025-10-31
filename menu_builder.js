fetch('menu.csv')
  .then(response => response.text())
  .then(csvText => {
    const data = Papa.parse(csvText, { header: true }).data;

    // Group items by category
    const categories = {};
    data.forEach(item => {
      if (!item.name || !item.category) return;
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    const menuDiv = document.getElementById('menu');

    // Build each category section
    Object.keys(categories).forEach(category => {
      const section = document.createElement('section');
      const header = document.createElement('h3');
      header.textContent = category;
      section.appendChild(header);

      categories[category].forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `- <strong>${item.name}</strong> ($${item.price}) - <em>${item.description || ''}</em>`;
        section.appendChild(itemDiv);
      });

      menuDiv.appendChild(section);
    });
  })
  .catch(err => console.error('Error loading CSV:', err));
