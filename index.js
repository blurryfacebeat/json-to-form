const jsonInput = '{"type":"text", "label":"Name", "placeholder": "text field"}';
const $app = document.getElementById('app');

const components = {
    text: {
        containerOpen: '<div class="form-group">',
        labelOpen: '<label class="form-label">',
        labelClose: '</label>',
        open: '<input type="text" class="form-control"',
        placeholderOpen: ' placeholder="',
        placeholderClose: '"',
        close: '>',
        containerClose: '</div>'
    }
};

function buildTextField(field) {
    let textField = components.text.containerOpen;

    if (field.label) {
        textField += components.text.labelOpen + field.label + components.text.labelClose;
    }

    textField += components.text.open;

    if (field.placeholder) {
        textField += components.text.placeholderOpen + field.placeholder + components.text.placeholderClose;
    }

    textField += components.text.close;
    textField += components.text.containerClose;
    return textField;
}

const temp = JSON.parse(jsonInput);
// console.log(buildTextField(temp));
$app.insertAdjacentHTML('afterend', buildTextField(temp));

function buildJSONForm(json) {
    let form = '<form>';

    let formFields = Object.getOwnPropertyNames(json);

    for (let i = 0; i < formFields.length; i++) {
        let currentField = json[formFields[i]];

        switch (currentField.type) {
            case 'text':
                form += buildTextField(currentField);
                break;
            default:
                console.log('Ошибка');
                break;
        }
    }

    form += '</form>';
    return form;
}

function drawForm(jsonInput, destinationId) {
    try {
        const input = JSON.parse(jsonInput);
    } catch (e) {
        console.log('Ошибка: ' + e);
    }

    const resultForm = buildJSONForm(input);
}