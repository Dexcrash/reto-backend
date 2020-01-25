const { pool } = require('../../config')

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getUsersByPass = async (req, res) => {
    const { name, password } = req.body;
    const response = await pool.query('SELECT id FROM users WHERE name = $1 AND password = $2', [name, password]);
    res.json(response.rows[0]);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const response = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, email, password}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password} = req.body;

    const response = await pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [
        name,
        email,
        password,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUsersByPass
};