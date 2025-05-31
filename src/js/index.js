// Implementa las Solicitudes con Fetch
const fetchBtn = document.getElementById('fetch-btn');
const dataContainer = document.getElementById('data-container');

fetchBtn.addEventListener('click', () => {
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then(data => {
      renderCharacters(data);
    })
    .catch(error => {
      console.error('Error:', error);
      dataContainer.textContent = 'Hubo un error al obtener los datos.';
    });
});

const axiosBtn = document.getElementById('axios-btn');

axiosBtn.addEventListener('click', () => {
  axios.get('https://rickandmortyapi.com/api/character')
  .then(response => {
    const data = response.data;
    renderCharacters(data);
  })
  .catch(error => {
    console.error('Error:', error);
    dataContainer.textContent = 'Hubo un error al obtener los datos.';
  });
});


function renderCharacters(characters) {
  dataContainer.innerHTML = '';
  characters.results.forEach(character =>{
    const characterHTML = `
    <div class="character-card">
    <h2>${character.name}</h2>
    <p><strong>Status:</strong> ${character.status}</p>
    <p><strong>Species:</strong> ${character.species}</p>
    <p><strong>Gender:</strong> ${character.gender}</p>
    <img src="${character.image}" alt="${character.name}">
    <button class="show-details-btn">Show More Details</button>
    <div class="details-container" style="display: none;">
    <h3>Episodes</h3>
    <ul>
    ${character.episode.map(episodeUrl => `<li><a href="${episodeUrl}" target="_blank">${episodeUrl.split('/').pop()}</a></li>`).join('')}
    </ul>
    <hr>
    <p><strong>Origin:</strong> ${character.origin.name}</p>
    <p><strong>Location:</strong> ${character.location.name}</p>
    </div>
    </div>
    `;
    
    dataContainer.insertAdjacentHTML('beforeend', characterHTML);
    
  });
}

document.querySelectorAll('.show-details-btn').forEach(button => {
    button.addEventListener('click', () => {
        const detailsContainer = button.parentElement.querySelector('.details-container');
        detailsContainer.style.display = detailsContainer.style.display === 'block' ? 'none' : 'block';
    });
});