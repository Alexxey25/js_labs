import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {AddCardButton} from "../../components/add-button/index.js";
import {RemoveCardButton} from "../../components/delete-button/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.value_filter = 125;
        this.data = MainPage.data;
    }
    //данные хранятся на уровне класса, а не объекта. Избавляет от ненужного копирования
    static data = [
        {
            id: 1,
            src: "https://azwecdnepstoragewebsiteuploads.azureedge.net/PHO_BIKE_90_RE_Travel-KTM-2025-390-adventure-r-white-right-side-view-studio-image_%23SALL_%23AEPI_%23V1.png",
            title: "2025 KTM 390 ADVENTURE R",
            text: "В ВЫСШЕЙ СТЕПЕНИ СПОСОБНЫЙ",
            engine: 390
        },
        {
            id: 2,
            src: "https://azwecdnepstoragewebsiteuploads.azureedge.net/PHO_BIKE_90_RE_MY25-KTM-450-SMR-90-degree-right_%23SALL_%23AEPI_%23V1.png",
            title: "2025 KTM 450 SMR",
            text: "БЕЗУДЕРЖНАЯ АТАКА ВЕРШИНЫ",
            engine: 450
        },
        {
            id: 3,
            src: "https://azwecdnepstoragewebsiteuploads.azureedge.net/PHO_BIKE_90_RE_Dual-sport-KTM-2025-125-enduro-r--right-side-view-image_%23SALL_%23AEPI_%23V1.png",
            title: "2025 KTM 125 ENDURO R",
            text: "БУДЬ ДИКИМ ВНУТРИ",
            engine: 125
        },
    ];

    get pageRoot() {
        return document.getElementById('main-page');
    }  

    getHTML() {
        return `
            <div>
                <!--создаем ползунок <range>, step - шаг изменения-->
                <input type="range" id="engine_filter" min="125" max="465" value="${this.value_filter}" step="20" class="filter_style_rang">
                <!-- <span> выводит текущее значение ползунка-->
                <span id="val_value" class="filter_style_span">${this.value_filter}cc</span>   
            </div>
            <div class="go_home_central">
                <button id="go_home_btn" class="go_home_btn">
                    <img src="/ktmlogo.jpg" alt="Логотип KTM">
                </button>
            </div>
            <div id="main-page" class="d-flex flex-wrap central"></div>
            <div class="add_btn_central">
                <button id="add_card_btn" class="main_buttons option_buttons">ДОБАВИТЬ</button>
                <button id="remove_card_btn" class="main_buttons option_buttons">УДАЛИТЬ</button>
            </div>
        `;
    }
    
    getData() {
        return this.data; // Возвращаем ссылку на массив, а не копию
    }

    setupFilter() {
        const filter = document.getElementById('engine_filter');
        const valueDisplay = document.getElementById('val_value');
        //подписка на клик 
        //двигая ползунок input событие подается в ф-ию
        filter.addEventListener('input', (e) => {
            //e.target - ссылка на ползунок <input id="engine_filter">
            this.value_filter = e.target.value;
            //получение текущего содержания элемента .textContent и обновление
            valueDisplay.textContent = `${this.value_filter}cc`;
            //обновляем значение span
            this.renderFilteredCards();
        });
    }
    
    renderFilteredCards() { //обновление карточек
        this.pageRoot.innerHTML = ''; //очищаемм содержимое
        
        this.data
            .filter(bike => bike.engine >= this.value_filter)
            .forEach(bike => {
                const card = new ProductCardComponent(this.pageRoot);
                card.render(bike, this.clickCard.bind(this)); //привязка clickCard как обработчика клика
            });
            //очищаем-> фильтруем -> рисуем
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }
    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render();
    
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        this.setupFilter();
        this.renderFilteredCards();

        const addBtn = new AddCardButton(this);
        const removeBtn = new RemoveCardButton(this);

        document.getElementById('go_home_btn').addEventListener('click', () => addBtn.addCard());
        document.getElementById('add_card_btn').addEventListener('click', () => addBtn.addCard());
        document.getElementById('remove_card_btn').addEventListener('click', () => removeBtn.removeCard());
    }
}