export default function reducer(state, action) {
    switch (action.type) {
        case "EDIT_TODO":
            return {
                ...state,
                currentTodo: action.payload
            }
        case "TOGGLE_TODO":
            const toggledTodos = state.todos.map(t =>
                t.id === action.payload.id ? { ...action.payload, complete: !action.payload.complete } : t
            )
            return {
                ...state,
                todos: toggledTodos
            }
        case "ADD_TODO":
            if (!action.payload) {
                return state;
            }
            if (state.todos.findIndex(t => t.text === action.payload) > -1) {
                return state;
            }
            const newTodo = {
                id: state.todos.length + 1,
                text: action.payload,
                complete: false
            }
            const addedTodos = [...state.todos, newTodo]
            return {
                ...state,
                todos: addedTodos
            }
        case "UPDATE_TODO":
            if (!action.payload) {
                return state;
            }
            if (state.todos.findIndex(t => t.text === action.payload) > -1) {
                return state;
            }
            const updatedTodo = { ...state.currentTodo, text: action.payload }
            const updatedTodoIndex = state.todos.findIndex(t => t.id === state.currentTodo.id)
            const updatedTodos = [
                ...state.todos.slice(0, updatedTodoIndex),
                updatedTodo,
                ...state.todos.slice(updatedTodoIndex + 1)
            ]
            return {
                ...state,
                currentTodo: {},
                todos: updatedTodos
            }
        case "REMOVE_TODO":
            const filteredTodos = state.todos.filter(t => t.id !== action.payload.id)
            const isRemovedTodos = state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
            return {
                ...state,
                currentTodo: isRemovedTodos,
                todos: filteredTodos
            }
        default:
            return state;
    }
}