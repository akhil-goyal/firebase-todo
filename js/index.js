'use strict';

import NewTodo from './NewTodo.js';
import TodoList from './TodoList.js'


document.addEventListener('DOMContentLoaded', () => {

    let firebaseConfig = {
        apiKey: "XXXXXXXXXXX",
        authDomain: "XXXXXXXXX",
        projectId: "XXXXXXXXXX",
        storageBucket: "XXXXXXXXXX",
        messagingSenderId: "XXXXXXXXXX",
        appId: "XXXXXXXXX"
    };

    firebase.initializeApp(firebaseConfig);

    let db = firebase.firestore();

    let app = document.querySelector(`.app`)

    const theNewTodoForm = new NewTodo()

    app.appendChild(theNewTodoForm)

    theNewTodoForm.addEventListener(`new-todo`, (event) => {

        addTodo(event.detail);

    });


    function addTodo(todo) {

        db.collection('todos')
            .add({
                id: Math.ceil(Math.random() * 1000),
                todo, completed: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(docRef => {
                getTodos()
            })
            .catch(error => console.log(error));
    }

    function getTodos() {

        db.collection("todos")
            .orderBy("timestamp")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let todo = doc.data();
                    let theListElement = new TodoList(todo)
                    app.appendChild(theListElement);
                });
            });

    }

    getTodos();

});