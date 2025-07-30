document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('btnSearch');
    const clearBtn = document.getElementById('clear');
    const searchInput = document.getElementById('searchV');
    const resultDiv = document.getElementById('results');

    searchBtn.addEventListener('click', () => {
      const keyword = searchInput.value.toLowerCase().trim();
      fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
          console.log(data); // Vérifie les données
          displayResults(keyword, data);
        })
        .catch(err => console.error('Erreur chargement JSON:', err));
    });

    clearBtn.addEventListener('click', () => {
      resultDiv.innerHTML = '';
      searchInput.value = '';
    });

    function displayResults(keyword, data) {
      resultDiv.innerHTML = '';
      let results = [];

      if (keyword.includes("plage") || keyword.includes("beach")) {
        results = data.beaches;
      } else if (keyword.includes("temple")) {
        results = data.temples;
      } else {
        const matchedCountry = data.countries.find(c =>
          c.name.toLowerCase().includes(keyword)
        );
        if (matchedCountry) {
          results = matchedCountry.cities;
        }
      }

      if (results.length === 0) {
        resultDiv.innerHTML = "<p>Aucun résultat trouvé.</p>";
      } else {
        results.slice(0, 2).forEach(item => {
          const card = document.createElement('div');
          card.style.border = "1px solid #ccc";
          card.style.padding = "1rem";
          card.style.marginBottom = "1rem";
          card.style.backgroundColor = "#f9f9f9";

          card.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.imageUrl}" alt="${item.name}" style="width:300px;height:auto;">
            <p>${item.description}</p>
          `;
          resultDiv.appendChild(card);
        });
      }
    }
  });