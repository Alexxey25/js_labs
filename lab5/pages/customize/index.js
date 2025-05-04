import { HeaderComponent } from "../../components/header/index.js";
import { ajax } from "../../modules/ajax.js";
import { VehiclesU } from "../../../lab5test/modules/VehiclesUrls.js";
import { MainPage } from "../main/index.js";

export class CustomizePage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }
    getData() {
        if (this.id) {
          ajax.get(VehiclesU.getVehicleById(this.id), (data) => {
            this.renderForm(data);
          });
        } else {
          this.renderForm(this.getEmptyData()); // Для новой карточки
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
        btn.addEventListener('click', () => {
            const updatedData = {
                src: apply_btn.querySelector('#src').value,
                title: apply_btn.querySelector('#title').value,
                text: apply_btn.querySelector('#text').value,
                engine: apply_btn.querySelector('#engine').value,
            };

            if (this.id) {
                ajax.patch(VehiclesU.updateVehicleById(this.id), updatedData, () => {
                    this.parent.innerHTML = '';
                    const main = new MainPage(this.parent);
                    main.render();
                });
            } else {
                ajax.post(VehiclesU.createVehicle(), updatedData, () => {
                    this.parent.innerHTML = '';
                    const main = new MainPage(this.parent);
                    main.render();
                });
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
