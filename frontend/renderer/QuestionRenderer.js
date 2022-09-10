class QuestionRenderer extends Renderer {

    component(question) {
        return `<div class="question">${question}</div>`
    }
}

const questionRenderer = new QuestionRenderer(Questions.getQuestionList().flat(), "question-container")
questionRenderer.renderData()