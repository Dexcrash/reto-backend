const { Router }  = require('express');
const router = Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser, getUsersByPass } = require('../controllers/user.controller');
const { getLists, getListById, createList, updateList, deleteList, getSongsFromList, getListByUser } = require('../controllers/list.controller');
const { getSongs, getSongById, createSong, updateSong, deleteSong } = require('../controllers/song.controller');

//CRUD users
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

//CRUD lists
router.get('/lists', getLists);
router.get('/lists/:id', getListById);
router.post('/lists', createList);
router.put('/lists/:id', updateList)
router.delete('/lists/:id', deleteList);

//CRUD songs
router.get('/songs', getSongs);
router.get('/songs/:id', getSongById);
router.post('/lists/:id_list/songs',  createSong);
router.put('/songs/:id', updateSong)
router.delete('/songs/:id', deleteSong);

//get all songs froma list
router.get('/lists/:id/songs', getSongsFromList);
//get all list from a user
router.get('/listsByUser/:id', getListByUser);
//get a specific user by name and password
router.post('/usersByPass', getUsersByPass);


module.exports = router;