const personData = '{"name":"Иван","age":37,"mother":{"name":"Ольга","age":58},"children":["Маша","Игорь","Таня"],"married": true,"dog":null}';

// парсим объект из JSON
console.log('---ПАРСИНГ ОБЪЕКТА ИЗ JSON---');
const jsonData = JSON.parse(personData);
console.log(jsonData);

// получаем значение свойства
console.log('---ПОЛУЧАЕМ ЗНАЧЕНИЯ СВОЙСТВА---');
console.log(jsonData.name);
console.log(jsonData.mother);
console.log(jsonData.mother.age);

// перебор элементов в объекте
console.log('---ПЕРЕБОР ЭЛЕМЕНТОВ В ОБЪЕКТЕ---');
for (key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
        console.log(`Ключ: ${key}`);
        console.log(`Значение: ${jsonData[key]}`);
    }
}

// перебор элементов в массиве объекта
console.log('---ПЕРЕБОР ЭЛЕМЕНТОВ В МАССИВЕ ОБЪЕКТА---');
for (let i = 0; i <= jsonData.children.length - 1; i++) {
    console.log(`Элемент ${i}: ${jsonData.children[i]}`);
}

// переводим объекс в JSON
console.log('---ПЕРЕВОД ОБЪЕКТА В JSON---');
console.log(JSON.stringify(jsonData));