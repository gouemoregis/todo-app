import './App.css'
import { useEffect, useState } from 'react'

function TodoItem({ todo, onToggleTodo, onDeleteTodo, onStartEditTodo }) {
  return (
    <tr className={todo.completed ? 'completed' : ''}>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>{todo.completed ? 'Terminee' : 'A faire'}</td>
      <td className="text-end text-nowrap">
        <button
          className="btn btn-sm btn-outline-success me-2"
          type="button"
          title={todo.completed ? 'Marquer comme a faire' : 'Marquer comme terminee'}
          onClick={() => onToggleTodo(todo.id)}
        >
          <i className={todo.completed ? 'bi bi-arrow-counterclockwise' : 'bi bi-check-lg'}></i>
        </button>

        <button
          className="btn btn-sm btn-outline-primary me-2"
          type="button"
          title="Modifier"
          onClick={() => onStartEditTodo(todo)}
        >
          <i className="bi bi-pencil"></i>
        </button>

        <button
          className="btn btn-sm btn-outline-danger"
          type="button"
          title="Supprimer"
          onClick={() => onDeleteTodo(todo.id)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  )
}


function TodoForm({ newTitle, newDescription, isEditing, onNewDescriptionChange, onNewTitleChange, onAddTodo }) {
  return (
    <form onSubmit={onAddTodo}>
      <input
        className="form-control"
        type="text"
        value={newTitle}
        onChange={(event) => onNewTitleChange(event.target.value)}
        placeholder="Titre"
      />
      <textarea
        className="form-control mt-2"
        value={newDescription}
        onChange={(event) => onNewDescriptionChange(event.target.value)}
        placeholder="Description"
      />
      <button className="btn btn-primary mt-2" type="submit" title={isEditing ? 'Modifier' : 'Ajouter'}>
        <i className={isEditing ? 'bi bi-check2' : 'bi bi-plus-lg'}></i>
      </button>
    </form>
  )
}

function TodoList({ todos, onToggleTodo, onDeleteTodo, onStartEditTodo }) {
  return (
    <table className="table table-striped table-hover align-middle mt-4 text-start">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Description</th>
          <th style={{ width: '120px' }}>Statut</th>
          <th className="text-end" style={{ width: '120px' }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleTodo={onToggleTodo}
            onDeleteTodo={onDeleteTodo}
            onStartEditTodo={onStartEditTodo}
          />
        ))}
      </tbody>
    </table>
  )
}

function App() {
  const [todos, setTodos] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingTodoId, setEditingTodoId] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/todos/')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data)
        setIsLoading(false)
      })
      .catch(() => {
        setError("Impossible de charger la liste des todos")
        setIsLoading(false)
      })
  }, [])

  function handleStartEditTodo(todo) {
    setEditingTodoId(todo.id)
    setNewTitle(todo.title)
    setNewDescription(todo.description)
  }

  function handleAddTodo(event) {
    event.preventDefault()

    if (newTitle.trim() === '') {
      return
    }

    if (editingTodoId !== null) {
      fetch(`http://localhost:8000/api/todos/${editingTodoId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTitle.trim(),
          description: newDescription.trim(),
        })
      })
      .then((response) => response.json())
      .then((updatedTodo) => {
        const nextTodos = todos.map((todo) => {
          if (todo.id !== editingTodoId) {
            return todo
          }

          return updatedTodo
        })

        setTodos(nextTodos)
        setNewTitle('')
        setNewDescription('')
        setEditingTodoId(null)
      })

      return
    }

    fetch("http://localhost:8000/api/todos/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newTitle.trim(),
        description: newDescription.trim(),
        completed: false,
      })
    })
    .then((response) => response.json())
    .then((createdTodo) => {
      setTodos([...todos, createdTodo])
      setNewTitle('')
      setNewDescription('')
      setEditingTodoId(null)
    })
  }

  function handleDeleteTodo(id) {
    fetch(`http://localhost:8000/api/todos/${id}/`, {
      method: 'DELETE',
    })
    .then(() => {
      const nextTodos = todos.filter((todo) => todo.id !== id)

      setTodos(nextTodos)
    })
  }

  function handleToggleTodo(id) {
    const updatedCompleted = !todos.find((todo) => todo.id === id).completed

    fetch(`http://localhost:8000/api/todos/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: updatedCompleted,
      }),
    })
    .then((response) => response.json())
    .then((updatedTodo) => {
      const nextTodos = todos.map((todo) => {
        if (todo.id !== id) {
          return todo
        }

        return updatedTodo
      })

      setTodos(nextTodos)
    })
  }

  return (
    <main className="app">
      <h1>Todo App</h1>
      <TodoForm
        newTitle={newTitle}
        onNewTitleChange={setNewTitle}
        newDescription={newDescription}
        onNewDescriptionChange={setNewDescription}
        isEditing={editingTodoId !== null}
        onAddTodo={handleAddTodo}
      />
      {isLoading && (
        <p className="text-muted mt-3">Chargement...</p>
      )}

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      {!isLoading && !error && todos.length === 0 && (
        <p className="text-muted mt-3">Aucune Todo pour le moment.</p>
      )}

      {!isLoading && !error && todos.length > 0 && (
        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onStartEditTodo={handleStartEditTodo}
        />
      )}
    </main>
  )
}

export default App
