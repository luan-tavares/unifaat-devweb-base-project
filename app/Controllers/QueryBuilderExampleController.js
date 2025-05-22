import db from "../../config/db.js";

export default (function () {
    return {

        // GET /todos
        'list': async (req, res) => {
            try {
                const result = await db.query('SELECT * FROM todos ORDER BY id');
                return res.status(200).json({
                    rows: result.rows
                });
            } catch (err) {
                return res.status(500).json({ error: 'Erro ao listar tarefas.' });
            }
        },

        // GET /todos/:id
        'get': async (req, res) => {
            const { id } = req.params;
            try {
                const result = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
                if (result.rowCount === 0) {
                    return res.status(404).json({ error: 'Tarefa não encontrada.' });
                }
                return res.status(200).json(result.rows[0]);
            } catch (err) {
                return res.status(500).json({ error: 'Erro ao buscar tarefa.' });
            }
        },

        // POST /todos
        'insert': async (req, res) => {
            const { title, is_checked } = req.body;
            try {
                const result = await db.query(
                    'INSERT INTO todos (title, is_checked) VALUES ($1, $2) RETURNING *',
                    [title, is_checked ?? false]
                );
                return res.status(201).json(result.rows[0]);
            } catch (err) {
                return res.status(500).json({ error: 'Erro ao inserir tarefa.' });
            }
        },

        // PUT /todos/:id
        'update': async (req, res) => {
            const { id } = req.params;
            const { title, is_checked } = req.body;
            try {
                const result = await db.query(
                    'UPDATE todos SET title = $1, is_checked = $2 WHERE id = $3 RETURNING *',
                    [title, is_checked, id]
                );
                if (result.rowCount === 0) {
                    return res.status(404).json({ error: 'Tarefa não encontrada para atualização.' });
                }
                return res.status(200).json(result.rows[0]);
            } catch (err) {
                return res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
            }
        },

        // DELETE /todos/:id
        'delete': async (req, res) => {
            const { id } = req.params;
            try {
                const result = await db.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
                if (result.rowCount === 0) {
                    return res.status(404).json({ error: 'Tarefa não encontrada para exclusão.' });
                }
                return res.status(200).json({ message: 'Tarefa excluída com sucesso.', deleted: result.rows[0] });
            } catch (err) {
                return res.status(500).json({ error: 'Erro ao excluir tarefa.' });
            }
        },

    };
})();
