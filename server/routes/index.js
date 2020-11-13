const router = require("express").Router()
const Controller = require("../controllers/SongController")

router.get("/", (req, res) => {
  res.send("tes")
})
router.get("/songs", Controller.fetchSongs)

module.exports = router