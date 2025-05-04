export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
            <div class="central">
                <div class="card mb-3" style="width: 1200px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h2 class="card-title">${data.title}</h2>
                                <p class="card-text card_descriptions">${data.text}</p>
                                <button class="main_buttons" id="click-card-${data.id}" data-id="${data.id}">ПЕРЕЙТИ К МОДЕЛИ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        )
    }
    addListeners(data, listener) { 
        const cardButton = document.getElementById(`click-card-${data.id}`);
        if (cardButton) {
            cardButton.addEventListener("click", listener);
        }
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}
//<button class="main_buttons" id="click-card-${data.id}" data-id="${data.id}">GO HOME</button>
