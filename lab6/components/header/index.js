import { MainPage } from "../../pages/main/index.js";

export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class = "go_home_central">
                <button id="go_home_btn" class="go_home_btn">
                    <img src="/ktmlogo.jpg" alt="KTM">
                </button>
            </div>
        `;
    }

    render() {
        const header = document.createElement('div');
        //добавляем во временный контейнер, подобие DOM-элемента
        header.innerHTML = this.getHTML();
        //Обработчик события кнопки
        const btn = header.querySelector('#go_home_btn');
        btn.addEventListener('click', () => {
            this.parent.innerHTML = '';
            const main = new MainPage(this.parent);
            main.render();
        });
        this.parent.insertAdjacentElement('afterbegin', header);
    }
}
