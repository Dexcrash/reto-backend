const { pool } = require('../../config')

const getLists = async (req, res) => {
    const response = await pool.query('SELECT * FROM lists ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getListById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM lists WHERE id = $1', [id]);    
    res.json(response.rows[0]);
};

const createList = async (req, res) => {
    const { name, description, user_id} = req.body;
    const response = await pool.query('INSERT INTO lists (name, description, user_id) VALUES ($1, $2, $3)', [name, description, user_id]);
    res.json({
        message: 'List Added successfully',
        body: {
            list: {name, description, user_id}
        }
    })
};

const updateList = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, user_id} = req.body;
    const response = await pool.query('UPDATE lists SET name = $1, description = $2, user_id = $3 WHERE id = $4', [
        name,
        description,
        user_id,
        id
    ]);
    res.json('List Updated Successfully');
};

const deleteList = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM lists where id = $1', [
        id
    ]);
    res.json(`List ${id} deleted Successfully`);
};


const getSongsFromList = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT S.id, S.name, S.artist, S.album, S.url, S.image FROM listsongs L LEFT OUTER JOIN songs S ON L.song_id = S.id WHERE L.list_id = $1", [
        id
    ]);

    res.status(200).json(response.rows);
};

const getListByUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM lists WHERE user_id = $1', [id]);    
    res.json(response.rows);
};


module.exports = {
    getLists,
    getListById,
    createList,
    updateList,
    deleteList,
    getSongsFromList,
    getListByUser
};