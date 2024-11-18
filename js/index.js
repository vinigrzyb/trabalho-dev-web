// Selecionar os elementos do modal e do formulário
const userModal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');
const addUserBtn = document.getElementById('addUserBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const cardContainer = document.querySelector('.card-container');

//abre o modal
addUserBtn.addEventListener('click', () => {
    userModal.style.display = 'flex'; // Exibe o modal
});

//fecha o modal
cancelBtn.addEventListener('click', () => {
    userModal.style.display = 'none';
    userForm.reset();
});

//botão salvar
saveBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //pega os valores do form
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const photoInput = document.getElementById('photo');
    const photoFile = photoInput.files[0];

    // Validação: Certifique-se de que todos os campos estão preenchidos
    if (!name || !role || !photoFile) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    //ler arquivo do upload
    const reader = new FileReader();
    reader.onload = () => {
        const imageUrl = reader.result; //URL

        //cria novo card
        const newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.style.backgroundImage = `url(${imageUrl})`;

        const link = document.createElement('a');
        link.href = '#'; //link para o perfil?
        link.textContent = name;

        const roleElement = document.createElement('div');
        roleElement.className = 'role';
        roleElement.textContent = role;

        newCard.appendChild(link);
        newCard.appendChild(roleElement);

        //adiciona o card no containter
        cardContainer.appendChild(newCard);

        //fecha o modal
        userModal.style.display = 'none';
        userForm.reset();
    };

    reader.readAsDataURL(photoFile);
});

//fecha o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === userModal) {
        userModal.style.display = 'none';
        userForm.reset();
    }
});
