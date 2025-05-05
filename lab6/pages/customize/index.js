import { HeaderComponent } from "../../components/header/index.js";
import { ajax } from "../../modules/ajax.js";
import { VehiclesU } from "../../modules/VehiclesUrls.js";
import { MainPage } from "../main/index.js";

export class CustomizePage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }
    async getData() {
        if (this.id) {
            try {
                const res = await fetch(VehiclesU.getVehicleById(this.id));
                const data = await res.json();
                this.renderForm(data);
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
            }
        } else {
            this.renderForm(this.getEmptyData());
        }
    }

    getEmptyData() {
    return {
        src: '',
        title: '',
        text: '',
        engine: ''
    };
    }

    getHTML(data){
        return `
            <div id="customize-page" class="central">
                <div class = "customize-form">
                    <div class = "form-line">
                        <label class = "card_heading form_style">Ссылка на изображение:</label>
                        <input type="text" id="src" class = "card_slogan form_slogan" value="${data.src}" />
                    </div>
                    <div class = "form-line">
                        <label class = "card_heading form_style">Название:</label>
                        <input type="text" id="title" class = "card_slogan form_slogan" value="${data.title}" />
                    </div>
                    <div class = "form-line">
                        <label class = "card_heading form_style">Описание:</label>
                        <input type="text" id="text" class = "card_slogan form_slogan" value="${data.text}" />
                    </div>
                    <div class = "form-line">
                        <label class = "card_heading form_style">Объем двигателя (cc):</label>
                        <input type="text" id="engine" class = "card_slogan form_slogan" value="${data.engine}" />
                    </div>
                </div>
                <div class="apply_btn_central">
                    <button class="main_buttons option_buttons" id="click-card-${data.id}" data-id="${data.id}">ПРИМЕНИТЬ</button>
                </div>
            </div>
        `;
    }
    renderForm(data) {
        const apply_btn = document.createElement('div');
        apply_btn.innerHTML = this.getHTML(data);

        const btn = apply_btn.querySelector(`#click-card-${data.id}`);
        btn.addEventListener('click', async () => {
            const updatedData = {
                src: apply_btn.querySelector('#src').value,
                title: apply_btn.querySelector('#title').value,
                text: apply_btn.querySelector('#text').value,
                engine: apply_btn.querySelector('#engine').value,
            };
        
            try {
                if (this.id) {
                    await fetch(VehiclesU.updateVehicleById(this.id), {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedData)
                    });
                } else {
                    await fetch(VehiclesU.createVehicle(), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedData)
                    });
                }
                this.parent.innerHTML = '';
                const main = new MainPage(this.parent);
                main.render();
            } catch (err) {
                console.error("Ошибка при отправке данных:", err);
            }
        });


        this.parent.insertAdjacentElement('afterbegin', apply_btn);
    }
    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render();
        this.getData();
    }
}
