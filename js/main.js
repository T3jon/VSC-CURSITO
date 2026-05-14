const API_URL = 'https://www.freetogame.com/api/games';

function createGamesContainer() {
  let container = document.getElementById('games');
  if (!container) {
    container = document.createElement('div');
    container.id = 'games';
    container.style.maxWidth = '900px';
    container.style.margin = '1rem auto';
    container.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(container);
  }
  return container;
}

function formatGameCard(game) {
  const card = document.createElement('article');
  card.style.display = 'grid';
  card.style.gridTemplateColumns = '120px 1fr';
  card.style.gap = '1rem';
  card.style.padding = '1rem';
  card.style.border = '1px solid #ccc';
  card.style.borderRadius = '8px';
  card.style.marginBottom = '1rem';
  card.style.alignItems = 'center';
  card.style.background = '#fafafa';

  const img = document.createElement('img');
  img.src = game.thumbnail;
  img.alt = game.title;
  img.style.width = '100%';
  img.style.borderRadius = '8px';
  img.style.objectFit = 'cover';
  img.style.maxHeight = '90px';

  const info = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = game.title;
  title.style.margin = '0 0 0.3rem';
  title.style.fontSize = '1.1rem';

  const genre = document.createElement('p');
  genre.textContent = `Género: ${game.genre}`;
  genre.style.margin = '0 0 0.4rem';
  genre.style.color = '#555';

  const platform = document.createElement('p');
  platform.textContent = `Plataforma: ${game.platform}`;
  platform.style.margin = '0';
  platform.style.color = '#555';

  info.appendChild(title);
  info.appendChild(genre);
  info.appendChild(platform);
  card.appendChild(img);
  card.appendChild(info);

  return card;
}

async function loadGames() {
  const container = createGamesContainer();
  const heading = document.createElement('h1');
  heading.textContent = 'Juegos gratuitos';
  heading.style.textAlign = 'center';
  heading.style.marginBottom = '1rem';
  container.appendChild(heading);

  const status = document.createElement('p');
  status.textContent = 'Cargando juegos...';
  status.style.textAlign = 'center';
  status.style.color = '#777';
  container.appendChild(status);

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const games = await response.json();
    status.remove();

    if (!Array.isArray(games) || games.length === 0) {
      status.textContent = 'No se encontraron juegos.';
      container.appendChild(status);
      return;
    }

    const list = document.createElement('div');
    games.slice(0, 12).forEach((game) => {
      list.appendChild(formatGameCard(game));
    });
    container.appendChild(list);
  } catch (error) {
    status.textContent = `No se pudo cargar la lista de juegos. ${error.message}`;
    status.style.color = 'red';
  }
}

window.addEventListener('DOMContentLoaded', loadGames);
