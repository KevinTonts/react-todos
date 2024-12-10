import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { v4 as uuid } from 'uuid';
import { Box, Typography } from '@mui/material';


const getInitialData = () => {
    try {
        return JSON.parse(localStorage.getItem("todos")) || [];
    } catch (e) {
        console.error("Error parsing todos from localStorage", e);
        return [];
    }
};


export default function TodoList() {
    const [todos, setTodos] = useState(getInitialData);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const toggleTodo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleToggle = (id) => () => toggleTodo(id);

    const removeTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(t => t.id !== id)
        });
    };

    const addTodo = (text) => {
        setTodos((prevTodos) => {
            return [...prevTodos, { text: text, id: uuid(), completed: false }];
        });
    };

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            m: 3
        }}>
            <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
                Todos
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todos.map((todo) => (
                    <TodoItem todo={todo} key={todo.id} remove={removeTodo} toggle={handleToggle(todo.id)} />
                ))}
                <TodoForm addTodo={addTodo} />
            </List>
        </Box>
    );
}
