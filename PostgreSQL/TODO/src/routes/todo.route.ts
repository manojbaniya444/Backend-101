import express, { Request, Response, Router } from "express"
import Todo from "../models/todo"

type TodoItem = {
    title?: string
    description?: string
    is_completed?: boolean
}

function ApiResponse(success: boolean, message?: string, data?: any) {
    const successPayload = {
        success,
        message,
        data
    }
    const errorPayload = {
        success,
        message
    }

    return success ? successPayload : errorPayload
}

const router: Router = express.Router()

// get all the todos
router.get("/", async (req: Request, res: Response) => {
    const allTodos = await Todo.findAll()
    console.log(allTodos)
    return res.status(200).json(ApiResponse(true, "fetch all todos", allTodos))
})

// get the todo by item
router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json(ApiResponse(false, "Please provide valid id"))
    }

    try {
        const todoItem = await Todo.findById(id)
        if (!todoItem) {
            return res.status(404).json({ success: false, message: "Todo item not found" })
        }
        return res.status(200).json({ success: true, todo: todoItem })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" })
    }
})

// create a new todo
router.post("/", async (req: Request, res: Response) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ success: false, message: "Title and Description is required." })
    }

    const todo = await Todo.create({ title, description })
    return res.status(200).json({ success: true, message: "Todo item created", todo })
})

// update the whole todo
router.put("/:id", async (req: Request, res: Response) => {
    const { title, description, is_completed } = req.body;
    const id = parseInt(req.params.id)

    if (!title || !description || !is_completed) {
        return res.status(400).json({ success: false, message: "Please provide all fields" })
    }

    const updatedTodo = await Todo.update(id, { title, description, is_completed })
    return res.status(200).json({ success: true, message: "Updated todo", updatedTodo })
})

// update todo partially
router.patch("/:id", async (req: Request, res: Response) => {
    const data: TodoItem = req.body;
    const id = parseInt(req.params.id)

    if (!data) {
        return res.status(400).json({ success: false, messag: "Require field to update" })
    }
    const updatedTodo = await Todo.updatePartial(id, data)
    return res.status(200).json({ success: true, message: "Updated todo", updatedTodo })
})

// delete todo
router.delete("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Please provide a valid id" })
    }
    try {
        const deletedTodo = await Todo.delete(id)

        if (!deletedTodo) {
            return res.status(200).json({ success: false, message: "No todo item to delete" })
        }
        return res.status(200).json({ success: true, message: "deleted todo", deletedTodo })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Error deleting todo" })
    }
})

export default router;