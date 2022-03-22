import { Todo } from "./Class";
import { todoList } from "../index";

//references in HTML
const divTodoList    = document.querySelector('.todo-list');
const textInput      = document.querySelector('.new-todo');
const btnDeleteAll   = document.querySelector('.clear-completed');
const ulFilters      = document.querySelector('.filters');
const anchorFilter   = document.querySelectorAll('.filter');
const todoCount      = document.querySelector('todo-count');

export const createTodoHtml = ( {id, completed, homework} ) =>{
   const htmlTodo = `
    <li class='${ completed? 'completed' : '' }' data-id='${ id }' >
        <div class='view' >
            <input class='toggle' type='checkbox' ${ completed? 'checked' : '' } >
            <label>${ homework }</label>
            <button class='destroy'></button>
        </div>
        <input class='edit' value='Rule the web'>
    </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );
    return div.firstElementChild;
}


//events
textInput.addEventListener('keyup', ( event ) =>{
    
    if( event.keyCode === 13 && textInput.value.length > 0 ){
        
        let value = event.target.value;
        const newTodo = new Todo( value );

        todoList.newTodo( newTodo );

        createTodoHtml( newTodo );
        textInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => {
    const nameElement = event.target.localName //input label button
    const todoElement = event.target.parentElement.parentElement
    const idElement = todoElement.getAttribute('data-id');
    
    if( nameElement.includes('input')){  //click in the check
        todoList.toggleTodo(idElement);
        todoElement.classList.toggle('completed');
    }else if( nameElement.includes('button')){  //delete todo
        todoList.deleteTodo( idElement );
        divTodoList.removeChild( todoElement );
    }
});

btnDeleteAll.addEventListener('click', () => {
    todoList.deleteAllComplete();
    for( let i = divTodoList.children.length - 1; i >= 0; i-- ){
        const element = divTodoList.children[ i ];
        if( element.classList.contains('completed')){
            divTodoList.removeChild( element );
        }
    }
});

ulFilters.addEventListener('click', ( event ) => {
    const filter = event.target.text;
    if( !filter ) return;

    anchorFilter.forEach( filter => filter.classList.remove('selected'));
    event.target.classList.add('selected')

    for( const element of divTodoList.children ){
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');
        switch( filter ){
            case 'Active':
                if( completed ){
                    element.classList.add('hidden');
                }
                break;
            case 'Completed':
                if( !completed ){
                    element.classList.add('hidden');
                }
                break;
        }
    }
})