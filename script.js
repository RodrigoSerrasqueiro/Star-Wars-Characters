let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = async () => {
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar cards');
  }

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);

  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadCharacters(url) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Limpa os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
      card.className = "cards"
      const characterNameBG = document.createElement("div")
      characterNameBG.className = "character-name-bg"
      const characterName = document.createElement("span")
      characterName.className = "character-name"
      characterName.innerText = `${character.name}`
      characterNameBG.appendChild(characterName)
      card.appendChild(characterNameBG)
      const mainContent = document.getElementById('main-content');
      mainContent.appendChild(card);

    });

    // Habilita ou desabilita os botões de acordo com a presença de URLs de próxima e página anterior
    const nextButton = document.getElementById('next-button');
    nextButton.disabled = !responseJson.next;
    const backButton = document.getElementById('back-button');
    backButton.disabled = !responseJson.previous;

    currentPageUrl = url;
  } catch (error) {
    throw new Error('Erro ao carregar personagens');
  }
}

async function loadNextPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.next);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar a próxima página');
  }
}

async function loadPreviousPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.previous);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar a página anterior');
  }
}