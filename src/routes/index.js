const { Router }  = require('express');
const router = Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser, getUsersByPass } = require('../controllers/user.controller');
const { getLists, getListById, createList, updateList, deleteList, getSongsFromList, getListByUser } = require('../controllers/list.controller');
const { getSongs, getSongById, createSong, updateSong, deleteSong } = require('../controllers/song.controller');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);
router.post('/usersByPass', getUsersByPass);

router.get('/lists', getLists);
router.get('/lists/:id', getListById);
router.post('/lists', createList);
router.put('/lists/:id', updateList)
router.delete('/lists/:id', deleteList);
router.get('/lists/:id/songs', getSongsFromList);
router.get('/listsByUser/:id', getListByUser);

router.get('/songs', getSongs);
router.get('/songs/:id', getSongById);
router.post('/lists/:id_list/songs',  createSong);
router.put('/songs/:id', updateSong)
router.delete('/songs/:id', deleteSong);

module.exports = router;