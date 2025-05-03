import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { HeaderComponent } from "../../components/header/index.js";
import { AddCardButton } from "../../components/add-button/index.js";
import { RemoveCardButton } from "../../components/delete-button/index.js";
import { ajax } from "../../modules/ajax.js";
import { VehiclesU } from "../../modules/VehiclesUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.value_filter = 125;
        this.data = [];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div>
                <!-- Ползунок для фильтрации по объему двигателя -->
                <input type="range" id="engine_filter" min="125" max="465" value="${this.value_filter}" step="20" class="filter_style_rang">
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

    getData(callback) {
        ajax.get(VehiclesU.getVehicles(), (data, status) => {
            if (status === 200 && Array.isArray(data)) {
                this.data = data;
                this.renderFilteredCards();
                if (callback) callback();
            } else {
                console.error("Ошибка загрузки данных:", status, data);
            }
        });
    }

    renderData(items) {
        const container = this.pageRoot;
        if (!container) return;
        
        container.innerHTML = '';

        items.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    clickCard(e) {
        const cardElement = e.target.closest('[data-id]');
        if (!cardElement) return;
        
        const cardId = cardElement.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    setupFilter() {
        const filter = document.getElementById('engine_filter');
        const valueDisplay = document.getElementById('val_value');

        if (!filter || !valueDisplay) return;

        filter.addEventListener('input', (e) => {
            this.value_filter = parseInt(e.target.value);
            valueDisplay.textContent = `${this.value_filter}cc`;
            this.renderFilteredCards();
        });
    }

    renderFilteredCards() {
        if (!this.data.length) return;
        
        this.pageRoot.innerHTML = '';
        
        const filteredData = this.data.filter(bike => bike.engine >= this.value_filter);
        
        filteredData.forEach(bike => {
            const card = new ProductCardComponent(this.pageRoot);
            card.render(bike, this.clickCard.bind(this));
        });
    }

    render() {
        this.parent.innerHTML = '';
        
        const header = new HeaderComponent(this.parent);
        header.render();
        
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        this.setupFilter();
        
        this.getData(() => {
            const addBtn = new AddCardButton(this);
            const removeBtn = new RemoveCardButton(this);
            
            document.getElementById('go_home_btn')?.addEventListener('click', () => addBtn.addCard());
            document.getElementById('add_card_btn')?.addEventListener('click', () => addBtn.addCard())
            document.getElementById('remove_card_btn')?.addEventListener('click', () => removeBtn.removeCard())
        });
    }
}