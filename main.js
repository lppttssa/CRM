(function() {

    const createInputSearch = () => {
        const inputSearch = document.createElement('input');
        inputSearch.classList.add('input-search');
        
        return inputSearch;
    };

    const renderUser = () => {

    };

    const createTableTitle = (name) => {
        const elContainer = document.createElement('div');
        elContainer.classList.add('table-title-container');

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

        for (let i = 0; i < titles.length; i++) {
            const element = createTableTitle(titles[i].name)
            element.classList.add(`table-column-${i+1}`)
            li.append(element);
        }

        return li;
    };

    const createCRM = (container, inputLi, mainContent, usersList) => {
        const inputSearch = createInputSearch();
        inputLi.append(inputSearch);
        
        const tableTitle = createTableTitles();
        console.log(tableTitle)
        usersList.append(tableTitle);

    };

    window.createCRM = createCRM;
})();