const router = require('express').Router()

router.get('/', (req, res, next) => {
    try {
        res.send('hello world')
    } catch (error) {
        next(error)
    }
})

router.post('/', (req, res, next) => {
    console.log(req.body)
    res.send('WE ARE HERE')
})

module.exports = router;