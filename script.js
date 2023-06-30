'use strict'

// repair.dataset.coeff        // Тип ремонта
// rooms.dataset.coeff         // Количество комнат
// apartment.dataset.coeff     // Тип жилья

// dismantling.coeff           // Демонтаж
// redevelopment.coeff         // Перепланировка

// area.value                  // Площадь 

const decrement = document.querySelector('.calculator__button_decrement');
const increment = document.querySelector('.calculator__button_increment');
const area = document.querySelector('.calculator__input_area');



increment.addEventListener('click', () => {

	if (area.value < 450) {

		area.innerText = area.value++

	}

})

decrement.addEventListener('click', () => {

	if (area.value > 1) {

		area.innerText = area.value--

	}

})

area.addEventListener('input', () => {

	if (area.value < 1) {

		area.value = null

	} else if (area.value > 450) {

		area.value = 450

	}

})

area.addEventListener('focus', () => {

	area.select()

})

// Функция рассчета
function calculate() {

	let repair = document.querySelector('input[name=type]:checked'); // Тип ремонта
	let rooms = document.querySelector('input[name=rooms]:checked'); // Количество комнат
	let apartment = document.querySelector('input[name=apt-type]:checked'); // Тип жилья


	let output = {

		price: document.querySelector('.calculator__price'),

		hidden: document.querySelector('.calc-params'),

		utmstatPrice: document.querySelector('.calc-price'),

	}

	// Демонтаж

	let dismantling = {

		input: document.querySelector('input[name=dismantling]'),

		coeff: 0,

		value: 'Не нужен',

	}

	if (dismantling.input.checked) {

		dismantling.coeff = 0.1

		dismantling.value = 'Нужен'

	} else {

		dismantling.coeff = 0

		dismantling.value = 'Не нужен'

	}



	// Перепланировка

	let redevelopment = {

		input: document.querySelector('input[name=pereplan]'),

		coeff: 0,

		value: 'Не требуется',

	}

	if (redevelopment.input.checked) {

		redevelopment.coeff = 0.15

		redevelopment.value = 'Нужна'

	} else {

		redevelopment.coeff = 0

		redevelopment.value = 'Не требуется'

	}

	// Получаем id типа ремонта
	let cosmet = document.getElementById('cosmet');
	let capital = document.getElementById('capital');
	let complex = document.getElementById('complex');

	// Получаем id типа жилья
	let novostroyka = document.getElementById('novostroyka');
	let vtorzhil = document.getElementById('vtorzhil');
	let witebox = document.getElementById('witebox');

	// Счётчик стоимости (тип ремонта + тип жилья)
	let totalPrice = 1;

	// Косметический ремонт расчет
	if (repair == cosmet) {

		let newBuilding = 1;
		let secondary = 1.1666666666667;
		let designer = 1.5;

		if (apartment == novostroyka) {
			totalPrice = repair.dataset.coeff * newBuilding;
		}

		if (apartment == vtorzhil) {
			totalPrice = repair.dataset.coeff * secondary;
		}

		if (apartment == witebox) {
			totalPrice = repair.dataset.coeff * designer;
		}

	}

	// Капитальный ремонт расчет
	if (repair == capital) {

		let newBuilding = 1;
		let secondary = 1.1;
		let designer = 0.9;

		if (apartment == novostroyka) {
			totalPrice = repair.dataset.coeff * newBuilding;
		}

		if (apartment == vtorzhil) {
			totalPrice = repair.dataset.coeff * secondary;
		}

		if (apartment == witebox) {
			totalPrice = repair.dataset.coeff * designer;
		}

	}

	// Дизайнерский ремонт расчет
	if (repair == complex) {

		let newBuilding = 1;
		let secondary = 1.2;
		let designer = 1;

		if (apartment == novostroyka) {
			totalPrice = repair.dataset.coeff * newBuilding;
		}

		if (apartment == vtorzhil) {
			totalPrice = repair.dataset.coeff * secondary;
		}

		if (apartment == witebox) {
			totalPrice = repair.dataset.coeff * designer;
		}

	}

	// Считаем  (тип ремонта + тип жилья)  *  (квадратура)  +  (считаем демонтаж или перепланировка)
	totalPrice = totalPrice * area.value + (totalPrice * redevelopment.coeff * area.value) + (totalPrice * dismantling.coeff * area.value);

	// Считаем  ((тип ремонта  +  тип жилья)  *  квадратура  +  считаем демонтаж или перепланировка)  *  (количество комнат)
	var numberTotalPrice = totalPrice * rooms.dataset.coeff;

	// Приводим цену к числовому типу
	let oldPrice = new Intl.NumberFormat('ru').format(numberTotalPrice);

	// Выводим цену на страницу
	output.price.innerText = oldPrice;

	// Создаем объект для JSON
	var parameters = {

		Цена: oldPrice,

		Тип: repair.dataset.value,

		Комнаты: rooms.value,

		Аппартаменты: apartment.dataset.value,

		Перепланировка: redevelopment.value,

		Демонтаж: dismantling.value,

		Площадь: area.value,

	}

	// Передаем параметры в форму

	let psevdoParams = document.getElementById('params_id');

	psevdoParams.value = JSON.stringify(parameters)

}

let update = document.querySelectorAll('.update-price')
let changeButton = document.querySelectorAll('.calculator__button')

// Слушатель событий на input

update.forEach((element) => {

	element.addEventListener('input', calculate)

})

// Слушатель событий на кнопки + и -

changeButton.forEach((item) => {

	item.addEventListener('click', calculate)

})

calculate();