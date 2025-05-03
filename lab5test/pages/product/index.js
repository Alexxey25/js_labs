
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";
import { HeaderComponent } from "../../components/header/index.js";

import { ajax } from "../../modules/ajax.js";
import { VehiclesU } from "../../../lab5test/modules/VehiclesUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        ajax.get(VehiclesU.getVehicleById(this.id), (data) => {
            this.renderData(data);
        });
    }

    renderData(item) {
        const productContainer = document.getElementById('product-card');
        const product = new ProductComponent(productContainer);
        product.render(item);
    }

    getHTML(product) {
        const features = ["Мощный двигатель", "Легкая стальная рама", "Спортивная подвеска WP", "ABS система"];
        const vehicleFeatures = this.concatenate(features, ', ');
        const unerasedData = [0, 125, false, 390, undefined, '', 450, null];
        const erasedData = this.erase(unerasedData);
        const engineCapacitySmalComDiv = [125, 390, 450];
        const engineCapacityEuclid = this.euclid(engineCapacitySmalComDiv);
        const vehicleWords = ['carb', 'barc', 'moto', 'otom', 'cycle', 'cylec', 'engine'];
        const vehicleAnagram = this.anagram(vehicleWords);
    
        return `
            <div id="product-page">
                <div id="product-card"></div>  <!-- Место для отображения карточки товара -->
                <div class="featuresStyle">
                    <h3>Конкатенация характеристик мотоцикла</h3>
                    <div>
                        <p>Характеристики:</p>
                        <ul>
                            ${features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                        <p>После конкатенации:</p>
                        <div>${vehicleFeatures}</div>
                    </div>
                </div>
                <div class="functionStyle">
                    <h3>Очищение некорректного ввода объема двигателя</h3>
                    <div>
                        <p>Тестовые данные:</p>
                        <ul>
                            ${unerasedData.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                        <p>После удаления невалидных значений:</p>
                        <div>${erasedData}</div>
                    </div>
                </div>
                <div class="functionStyle">
                    <h3>НОД объема двигателя</h3>
                    <div class="demo-content">
                    <p>Двигатели, см^3:</p>
                    <ul>
                        ${engineCapacitySmalComDiv.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                    <p>НОД:</p>
                    <div>${engineCapacityEuclid}</div>
                    </div>
                </div>
                <div class="functionStyle">
                    <h3>Анаграммы мототематики</h3>
                    <div>
                        <p>Набор данных:</p>
                        <ul>
                            ${vehicleWords.map(w => `<li>${w}</li>`).join('')}
                        </ul>
                        <p>Группы анаграмм:</p>
                        <div>
                            ${vehicleAnagram.map(group => `
                                <div class="anagram-group"> ${group.join(', ')}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    concatenate(vehicleFeatures, separator) {
        return vehicleFeatures.join(separator);
    }

    erase(vehicleUnerasedData) {
        const invalidValues = new Set([false, undefined, '', 0, null]);
        return vehicleUnerasedData.filter(value => !invalidValues.has(value));
    }

    euclid(vehicleEngineCap) {
        if (vehicleEngineCap.length === 0) return 0;
        
        let vehicleSmallDiv = vehicleEngineCap[0];
        for (let i = 1; i < vehicleEngineCap.length; i++) {
            let a = vehicleSmallDiv;
            let b = vehicleEngineCap[i];
            while (`${b}` !== '0') {
                const temp = a % b;
                a = b;
                b = temp;
            }
            vehicleSmallDiv = a;
        }
        
        return vehicleSmallDiv;
    }

    anagram(vehicleWords) {
        const vehicleGroups = {};
        const wordsSet = new Set(vehicleWords);

        for (const word of wordsSet) {
            const sorted = word.split('').sort().join('');
            if (!vehicleGroups[sorted]) {
                vehicleGroups[sorted] = [];
            }
            vehicleGroups[sorted].push(word);
        }

        return Object.values(vehicleGroups)
            .filter(group => group.length >= 2)
            .map(group => group.sort())
            .sort((a, b) => a[0].localeCompare(b[0]));
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }
    
    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render();

        const productContainerHTML = this.getHTML({ features: [] });
        this.parent.insertAdjacentHTML('beforeend', productContainerHTML);
    
        this.getData();
    }
    
}
