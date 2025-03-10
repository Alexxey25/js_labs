// файл script.js
window.onload = function(){ //фун-ия, которая выполнится после загрузки всех стилей и элементов

    let a = '' //значения введенные пользователем
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок цифр (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                //проверка на наличие не более 2 точек
                a += digit
            }
            outputElement.innerHTML = a //меняем содержимое окна вывода
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML //извлечение содержимого кнопки
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return //не введено 1 число -> операция не выполняется
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return //строгое сравнение
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = a.startsWith('-') ? a.slice(1) : `-${a}`;
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = b.startsWith('-') ? b.slice(1) : `-${b}`;
                outputElement.innerHTML = b;
            }
        }
    };
    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = ((+a)/100).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = ((+b)/100).toString();
                outputElement.innerHTML = b;
            } 
        }
    }
    document.getElementById("btn_del").onclick = function(){
        if (!selectedOperation) {
            if (a !== '') {
                a = a.slice(0,-1);
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = b.slice(0,-1);
                outputElement.innerHTML = b;
            } 
        }
    }
    const colors = ['#FFFF00', '#CC0066', '#F40', '#66CCFF', '#FFF'];
    let ind = 0;
    document.getElementById("btn_back").onclick = function(){
        document.body.style.backgroundColor = colors[ind];
        //document - объект, являющийся HTML-документом
        //body - св-во document, style - св-во body, backgroundColor - св-во style 
        ind = (ind + 1) % colors.length; // Циклический переход по массиву
    }
    document.getElementById("btn_resChange").onclick = function(){
        outputElement.style.backgroundColor = colors[ind];
        //document - объект, являющийся HTML-документом
        //body - св-во document, style - св-во body, backgroundColor - св-во style 
        ind = (ind + 1) % colors.length; // Циклический переход по массиву
    }
    document.getElementById("btn_sqrt").onclick = function(){
        if (!selectedOperation) {
            if (a !== '') {
                a = Math.sqrt(a);
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = Math.sqrt(b);
                outputElement.innerHTML = b;
            } 
        }
    }
    document.getElementById("btn_x^2").onclick = function(){
        if (!selectedOperation) {
            if (a !== '') {
                a = Math.pow(a, 2);
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = Math.pow(b, 2);
                outputElement.innerHTML = b;
            } 
        }
    }
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
        suma = 0
        
    }
    function factorial(n){
        if (n === 0){
            return 1;
        } else {
            return n*factorial(n - 1);
        }
    }
    document.getElementById("btn_fact").onclick = function(){
        if (!selectedOperation) {
            if (a !== '') {
                a = factorial(a);
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = factorial(b);
                outputElement.innerHTML = b;
            } 
        }
    }
    document.getElementById("btn_000").onclick = function(){
        if (!selectedOperation) {
            if (a !== '') {
                a = `${a}000`;
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = `${b}000`;
                outputElement.innerHTML = b;
            } 
        }
    }
    let suma = 0; // Переменная для хранения накапливаемого значения

    // Обработчик для кнопки "+="
    document.getElementById("btn_+eq").onclick = function() {
        if (a !== '') {
            suma += +a;  // Добавляем значение из 'a' к накопленной сумме
            a = '';  // Очищаем 'a', чтобы оно не отображалось на экране
            outputElement.innerHTML = suma;  // Отображаем результат на экране
        }
    };
    document.getElementById("btn_-eq").onclick = function() {
        if (a !== '') {
            suma += -a;  // Добавляем значение из 'a' к накопленной сумме
            a = '';  // Очищаем 'a', чтобы оно не отображалось на экране
            outputElement.innerHTML = suma;  // Отображаем результат на экране
        }
    };
    let mult = null;
    document.getElementById("btn_asin").onclick = function() {
        if (a !== '') {
            if (a < -1 || a > 1){
                outputElement.innerHTML = 'Арксинус лежит в пределах [-1; 1]!';
                return
            }
            a = Math.asin(a);
            let col = '#FF6600'; //цвет кнопки
            col = parseInt(col.slice(1), 16);
            mult = a*col;
            outputElement.innerHTML = mult;
            mult = null;
        }
    };
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return //выход из функции, если что-то не выбрано 
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break; // (+a) приведение к числовому типу
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = '' //подготовка к следующему вводу
        selectedOperation = null
    
        outputElement.innerHTML = a //вывод на экран
    }
};