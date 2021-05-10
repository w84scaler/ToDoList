const router = require("express").Router();
const Task = require('../controllers/taskcontroller');
const multer = require("multer");
const path = require("path");
const authToken = require('../middleware/authToken')

router.get('/task', authToken, async (req,res) => {
    if (!req.query.status) {
        const saved = await Task.list();
        if (saved)
            res.status(200).send(saved);
        else
            res.status(400).send('DB error while getting list of tasks');
    }
    else {
        const saved = await Task.listFilterStatus(req.query.status);
        if (saved)
            res.status(200).send(saved);
        else
            res.status(400).send('DB error while getting list of tasks with filter');
    }
});

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(global.appRoot, "./files"));
    },
    filename: (req, file, cb) => {
        let str = "";
        for (let i = 0; i < 9; i++)
            str += Math.trunc((Math.random() * 10));
        const uniquePrefix = Date.now() + "-" + str;
        cb(null, uniquePrefix + "-" + file.originalname);
    }
});

var upload = multer({storage: storageConfig});
router.post('/task', authToken, upload.array('filedata', 20), async (req,res) => {
    const saved = await Task.add(req);
    if (saved)
        res.status(200).send(saved);
    else
        res.status(400).send('DB error while adding task. Json data is incorrect');
});

router.put('/task', authToken, upload.array('filedata', 20), async (req,res) => {
    const saved = await Task.update(req);
    if (saved)
        res.status(200).send(saved);
    else
        res.status(400).send('DB error while updating task');
});

router.delete('/task/*', authToken, async (req,res) => {
    const saved = await Task.delete(req.path.substring(req.path.lastIndexOf('/') + 1, req.path.length));
    if (saved)
        res.status(200).send(saved);
    else
        res.status(400).send('DB error while deleting task');
});

router.get('/file/*', authToken, (req,res) => {
    const file = req.url.substring(req.url.lastIndexOf("/") + 1, req.url.length);
    const filepath = global.appRoot + "\\files\\" + file;
    const filename = file.substring(24, file.length);
    res.download(filepath, filename);
});

module.exports = router;