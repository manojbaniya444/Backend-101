CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

-- index: creates an index on todo(is_completed)
-- An index improves the speed of lookups based on the value of iscompleted
-- For example if we frequently run queries like SELECT * FROM todos WHERE is_completed = TRUE, the database can use the index to find matching rows more efficiently

CREATE INDEX idx_todos_is_completed ON todos(is_completed);