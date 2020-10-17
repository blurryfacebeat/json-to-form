// JSON на входе
const jsonInput2 = `
{
    "name":"addpost",
    "fields":[
    {
        "label":"Title",
        "input": {
            "type":"text",
            "required": true,
            "placeholder": "Эщкере, ребят"
        }
    },
    {
        "label":"Description",
        "input": {
            "type":"textarea",
            "required":true
        }
    },
    {
        "label":"Image",
        "input": {
            "type":"file",
            "required": true
        }
    },
    {
        "label":"Publish Date",
        "input": {
            "type": "date",
            "required": true
        }
    },
    {
        "label": "Author",
        "input": {
            "type": "text"
        }
    }
],
"references":[
    {
      "input":{
        "type":"checkbox",
        "required":true,
        "checked":"false"
      }
    },
    {
        "text without ref":"View Author Post",
        "text":"View Author Post",
        "ref":"viewauthor"
    }
  ],
    "buttons":[
    {
        "text":"Create Post"
    }
]
}
`
// Контейнер для формы
const $app = document.getElementById('app');

const temp2 = JSON.parse(jsonInput2);

console.log(temp2);

// Компоненты
const components = {
    field: {
        containerOpen: '<div class="form-group">',
        labelOpen: '<label class="form-label">',
        labelClose: '</label>',
        open: '<input class="form-control"',
        inputTypeOpen: ' type="',
        inputTypeClose: '"',
        placeholderOpen: ' placeholder="',
        placeholderClose: '"',
        required: ' required',
        close: '>',
        containerClose: '</div>'
    },
    reference: {
        containerOpen: '<div class="form-group">',
        labelOpen: '<label class="form-label">',
        labelClose: '</label>',
        open: '<input type="checkbox" class="form-control"',
        required: ' required',
        checked: ' checked',
        close: '>',
        containerClose: '</div>'
    },
    button: {
        open: '<button>',
        close: '</button>'
    }
};

function buildField(field) {
    let newField = components.field.containerOpen;

    if (field.label) {
        newField += components.field.labelOpen + field.label + components.field.labelClose;
    }

    newField += components.field.open + components.field.inputTypeOpen + field.input.type + components.field.inputTypeClose;

    if (field.input.placeholder) {
        newField += components.field.placeholderOpen + field.input.placeholder + components.field.placeholderClose;
    }

    if (field.input.required === true) {
        newField += components.field.required;
    }

    newField += components.field.close;
    newField += components.field.containerClose;
    return newField;
}

function buildReference(field) {

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
                // console.log(buildField(currentField[i]));
                form += buildField(currentKey[i]);
            }
        }

        if (fieldName === 'references') {
            for (let i = 0; i < currentKey.length; i++) {
                console.log(111);
                // console.log(currentField[i]);
                // form += buildField(currentField[i]);
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