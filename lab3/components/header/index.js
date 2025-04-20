import {MainPage} from "../../pages/main/index.js";

export class HeaderComponent {
    constructor(parent) {
        this.parent = parent; // Сохраняем родительский элемент
    }
    render() { 
        const header = document.createElement('div'); // Создаем и добавляем новый хедер
        header.className = 'go_home_central';
        header.innerHTML = `
            <button id="go_home_btn" class="go_home_btn">
                <img src="/ktmlogo.jpg" alt="KTM">
            </button>
        `;
        const btn = header.querySelector('#go_home_btn');
        btn.onclick = () => { // Обработчик перехода
            this.parent.innerHTML = '';
            const main = new MainPage(this.parent);
            main.render();
        };
        this.parent.insertAdjacentElement('afterbegin', header); // Вставляем в начало шапку
    }
}