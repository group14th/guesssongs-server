const axios = require("axios")
const generateQuery = require("../helpers/generateQuery")

class SongController {
  static fetchSongs (req, res, next) {
    const query = generateQuery()
    console.log(query)
    axios({
      url: `https://api.deezer.com/search?q=${query}`,
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
        // const random = Math.ceil(Math.random() * data.data.length)
        // songs.push(data.data[random])
        // res.status(200).json({ artist: songs[0].artist.name, title: songs[0].title, preview: songs[0].preview })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = SongController