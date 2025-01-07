import { queryDb } from "../config/database";

type TodoItem = {
    title: string;
    description: string;
    is_completed?: boolean;
}

class Todo {
    static async create(todoItem: TodoItem) {
        const { title, description } = todoItem;
        const query = `
        INSERT INTO todos (title, description)
        VALUES ($1, $2)
        RETURNING *
        `
        // RETURNING *: this clause ensures that all columns of the inserted row are returned, including automatically generated fields
        try {
            const res = await queryDb(query, [title, description])
            return res.rows[0]
        } catch (error) {
            console.log("Error creating todos: ", error)
            throw error;
        }
    }

    static async findAll() {
        const query = "SELECT * FROM todos ORDER BY created_at DESC"

        try {
            const res = await queryDb(query)
            return res.rows;
        } catch (error) {
            console.log("Error fetching all todos", error)
            throw error;
        }
    }

    static async findById(id: number) {
        const query = `
        SELECT * FROM todos
        WHERE id = $1
        `

        try {
            const res = await queryDb(query, [id])
            return res.rows[0]
        } catch (error) {
            console.error("Error on findByID: ", error)
            throw error
        }
    }

    static async update(id: number, { title, description, is_completed }: TodoItem) {
        const query = `
        UPDATE todos

        SET
        title = $1,
        description = $2,
        is_completed = $3,
        updated_at = CURRENT_TIMESTAMP
        
        WHERE id = $4
        RETURNING *`

        try {
            const res = await queryDb(query, [title, description, is_completed, id])
            return res.rows[0]
        } catch (error) {
            console.log("Error on updating todo: ", error)
            throw error
        }
    }
    static async updatePartial(id: number, updates: Partial<TodoItem>) {
        const validFields = ['title', 'description', 'is_completed'] as const;
        const updates_arr: any[] = [];
        const values: any[] = [];
        let paramCount = 1;

        for (const [key, value] of Object.entries(updates)) {
            if (validFields.includes(key as any) && value !== undefined) {
                updates_arr.push(`${key} = $${paramCount}`);
                values.push(value);
                paramCount++;
            }
        }

        if (updates_arr.length === 0) return null;

        const query = `
            UPDATE todos
            SET ${updates_arr.join(', ')},
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $${paramCount}
            RETURNING *
        `;

        try {
            const res = await queryDb(query, [...values, id]);
            return res.rows[0];
        } catch (error) {
            console.log("Error on partial update: ", error);
            throw error;
        }
    }

    static async delete(id: number) {
        const query = "DELETE FROM todos WHERE id = $1 RETURNING *"

        try {
            const res = await queryDb(query, [id])
            return res.rows[0]
        } catch (error) {
            console.error("Error deleting todo: ", error)
            throw error
        }
    }
}

export default Todo