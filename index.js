// JSON на входе
const jsonInput2 = `
{
    "name":"interview",
    "fields":[
        {
            "label":"Введите своё ФИО",
            "input":{
                "type":"text",
                "required":true,
                "placeholder":"Иванов Иван Иванович"
            }
        },
        {
          "label":"Введите Номер телефона",
          "input":{
              "type":"number",
              "required":true,
              "mask": "+7 (999) 99-99-999"
          }
        },
        {
          "label":"Введите свою Почту",
          "input":{
              "type":"email",
              "required":true,
              "placeholder":"example@mail.com"
          }
        },
        {
            "label":"Введите свой возраст",
            "input":{
                "type":"number",
                "required":true
            }
        },
        {
            "label":"Введите вашу специальность",
            "input":{
                "type":"text",
                "required":true
            }
        },
        {
            "label":"Выберете технологии, с которыми вы работали",
            "input":{
                "type":"technology",
                "required": true,
                "technologies": ["PHP", "JS", "Laravel", "Express.js", "Yii2", "HTML", "CSS", "Java"],
                "multiple": true
            }
        },
        {
            "label":"Ваш срок работы",
            "input":{
                "type":"number",
                "required": true
            }
        },
        {
            "label":"Ваша фотография",
            "input":{
                "type":"file",
                "required":true
            }
        },
        {
            "label":"Серия, номер",
            "input":{
                "type": "number",
                "required": true,
                "mask": "99-99 999999"
            }
        },
        {
            "label":"Код подразделения",
            "input":{
                "type": "number",
                "required": true,
                "mask": "999-999"
            }
        },
        {
            "label":"Скан / Фото паспорта (1 страница)",
            "input":{
                "type": "file",
                "required": true,
                "multiple": true,
                "filetype": ["png", "jpeg", "pdf"]
            }
        },
        {
            "label":"Расскажите немного о себе",
            "input":{
                "type":"textarea",
                "required:":true
            }
        }
    ],
    "references":[
        {
          "input":{
            "type":"checkbox",
            "required":true,
            "checked":false
          }
        },
        {
            "text without ref":"I accept the",
            "text":"Terms & Conditions",
            "ref":"termsandconditions"
        }
    ],
    "buttons":[
        {
            "text":"Send"
        },
        {
            "text":"Cancel"
        }
    ]
}
`
// Контейнер для формы
const $app = document.getElementById('app');

const temp2 = JSON.parse(jsonInput2);

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
    // Парсим падающий json
    const input = JSON.parse(jsonInput);

    // Собираем форму соответствующей функцией
    const resultForm = buildJSONForm(input);

    // Отрисовываем форму в нужном месте
    destination.insertAdjacentHTML('beforeend', resultForm);
}

drawForm(jsonInput2, $app);