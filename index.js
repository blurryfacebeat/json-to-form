// Форма
const $send_wrapper = document.querySelector('.send-json__wrapper');

// Контейнер для формы
const $app = document.getElementById('app');

// Поле отправки JSON-файла
const sendjson = document.getElementById('sendjson');

// Кнопка очистки формы
const $clear = document.getElementById('clear__button');
$clear.style.display = 'none';

$clear.addEventListener('click', e => {
    e.preventDefault();
    $clear.style.display = 'none';

    formClear($app, $send_wrapper, sendjson);
});

// Достаем JSON из файла
sendjson.addEventListener('change', function (e) {
    try {
        const upload = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (function (file) {
            return function (e) {
                json = JSON.parse(e.target.result);
                $send_wrapper.style.display = 'none';
                $clear.style.display = 'block';
                drawForm(json, $app);
            }
        })(sendjson));
        reader.readAsText(upload);
    } catch (error) {
        console.log(error);
    }
});

// Компоненты
const components = {
    field: {
        containerOpen: '<div class="form-group">',
        labelOpen: '<label class="form-label">',
        labelClose: '</label>',
        open: '<input class="form-control"',
        inputTypeOpen: ' type="',
        inputTypeClose: '"',
        typeTechnology: 'select',
        placeholderOpen: ' placeholder="',
        placeholderClose: '"',
        required: ' required',
        multiple: ' multiple',
        filetypeOpen: ' accept="',
        filetypeClose: '"',
        close: '>',
        containerClose: '</div>'
    },
    reference: {
        containerOpen: '<div class="form-group">',
        checkboxOpen: '<input type="checkbox"',
        checkboxClose: '>',
        checked: ' checked',
        required: ' required',
        textOpen: '<span>',
        textClose: '</span>',
        linkOpen: '<a',
        hrefOpen: ' href="',
        hrefClose: '">',
        linkClose: '</a>',
        containerClose: '</div>'
    },
    button: {
        open: '<button class="form__button">',
        close: '</button>'
    }
};
// Создать элементы options
function buildField(field) {
    let newField = components.field.containerOpen;

    if (field.label) {
        newField += components.field.labelOpen + field.label + components.field.labelClose;
    }

    if (field.input.type === 'technology') { 
        newField += components.field.open + components.field.inputTypeOpen + components.field.typeTechnology + components.field.inputTypeClose;

        if (field.input.required === true) {
            newField += components.field.required;
        }

        if (field.input.multiple === true) {
            newField += components.field.multiple;
        }

        newField += components.field.close;
        newField += components.field.containerClose;

        return newField;
    }

    newField += components.field.open + components.field.inputTypeOpen + field.input.type + components.field.inputTypeClose;

    if (field.input.placeholder) {
        newField += components.field.placeholderOpen + field.input.placeholder + components.field.placeholderClose;
    }

    if (field.input.required === true) {
        newField += components.field.required;
    }

    if (field.input.multiple === true) {
        newField += components.field.multiple;
    }

    if (field.input.filetype) {
        let temp = '';
        for (let i = 0; i < field.input.filetype.length; i++) {
            if (i === field.input.filetype.length - 1) {
                temp += field.input.filetype[i];
                break;
            }
            temp += field.input.filetype[i] + ', ';
        }
        newField += components.field.filetypeOpen + temp + components.field.filetypeClose;
    }

    newField += components.field.close;
    newField += components.field.containerClose;
    return newField;
}

function buildReference(field) {
    let newReference = components.reference.containerOpen;

    if (field.input) {
        newReference += components.reference.checkboxOpen;

        if (field.input.required === true) {
            newReference += components.reference.required;
        }

        if (field.input.checked === true) {
            newReference += components.reference.checked;
        }

        newReference += components.reference.checkboxClose;
    }

    if (field['text without ref']) {
        newReference += components.reference.textOpen + field['text without ref'] + components.reference.textClose;
    }

    if (field.text && field.ref) {
        newReference += components.reference.linkOpen + components.reference.hrefOpen + field.ref + components.reference.hrefClose + field.text + components.reference.linkClose;
    }

    newReference += components.reference.containerClose;

    return newReference;
}

function buildButton(field) {
    let button = components.button.open;
    button += field.text;
    button += components.button.close;
    return button;
}

// Функция создания формы
function buildJSONForm(json) {
    let form = '<form>';

    let formFields = Object.getOwnPropertyNames(json);

    form += `<h1 class="form__header">${json[formFields[0]]}</h1>`;

    for (let i = 0; i < formFields.length; i++) {
        let currentKey = json[formFields[i]];
        let fieldName = formFields[i];

        if (fieldName === 'fields') {
            for (let i = 0; i < currentKey.length; i++) {
                form += buildField(currentKey[i]);
            }
        }

        if (fieldName === 'references') {
            for (let i = 0; i < currentKey.length; i++) {
                form += buildReference(currentKey[i]);
            }
        }

        if (fieldName === 'buttons') {
            for (let i = 0; i < currentKey.length; i++) {
                form += buildButton(currentKey[i]);
            }
        }
    }

    form += '</form>';
    return form;
}

// Отрисовка формы
function drawForm(jsonInput, destination) {
    // Собираем форму соответствующей функцией
    const resultForm = buildJSONForm(jsonInput);

    // Отрисовываем форму в нужном месте
    destination.insertAdjacentHTML('beforeend', resultForm);
}

// Очистка формы
function formClear(destination, destination2, sendfield) {
    destination.innerHTML = '';
    destination2.style.display = 'block';
    sendfield.value = '';
}