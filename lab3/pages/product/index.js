import {ProductComponent} from "../../components/product/index.js";
import {MainPage} from "../main/index.js";
import {HeaderComponent} from "../../components/header/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id; 
        this.productData = [
            {
                id: 1,
                src: "https://azwecdnepstoragewebsiteuploads.azureedge.net/PHO_BIKE_90_REVO_Travel-KTM-2025-390-adventure-r-white-right-front-view-studio-image_%23SALL_%23AEPI_%23V1.png",
                title: "2025 KTM 390 ADVENTURE R",
                text: "При выборе оптимального маршрута между пунктами А и Б KTM 390 ENDURO R не знает себе равных.",
                features: ["Мощный двигатель 390cc", "Легкая стальная рама", "Спортивная подвеска WP", "ABS система"]
            },
            {
                id: 2,
                src: "https://azwecdnepstoragewebsiteuploads.azureedge.net/PHO_BIKE_90_REVO_MY25-KTM-450-SMR-90-degree-right-front_%23SALL_%23AEPI_%23V1.png",
                title: "2025 KTM 450 SMR",
                text: "KTM 450 SMR 2025 года — единственная по-настоящему универсальная модель мотоцикла.",
                features: ["Двигатель 450cc", "Карбоновые элементы", "Гидравлическое сцепление"]
            },
            {
                id: 3,
                src: "https://azwecdnepstoragewebsiteuploads.azureedge.net/PHO_BIKE_90_REVO_Dual-sport-KTM-2025-125-enduro-r--right-front-view-image_%23SALL_%23AEPI_%23V1.png",
                title: "2025 KTM 125 ENDURO R",
                text: "Лёгкое управление, высокая производительность и море удовольствия — вот что такое KTM 125 ENDURO R.",
                features: ["Двигатель 125cc", "Электростартер", "6-ступенчатая коробка передач"]
            }
        ];
    }
    concatenate(vehicleFeatures, separator) {
        return vehicleFeatures.join(separator);
    }

    erase(vehicleUnerasedData) {
        const invalidValues = new Set([false, undefined, '', 0, null]); //множество
        const vehicleErasedData = [];
        let index = 0;
        // Цикл с условием
        while (index in vehicleUnerasedData) {
            if (!invalidValues.has(vehicleUnerasedData[index])) {
                vehicleErasedData.push(vehicleUnerasedData[index]);
            }
            index++;
        }
        return vehicleErasedData;
    }

    euclid(vehicleEngineCap) {
        if (vehicleEngineCap.length === 0) return 0; //сравнение со строкой
        
        let vehicleSmallDiv = vehicleEngineCap[0];
        // Цикл по всем числам массива
        for (let i = 1; i < vehicleEngineCap.length; i++) {
            let a = vehicleSmallDiv;
            let b = vehicleEngineCap[i];
            
            // Алгоритм Евклида
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
        const vehicleGroups = {}; // Объект
        const wordsSet = new Set(vehicleWords); // Множество

        for (const word of wordsSet) {
            const sorted = word.split('').sort().join('');
            if (!vehicleGroups[sorted]) {
                vehicleGroups[sorted] = [];
            }
            vehicleGroups[sorted].push(word);
        }

        const vehicleAnagram = Object.values(vehicleGroups)
            .filter(vehicleGroups => vehicleGroups.length >= 2)
            .map(vehicleGroups => vehicleGroups.sort())
            .sort((a, b) => a[0].localeCompare(b[0]));
        
        return vehicleAnagram;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        const product = this.getData();
        const vehicleFeatures = this.concatenate(product.features, ', ');

        const unerasedData = [0, 125, false, 390, undefined, '', 450, null];
        const erasedData = this.erase(unerasedData);

        const engineCapacitySmalComDiv = [125, 390, 450];
        const engineCapacityEuclid = this.euclid(engineCapacitySmalComDiv);

        const vehicleWords = ['listen', 'silent', 'enlist', 'hello', 'world', 'dog', 'god'];
        const vehicleAnagram = this.anagram(vehicleWords);
        
        return `
            <div id="product-page">
                <div id="product-card"></div>
                <div class="featuresStyle">
                    <h3>Функция concatenate</h3>
                    <div>
                        <p>Характеристики мотоцикла:</p>
                        <ul>
                            ${product.features.map(f => `<li>${f}</li>`).join('')}
                            <!- для каждого элемента массива выполняем map-->
                        </ul>
                        <p>Результат concatenate:</p>
                        <div>${vehicleFeatures}</div>
                    </div>
                </div>
                <div class="functionStyle">
                    <h3>Функция erase</h3>
                    <div>
                        <p>Тестовые данные:</p>
                        <ul>
                            ${unerasedData.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                        <p>Результат erase:</p>
                        <div>${erasedData}</div>
                    </div>
                </div>
                <div class="functionStyle">
                    <h3>Функция euclid (НОД)</h3>
                    <div class="demo-content">
                    <p>НОД чисел:</p>
                    <ul>
                        ${engineCapacitySmalComDiv.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                    <div>${engineCapacityEuclid}</div>
                    </div>
                </div>
                <div class="functionStyle">
                <h3>Функция anagram</h3>
                <div>
                    <p>Тестовые слова:</p>
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
        `;
    }
    
    getData() {
        // Возвращаем данные продукта или данные по умолчанию
        const index = this.id - 1;
        if (index >= 0 && index < this.productData.length) {
            return this.productData[index]
        } else {
            return {
                id: 4,
                src: "https://mxbike.ru/static/catalog/image/124-rc.png",
                title: `KTM RC 390`,
                text: "ORANGE BLOOD",
                engine: 390,
                features: ['Сликовые шины', 'Увеличенная ведущая звезда', 'Мультимедиа']
            }
        }
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render();

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const product = this.getData();
        const productContainer = document.getElementById('product-card');
        const productComp = new ProductComponent(productContainer);
        productComp.render(product, this.clickBack.bind(this));
    }   
}