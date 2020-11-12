const axios = require("axios")

class SongController {
  static fetchSongs (req, res, next) {
    axios({
      url: "https://api.deezer.com/search?q=blackpink",
      method: "get"
    })
      .then(({data}) => {
        let songs = []
        data.data.forEach((element, index) => {
          let payload = {
            id: index+1,
            title: element.title,
            embed: element.preview
          }
          songs.push(payload)
        });
        res.status(200).json(songs)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = SongController