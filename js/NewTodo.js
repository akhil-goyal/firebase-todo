export default class NewTodo extends HTMLElement {

    constructor() {

        super()

        this.root = this.attachShadow({ mode: 'open' })

        // Attach the styling to the shadow dom
        const eleStyle = document.createElement('style')
        const txtStyle = document.createTextNode('')

        eleStyle.appendChild(txtStyle)
        this.root.appendChild(eleStyle)

        // Attach the form to the shadow dom
        const eleForm = document.createElement('form')
        eleForm.setAttribute('name', 'taskname')

        const eleInput = document.createElement('input')
        eleInput.setAttribute('type', 'text')
        eleInput.setAttribute('name', 'task')

        const eleButton = document.createElement('button')
        eleButton.setAttribute('type', 'submit')
        eleButton.textContent = 'Add task'

        eleForm.addEventListener('submit', (event) => {
            event.preventDefault()

            // console.log(eleInput.value)
            this.dispatchEvent(new CustomEvent('new-todo', { detail: eleInput.value }))
        })

        eleForm.appendChild(eleInput)
        eleForm.appendChild(eleButton)
        this.root.appendChild(eleForm)
    }

}

window.customElements.define('new-todo', NewTodo)