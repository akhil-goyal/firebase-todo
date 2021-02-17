import TodoItem from './TodoItem.js'

export default class TodoList extends HTMLElement {

    list = null

    constructor(todoList) {

        console.log('TODO LIST : ', todoList);

        super()

        this.root = this.attachShadow({ mode: `open` })

        const eleStyle = document.createElement(`style`)
        const txtStyle = document.createTextNode(`
      ul {
        padding-left: 0;
        list-style: none;
      }`)
        eleStyle.appendChild(txtStyle)
        this.root.appendChild(eleStyle)

        this.list = document.createElement(`ul`)

        const aTask = new TodoItem(todoList)
        aTask.addEventListener('taskChanged', event => { console.log('Task Complete?', aTask.completed) })
        this.list.appendChild(aTask)

        this.root.appendChild(this.list)

    }

    addNewTask(name) {

        this.list.innerHTML = ''

        // Figure out what the next available id is
        const aTask = new TodoItem({ id: 4, todo: name, completed: false })
        aTask.addEventListener('taskChanged', event => { console.log('Task Complete?', aTask.completed) })
        this.list.appendChild(aTask)
    }

}

window.customElements.define(`todo-list`, TodoList)