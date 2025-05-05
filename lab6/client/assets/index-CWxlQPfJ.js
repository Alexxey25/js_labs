(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();class h{constructor(e){this.parent=e}getHTML(e){return`  
            <div class = "central">
                <div class="card" style="width: 400px; height: 500px;">
                    <img class="card-img-top" src="${e.src}" alt="картинка">
                    <div class="card-body central">
                        <h3 class="card-title card_heading">${e.title}</h3>
                        <h4 class="card-text card_slogan">${e.text}</h4>
                        <button class="main_buttons" id="click-card-${e.id}" data-id="${e.id}">ПЕРЕЙТИ К МОДЕЛИ</button>
                    </div>
                </div>
            </div>
            `}addListeners(e,t){document.getElementById(`click-card-${e.id}`).addEventListener("click",t)}render(e,t){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),this.addListeners(e,t)}}class g{constructor(e){this.parent=e}getHTML(e){return`
            <div class="central">
                <div class="card mb-3" style="width: 1200px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${e.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h2 class="card-title">${e.title}</h2>
                                <p class="card-text card_descriptions">${e.text}</p>
                                <button class="main_buttons" id="click-card-${e.id}" data-id="${e.id}">РЕДАКТИРОВАТЬ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `}addListeners(e,t){const n=document.getElementById(`click-card-${e.id}`);n&&n.addEventListener("click",t)}render(e,t){const n=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",n),this.addListeners(e,t)}}class o{constructor(e){this.parent=e}getHTML(){return`
            <div class = "go_home_central">
                <button id="go_home_btn" class="go_home_btn">
                    <img src="/ktmlogo.jpg" alt="KTM">
                </button>
            </div>
        `}render(){const e=document.createElement("div");e.innerHTML=this.getHTML(),e.querySelector("#go_home_btn").addEventListener("click",()=>{this.parent.innerHTML="",new l(this.parent).render()}),this.parent.insertAdjacentElement("afterbegin",e)}}class v{constructor(){this.baseUrl="http://localhost:3000"}getVehicles(){return`${this.baseUrl}/vehicles`}getVehicleById(e){return`${this.baseUrl}/vehicles/${e}`}createVehicle(){return`${this.baseUrl}/vehicles`}removeVehicleById(e){return`${this.baseUrl}/vehicles/${e}`}updateVehicleById(e){return`${this.baseUrl}/vehicles/${e}`}}const d=new v;class p{constructor(e,t){this.parent=e,this.id=t}async getData(){if(this.id)try{const t=await(await fetch(d.getVehicleById(this.id))).json();this.renderForm(t)}catch(e){console.error("Ошибка загрузки данных:",e)}else this.renderForm(this.getEmptyData())}getEmptyData(){return{src:"",title:"",text:"",engine:""}}getHTML(e){return`
            <div id="customize-page" class="central">
                <div class = "customize-form">
                    <div class = "form-line">
                        <label class = "card_heading form_style">Ссылка на изображение:</label>
                        <input type="text" id="src" class = "card_slogan form_slogan" value="${e.src}" />
                    </div>
                    <div class = "form-line">
                        <label class = "card_heading form_style">Название:</label>
                        <input type="text" id="title" class = "card_slogan form_slogan" value="${e.title}" />
                    </div>
                    <div class = "form-line">
                        <label class = "card_heading form_style">Описание:</label>
                        <input type="text" id="text" class = "card_slogan form_slogan" value="${e.text}" />
                    </div>
                    <div class = "form-line">
                        <label class = "card_heading form_style">Объем двигателя (cc):</label>
                        <input type="text" id="engine" class = "card_slogan form_slogan" value="${e.engine}" />
                    </div>
                </div>
                <div class="apply_btn_central">
                    <button class="main_buttons option_buttons" id="click-card-${e.id}" data-id="${e.id}">ПРИМЕНИТЬ</button>
                </div>
            </div>
        `}renderForm(e){const t=document.createElement("div");t.innerHTML=this.getHTML(e),t.querySelector(`#click-card-${e.id}`).addEventListener("click",async()=>{const r={src:t.querySelector("#src").value,title:t.querySelector("#title").value,text:t.querySelector("#text").value,engine:t.querySelector("#engine").value};try{this.id?await fetch(d.updateVehicleById(this.id),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}):await fetch(d.createVehicle(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),this.parent.innerHTML="",new l(this.parent).render()}catch(i){console.error("Ошибка при отправке данных:",i)}}),this.parent.insertAdjacentElement("afterbegin",t)}render(){this.parent.innerHTML="",new o(this.parent).render(),this.getData()}}class f{constructor(e,t){this.parent=e,this.id=t}async getData(){try{const t=await(await fetch(d.getVehicleById(this.id))).json();this.renderData(t)}catch(e){console.error("Ошибка загрузки данных:",e)}}renderData(e){const t=document.getElementById("product-card");new g(t).render(e,this.clickCustomize.bind(this))}getHTML(){const e=["Мощный двигатель","Легкая стальная рама","Спортивная подвеска WP","ABS система"],t=this.concatenate(e,", "),n=[0,125,!1,390,void 0,"",450,null],r=this.erase(n),i=[125,390,450],c=this.euclid(i),u=["carb","barc","moto","otom","cycle","cylec","engine"],m=this.anagram(u);return`
            <div id="product-page">
                <div id="product-card"></div>  <!-- Место для отображения карточки товара -->
                <div class="featuresStyle">
                    <h3>Конкатенация характеристик мотоцикла</h3>
                    <div>
                        <p>Характеристики:</p>
                        <ul>
                            ${e.map(a=>`<li>${a}</li>`).join("")}
                        </ul>
                        <p>После конкатенации:</p>
                        <div>${t}</div>
                    </div>
                </div>
                <div class="functionStyle">
                    <h3>Очищение некорректного ввода объема двигателя</h3>
                    <div>
                        <p>Тестовые данные:</p>
                        <ul>
                            ${n.map(a=>`<li>${a}</li>`).join("")}
                        </ul>
                        <p>После удаления невалидных значений:</p>
                        <div>${r}</div>
                    </div>
                </div>
                <div class="functionStyle">
                    <h3>НОД объема двигателя</h3>
                    <div class="demo-content">
                    <p>Двигатели, см^3:</p>
                    <ul>
                        ${i.map(a=>`<li>${a}</li>`).join("")}
                    </ul>
                    <p>НОД:</p>
                    <div>${c}</div>
                    </div>
                </div>
                <div class="functionStyle">
                    <h3>Анаграммы мототематики</h3>
                    <div>
                        <p>Набор данных:</p>
                        <ul>
                            ${u.map(a=>`<li>${a}</li>`).join("")}
                        </ul>
                        <p>Группы анаграмм:</p>
                        <div>
                            ${m.map(a=>`
                                <div class="anagram-group"> ${a.join(", ")}</div>
                            `).join("")}
                        </div>
                    </div>
                </div>
            </div>
        `}concatenate(e,t){return e.join(t)}erase(e){const t=new Set([!1,void 0,"",0,null]);return e.filter(n=>!t.has(n))}euclid(e){if(e.length===0)return 0;let t=e[0];for(let n=1;n<e.length;n++){let r=t,i=e[n];for(;`${i}`!="0";){const c=r%i;r=i,i=c}t=r}return t}anagram(e){const t={},n=new Set(e);for(const r of n){const i=r.split("").sort().join("");t[i]||(t[i]=[]),t[i].push(r)}return Object.values(t).filter(r=>r.length>=2).map(r=>r.sort()).sort((r,i)=>r[0].localeCompare(i[0]))}get pageRoot(){return document.getElementById("product-page")}clickCustomize(e){const t=e.target.dataset.id;new p(this.parent,t).render()}render(){this.parent.innerHTML="",new o(this.parent).render();const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.getData()}}class y{constructor(e){this.parent=e}addCard(){new p(this.parent,null).render()}}class b{constructor(e){this.parent=e}async removeCard(){const e=this.parent.data.pop();if(!e)return;const t=e.id;try{await fetch(d.removeVehicleById(t),{method:"DELETE"}),await this.parent.getData(),this.parent.render()}catch(n){console.error("Ошибка при удалении:",n)}}}class l{constructor(e){this.parent=e,this.value_filter=125,this.data=[]}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
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
        `}async getData(){try{const t=await(await fetch(d.getVehicles())).json();this.data=t,this.renderFilteredCards(),this.renderData(this.data)}catch(e){console.error("Ошибка загрузки данных:",e)}}renderData(e){const t=this.pageRoot;t.innerHTML="",e.forEach(n=>{new h(t).render(n,this.clickCard.bind(this))})}clickCard(e){const t=e.target.dataset.id;new f(this.parent,t).render()}setupFilter(){const e=document.getElementById("engine_filter"),t=document.getElementById("val_value");e.addEventListener("input",n=>{this.value_filter=n.target.value,t.textContent=`${this.value_filter}cc`,this.renderFilteredCards()})}renderFilteredCards(){this.pageRoot.innerHTML="",this.data.filter(e=>e.engine>=this.value_filter).forEach(e=>{new h(this.pageRoot).render(e,this.clickCard.bind(this))})}render(){this.parent.innerHTML="",new o(this.parent).render();const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.setupFilter(),this.getData();const n=new y(this.parent),r=new b(this);document.getElementById("go_home_btn").addEventListener("click",()=>n.addCard()),document.getElementById("add_card_btn").addEventListener("click",()=>n.addCard()),document.getElementById("remove_card_btn").addEventListener("click",()=>r.removeCard())}}const _=document.getElementById("root"),L=new l(_);L.render();
