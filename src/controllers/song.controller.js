const { pool } = require('../../config')

//GET sSONGS
const getSongs = async (req, res) => {
    const response = await pool.query('SELECT * FROM songs ORDER BY id ASC');
    res.status(200).json(response.rows);
};

//GET SONG BY ID
const getSongById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM songs WHERE id = $1', [id]);
    res.json(response.rows);
};

//CREATE SONG AND CREATE REALTION ON TABLE LISTSONG
const createSong = async (req, res) => {
    const list_id = parseInt(req.params.id_list);
    const { name, artist, url, album, image } = req.body;
    const response = await pool.query('INSERT INTO songs (name, artist, url, album, image) VALUES ($1, $2, $3, $4, $5)', [name, artist, url, album, image]);
    const id = await pool.query('SELECT * FROM songs WHERE name = $1' , [name]);
    const response2 = await pool.query('INSERT INTO listsongs (list_id, song_id) VALUES ($1, $2)', [list_id, id.rows[0].id]);    

    res.json({
        message: 'Song Added successfully',
        body: {
            song: {name, artist, url, album, image}
        }
    })
};

//UPDATE SONG
const updateSong = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, author, url, list_id} = req.body;

    const response = await pool.query('UPDATE songs SET name = $1, author = $2, url = $3, list_id = $4 WHERE id = $5', [
        name,
        author,
        url,
        list_id,
        id
    ]);
    res.json('Song Updated Successfully');
};

//DELETE SONG
const deleteSong = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM songs where id = $1', [
        id
    ]);
    res.json(`Song ${id} deleted Successfully`);
};

module.exports = {
    getSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong
};