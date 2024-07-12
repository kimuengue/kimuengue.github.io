const API_BASE_URL = "https://openlibrary.org";
let currentPage = 1;

// Função para buscar livros
async function fetchBooks(query, page = 1) {
    const response = await fetch(`${API_BASE_URL}/search.json?q=${query}&page=${page}`);
    const data = await response.json();
    return data.docs;
}

// Função para exibir livros
function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.innerHTML = `
            <img src="${book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'placeholder.jpg'}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p>Autor: ${book.author_name ? book.author_name.join(', ') : 'Desconhecido'}</p>
            <a href="${book.key ? `${API_BASE_URL}${book.key}` : '#'}" target="_blank">Ler Online</a>
        `;
        bookList.appendChild(bookElement);
    });
}

// Evento de pesquisa
document.getElementById('search').addEventListener('input', async function() {
    const searchTerm = this.value;
    currentPage = 1;
    document.getElementById('book-list').innerHTML = '';
    if (searchTerm) {
        const books = await fetchBooks(searchTerm, currentPage);
        displayBooks(books);
    }
});

// Exibir livros iniciais
fetchBooks('livros', currentPage).then(displayBooks);

// Rolagem contínua
window.addEventListener('scroll', async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        currentPage++;
        const searchTerm = document.getElementById('search').value || 'livros';
        const books = await fetchBooks(searchTerm, currentPage);
        displayBooks(books);
    }
});

// Evento de inscrição
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Inscrição realizada com sucesso!');
    this.reset();
});

// Evento de contato
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Mensagem enviada com sucesso!');
    this.reset();
});

// Botão de Voltar
document.getElementById('back-button').addEventListener('click', () => {
    window.history.back();
});

// Botão de Início
document.getElementById('home-button').addEventListener('click', () => {
    window.scrollTo(0, 0);
});
