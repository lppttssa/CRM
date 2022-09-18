(function() {

    const createInputSearch = () => {
        const inputSearch = document.createElement('input');
        inputSearch.classList.add('input-search');
        inputSearch.placeholder = 'Введите запрос';
        
        return inputSearch;
    };

    const getClients = async () => {
        const response = await fetch('http://localhost:3000/api/clients');
        const data = await response.json();
        console.log(data);
        return data;
    };

    const shapeDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return {
            date: date.toLocaleDateString(),
            time: date.getHours() + ':' + date.getMinutes(),
        };
    };

    const shapeClientInfo = (clientInfo) => {
        const dateTimeCreation = shapeDateTime(clientInfo.createdAt);
        const dateTimeUpdate = shapeDateTime(clientInfo.updatedAt);
        return {
            id: clientInfo.id.slice(0, 6),
            name: clientInfo.name.concat(' ', clientInfo.lastName, ' ', clientInfo.surname),
            createdAt: {
                date: dateTimeCreation.date,
                time: dateTimeCreation.time,
            },
            updatedAt: {
                date: dateTimeUpdate.date,
                time: dateTimeUpdate.time,
            },
            contacts: {...clientInfo.contacts},
        };
    };

    const createContact = (contact) => {
        const img = document.createElement('img');
        img.classList.add('contact-icon')
        console.log(contact)
        if (contact.type === 'vk') {
            img.src = './assets/contacts/vk.svg';
        } else if (contact.type === 'email') {
            img.src = './assets/contacts/mail.svg';
        } else if (contact.type === 'phone') {
            img.src = './assets/contacts/phone.svg';
        } else if (contact.type === 'fb') {
            img.src = './assets/contacts/fb.svg';
        } else {
            img.src = './assets/contacts/other.svg';
        }
        return img;
    };

    const createBtnChange = () => {
        const btn = document.createElement('button');
        btn.classList.add('btn-change');
        btn.classList.add('btn');
        btn.textContent = 'Изменить';
        return btn;
    };

    const createBtnDelete = () => {
        const btn = document.createElement('button');
        btn.classList.add('btn-delete');
        btn.classList.add('btn');
        btn.textContent = 'Удалить';
        return btn;
    };

    const createClientRow = (clientInfo) => {
        const row = document.createElement('li');
        row.classList.add('list-row')
        const client = shapeClientInfo(clientInfo);
        console.log(client)
        row.classList.add('user-item');


        const id = document.createElement('span');
        id.classList.add(`table-column-1`);
        id.classList.add('table-content-text')
        id.classList.add('table-content-text-gray')
        id.textContent = client.id;
        row.append(id);

        
        const name = document.createElement('span');
        name.classList.add(`table-column-2`);
        name.classList.add('table-content-text')
        name.classList.add('table-content-text-black')
        name.textContent = client.name;
        row.append(name);


        for (let i = 0 ; i < 2; i++) {
            const info = i === 0 ? client.createdAt : client.updatedAt;
            const div = document.createElement('div');
            div.classList.add('user-item');
            div.classList.add(`table-column-${i+3}`);
    
            const date = document.createElement('div');
            date.classList.add('table-content-text')
            date.classList.add('table-content-text-black')
            date.classList.add('table-date')
            date.textContent = info.date;
            div.append(date);
    
            const time = document.createElement('span');
            time.classList.add('table-content-text')
            time.classList.add('table-content-text-gray')
            time.textContent = info.time;
            div.append(time);
            row.append(div);
        }

        const contactsContainer = document.createElement('div');
        contactsContainer.classList.add('user-item');
        contactsContainer.classList.add('table-column-5');
        
        for (let i in client.contacts) {
            console.log(client.contacts[i])
            const contact = createContact(client.contacts[i]);
            
            contactsContainer.append(contact);
        }
        row.append(contactsContainer);

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('user-item');
        btnContainer.classList.add('table-column-6')

        const btnChange = createBtnChange();
        const btnDelete = createBtnDelete();
        btnContainer.append(btnChange);
        btnContainer.append(btnDelete);

        row.append(btnContainer);
        
        return row;

    };

    const renderClients = (clients, list) => {
        for (let i = 0; i < clients.length; i++) {
            let row = createClientRow(clients[i]);
            list.append(row);
        }
    };

    const createTableTitle = (name) => {
        const elContainer = document.createElement('div');  
        const title = document.createElement('span');
        title.classList.add('list-title');
        title.textContent = name;

        const img = document.createElement('img');
        img.src = './assets/arrow_downward.svg';

        elContainer.append(title);
        elContainer.append(img);

        return elContainer;
    };

    const createTableTitles = () => {
        const titles = [{name: 'ID'}, {name: 'Фамилия Имя Отчество'}, 
        {name: 'Дата и время создания'}, {name: 'Последние изменения'}, 
        {name: 'Контакты'}, {name: 'Действия'}];

        const li = document.createElement('li');
        li.classList.add('user-item');
        li.classList.add('table-title-container')

        for (let i = 0; i < titles.length; i++) {
            const element = createTableTitle(titles[i].name)
            element.classList.add(`table-column-${i+1}`)
            li.append(element);
        }

        return li;
    };

    const createCRM = async (container, inputLi, mainContent, usersList) => {
        const inputSearch = createInputSearch();
        inputLi.append(inputSearch);
        
        const tableTitle = createTableTitles();
        console.log(tableTitle)
        usersList.append(tableTitle);

        const clients = await getClients();
        renderClients(clients, usersList);

    };

    window.createCRM = createCRM;
})();