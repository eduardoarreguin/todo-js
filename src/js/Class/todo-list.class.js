import { Todo } from "./todo.class";

export class TodoList{
    constructor(){
        this.chargeLocalStorage();
    }

    newTodo( todo ){
        this.listTodos.push( todo );
        this.saveLocalStorage();
    }

    toggleTodo( id ){
        
        for( const todo of this.listTodos ){
            if( parseInt(id) === todo.id ){
                todo.completed = !todo.completed; 
                this.saveLocalStorage();
                break;
            }
        }
    }
    deleteTodo( id ){
        this.listTodos = this.listTodos.filter( todo => todo.id != parseInt(id) );
        this.saveLocalStorage();
    }

    deleteAllComplete(){
        this.listTodos = this.listTodos.filter( todo => !todo.completed );
        this.saveLocalStorage();
    }

    saveLocalStorage(){
        localStorage.setItem('todos', JSON.stringify( this.listTodos ));
    }

    chargeLocalStorage(){
        

        this.listTodos = localStorage.getItem('todos') ? 
            JSON.parse(localStorage.getItem('todos'))
        :
            [];
        this.listTodos = this.listTodos.map( Todo.fromJson );

        for( const todo of this.listTodos){
            if(todo.completed) this.numberCompleted++
        }
    }

}