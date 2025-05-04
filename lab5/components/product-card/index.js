export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (        //данные {} не захардкожены, будем прокидывать их в компонент
            `  
            <div class = "central">
                <div class="card" style="width: 400px; height: 500px;">
                    <img class="card-img-top" src="${data.src}" alt="картинка">
                    <div class="card-body central">
                        <h3 class="card-title card_heading">${data.title}</h3>
                        <h4 class="card-text card_slogan">${data.text}</h4>
                        <button class="main_buttons" id="click-card-${data.id}" data-id="${data.id}">ПЕРЕЙТИ К МОДЕЛИ</button>
                    </div>
                </div>
            </div>
            `
        )
    }
    addListeners(data, listener) {  //подпись на событие по клику
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
            //при нажатии на кнопку будет вызвана функция listener
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}   //  создали компонент карточки, добавили верстку, затем все это добавили на страницу