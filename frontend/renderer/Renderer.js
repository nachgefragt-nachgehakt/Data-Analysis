class Renderer {

    DATA;
    CONTAINER;

    constructor(data, containerClass) {
        this.DATA = data;
        this.CONTAINER = document.querySelector(`#${containerClass}`)
    }

    renderData = () => {
        this.DATA.forEach(
            entry => this.render(entry)
        )
    }

    component(question) {
        return `<div>${entry}</div>`
    }

    render(entry) {
        this.CONTAINER.insertAdjacentHTML("beforeend", this.component(entry))
    }
}