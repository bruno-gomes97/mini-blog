const formSearchAuthoerName = document.querySelector("#search");
const formCreatePost = document.querySelector("#create-post");
const postContainer = document.querySelector("#post-container");

formSearchAuthoerName.addEventListener("submit", async (event) => {
    event.preventDefault();

    const authorNameInput = document.querySelector("#authorNameInput");

    await searchByAuthorName(authorNameInput.value);

    authorNameInput.value = ''
})

formCreatePost.addEventListener("submit", (event) => {
    event.preventDefault();

    createPost();
})


// criar elementos
const createElementHTML = (title, description) => {
    // criar h2 e p 
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    // adicionat conteúdo
    h2.textContent = `${title}`;
    p.textContent = `${description}`;

    // adicionar os elementos dentro do container
    postContainer.appendChild(h2);
    postContainer.appendChild(p);
}

// função para procurar o autor
const searchByAuthorName = async (name) => {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const { data } = resp;

    // mapeamento dos autores para seus respectivos userIds
    const authorMap = {
        bruno: 1,
        bruna: 2,
        yan: 3,
        djulian: 4,
        maila: 5,
        gabriel: 6,
        rese: 7,
        lucas: 8,
        fernanda: 9,
        juliander: 10
    }

    // Converte o nome do autor para minúsculas e busca o userId correspondente no authorMap
    const userId = authorMap[name.toLowerCase()];

    // Limpar o container de posts
    postContainer.innerHTML = ''

    if(userId) {
        data.forEach((user) => {
            if(user.userId === userId) {
                createElementHTML(user.title, user.body);
            }
        });
    } else {
        alert(`Autor ${name} não encontrado`);
    }
}

// Função para criar posts
const createPost = async() => {

    const titleInput = document.querySelector("#title");
    const bodyInput = document.querySelector("#body")


    await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: titleInput.value,
        body: bodyInput.value
    })

    alert(`Post criado com sucesso!`)

    titleInput.value = '';
    bodyInput.value = '';
}