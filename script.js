const tipoDizionario = document.getElementById("tipoDizionario").className;

fetch('dizionario/' + tipoDizionario)
    .then(response => response.text())
    .then(csv => {
        const dictionary = parseCSV(csv);
        const sortedDictionary = sortDictionaryAlphabetically(dictionary);

        const searchInput = document.querySelector('#searchInput');
        const sectionContainer = document.getElementById('sectionContainer');

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const filteredDictionary = filterDictionary(sortedDictionary, searchTerm);
            loadInitialTables(filteredDictionary, sectionContainer);
        });

        loadInitialTables(sortedDictionary, sectionContainer);
        generateNavbar();
    });

function generateNavbar() {
    document.getElementById("navbarGenerale").innerHTML = `
    <a class="navbar-brand" href="index.html">
      <h1 class="navbar-heading">Dizionario</h1> <h5 class="sottoTitolo">${tipoDizionario}</h5>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="merezionario.html">Merezionario</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="bucellario.html">Bucellario</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="framuelario.html">Framuelario</a>
        </li>
      </ul>
    </div>`

}

function loadInitialTables(dictionary, container) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    container.innerHTML = '';

    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        const wordsStartingWithLetter = dictionary.filter(entry => entry.parola.toLowerCase().startsWith(letter.toLowerCase()));
        if (wordsStartingWithLetter.length > 0) {
            displayInitialTable(container, letter, wordsStartingWithLetter);
        }
    }
}

var searchCriteria = document.getElementById('search-criteria');

searchCriteria.addEventListener('change', function () {
    var selectedOption = this.value;

    // Esegui l'azione desiderata in base all'opzione selezionata
    if (selectedOption === 'parola') {
        // Esegui la ricerca per parola
        console.log('Ricerca per parola');
    } else if (selectedOption === 'spiegazione') {
        // Esegui la ricerca per spiegazione
        console.log('Ricerca per spiegazione');
    }
});


function displayInitialTable(container, letter, words) {
    const sectionId = `section${letter.toUpperCase()}`;

    const section = document.createElement('section');
    section.id = sectionId;

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = letter.toUpperCase();
    section.appendChild(sectionTitle);

    const table = createTable(words);
    section.appendChild(table);

    container.appendChild(section);
}

function createTable(words) {
    const table = document.createElement('table');
    table.classList.add('initial-table');

    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    const wordHeader = document.createElement('th');
    wordHeader.textContent = 'Parola';
    const definitionHeader = document.createElement('th');
    definitionHeader.textContent = 'Spiegazione';

    headerRow.appendChild(wordHeader);
    headerRow.appendChild(definitionHeader);
    tableHead.appendChild(headerRow);

    words.forEach(entry => {
        const row = document.createElement('tr');
        const wordCell = document.createElement('td');
        const definitionCell = document.createElement('td');

        wordCell.textContent = entry.parola;
        definitionCell.textContent = entry.spiegazione;

        row.appendChild(wordCell);
        row.appendChild(definitionCell);
        tableBody.appendChild(row);
    });

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    return table;
}

function parseCSV(csv) {
    const parsedData = Papa.parse(csv, {
        header: true
    }).data;
    return parsedData;
}

function sortDictionaryAlphabetically(dictionary) {
    const sortedDictionary = dictionary.slice().sort((a, b) => {
        const wordA = a.parola.toLowerCase();
        const wordB = b.parola.toLowerCase();
        if (wordA < wordB) {
            return -1;
        }
        if (wordA > wordB) {
            return 1;
        }
        return 0;
    });

    return sortedDictionary;
}

function filterDictionary(dictionary, searchTerm) {
    if (!searchTerm) {
        return dictionary; // Return the original dictionary if search term is empty
    }

    const filteredDictionary = dictionary.filter(entry => {
        const word = entry.parola.toLowerCase();
        return word.includes(searchTerm);
    });

    return filteredDictionary;
} 

document.addEventListener('DOMContentLoaded', function () {
    var scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 20) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    generateLetterLinks();
});

function generateLetterLinks() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letterListContainer = document.querySelector('#letterList');

    alphabet.split('').forEach(letter => {
        const letterLink = document.createElement('a');
        letterLink.textContent = letter;
        letterLink.href = `#section${letter}`;

        letterListContainer.appendChild(letterLink);
    });
}
