//elementos do modal de criação de card
const addUserBtn = document.getElementById('addUserBtn');
const userModal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

//container dos cards
const cardContainer = document.querySelector('.card-container');

//elementos do modal de edição de card
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editName = document.getElementById('editName');
const editRole = document.getElementById('editRole');
const editPhoto = document.getElementById('editPhoto');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const deleteBtn = document.getElementById('deleteBtn');

let editingCard = null;

//abre o modal de criação de card
addUserBtn.addEventListener('click', () => {
    userModal.style.display = 'flex';
});

//fecha o modal de criação de card
cancelBtn.addEventListener('click', () => {
    userModal.style.display = 'none';
    userForm.reset();
});

//botão salvar
saveBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //dados do form
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const photoInput = document.getElementById('photo');
    const photoFile = photoInput.files[0];

    //validação de preenchimento dos campos
    if (!name || !role || !photoFile) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    //processa a URL da imagem
    const reader = new FileReader();
    reader.onload = () => {
        const imageUrl = reader.result;

        //cria o novo card
        const newCard = document.createElement('div');
        newCard.className = 'card';

        //imagem
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Foto de ${name}`;

        //nome
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = name;

        //cargo
        const roleElement = document.createElement('div');
        roleElement.className = 'role';
        roleElement.textContent = role;

        //botão de edição
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Editar';

        //monta o card com os dados do form
        newCard.appendChild(img);
        newCard.appendChild(link);
        newCard.appendChild(roleElement);
        newCard.appendChild(editBtn);

        //insere o card no container
        cardContainer.appendChild(newCard);

        //fecha o modal e limpa o form
        userModal.style.display = 'none';
        userForm.reset();
    };

    reader.readAsDataURL(photoFile);
});

//abre o modal de edição de form
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        editingCard = event.target.parentElement;

        //preenche os campos com os dados do card
        const currentName = editingCard.querySelector('a').textContent;
        const currentRole = editingCard.querySelector('.role').textContent;

        editName.value = currentName;
        editRole.value = currentRole;

        //exibe o modal
        editModal.style.display = 'flex';
    }
});

//salva as alterações do card
saveEditBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (editingCard) {
        const updatedName = editName.value;
        const updatedRole = editRole.value;
        const updatedPhoto = editPhoto.files[0];

        editingCard.querySelector('a').textContent = updatedName;
        editingCard.querySelector('.role').textContent = updatedRole;

        if (updatedPhoto) {
            const reader = new FileReader();
            reader.onload = () => {
                editingCard.querySelector('img').src = reader.result;
            };
            reader.readAsDataURL(updatedPhoto);
        }

        editModal.style.display = 'none';
    }
});

//exclui o card
deleteBtn.addEventListener('click', () => {
    if (editingCard) {
        editingCard.remove();
        editModal.style.display = 'none';
    }
});

//botão cancelar
cancelEditBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
});
