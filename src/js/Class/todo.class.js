export class Todo {

    static fromJson({ homework, id, completed, create }){
        const tempTodo = new Todo( homework ); 

        tempTodo.id        = id;
        tempTodo.completed = completed;
        tempTodo.create    = create;
        
        return tempTodo;
    }
    constructor( homework ){
        this.homework  =  homework;
        this.id        = new Date().getTime();
        this.completed = false;
        this.create    = new Date(); 
    }
}