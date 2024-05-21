

const root = document.getElementById('root');
const nameInput = document.getElementById('nameInput');
const add = document.getElementById('add');

let nameList = localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : [];

const render = () => {
    root.innerHTML = '';
    nameList.forEach(item => {
        root.innerHTML += `<div id="name_${item.id}">
                                <h1>${item.name}</h1>
                                <button onclick="editName(${item.id})">Edit</button>
                                <button onclick="deleteName(${item.id})">Delete</button>
                           </div>`;
    });
};

render();

add.onclick = () => {
    if (nameInput.value.trim()) {
        nameList = [
            {
                id: nameList.length === 0 ? 1 : nameList[0].id + 1,
                name: nameInput.value.trim()
            },
            ...nameList
        ];
        localStorage.setItem('name', JSON.stringify(nameList));
        render();
        nameInput.value = ''; 
    }
};

const deleteName = (id) => {
    nameList = nameList.filter(item => id !== item.id);
    localStorage.setItem('name', JSON.stringify(nameList));
    render();
};

const editName = (id) => {
    const nameDiv = document.getElementById(`name_${id}`);
    const newNameInput = document.createElement('input');
    newNameInput.type = 'text';
    newNameInput.value = nameList.find(item => item.id === id).name;
    
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = () => {
        const newName = newNameInput.value.trim();
        if (newName) {
            nameList = nameList.map(item => {
                if (item.id === id) {
                    return { id: item.id, name: newName };
                }
                return item;
            });
            localStorage.setItem('name', JSON.stringify(nameList));
            render();
        }
    };
    
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = () => {
        render();
    };
    
    nameDiv.innerHTML = '';
    nameDiv.appendChild(newNameInput);
    nameDiv.appendChild(saveButton);
    nameDiv.appendChild(cancelButton);
};






