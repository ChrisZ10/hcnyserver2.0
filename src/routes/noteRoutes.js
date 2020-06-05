const mongoose = require('mongoose');
const Note = mongoose.model('Note');
const reqAuth = require('../middlewares/reqAuth');

const router = express.Router();

router.use(reqAuth);

// router.get('/notes', async (req, res) => {
//     try {
//         req.query.keyword?
//         announcements = await Announcement.find({
//             $or: [
//                 {'title': {$regex: `${req.query.keyword}`}}, 
//                 {'content': {$regex: `${req.query.keyword}`}}
//             ]
//         }) :
//         announcements = await Announcement.find({}, null, {sort: {createdAt: -1}});

//         res.send({announcements});
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// });

// router.post('/api/v1/announcement', reqRole, async (req, res) => {
//     const {title, content, url} = req.body;
//     try {
//         const announcement = new Announcement({title, content, url});
//         await announcement.save();

//         res.send({announcement});
//     } catch (err) {
//         return res.status(422).send(err.message);
//     }
// });

// router.put('/api/v1/announcement', reqRole, async (req, res) => {
//     const {id, field, payload} = req.body;

//     try {
//         const announcement = await Announcement.findById(id);
//         announcement[field] = payload;
//         await announcement.save();

//         res.send({announcement});
//     } catch (err) {
//         return res.status(422).send(err.message);
//     }
// });

// router.delete('/api/v1/announcement', reqRole, async (req, res) => {
//     const {id} = req.body;

//     try {
//         const announcement = await Announcement.findByIdAndDelete(id);
//         res.send({announcement});
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// });

module.exports = router;