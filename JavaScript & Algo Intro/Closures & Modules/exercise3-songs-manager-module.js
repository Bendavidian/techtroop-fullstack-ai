// Exercise 3: SongsManager Module
//
// songs is a private object — only video IDs are stored, not full URLs.
// addSong extracts the ID from the URL and logs the internal state each time
// so you can verify what is stored (private helper log inside the module).
// getSong reconstructs the full URL from the stored ID.

const SongsManager = function () {
  const songs = {}             // private — stores only video IDs

  const addSong = function (name, url) {
    const videoId = url.split("?v=")[1]
    songs[name] = videoId

    // private helper log — shows compressed internal storage after each add
    console.log("Internal songs storage:", songs)
  }

  const getSong = function (name) {
    console.log("https://www.youtube.com/watch?v=" + songs[name])
  }

  return {
    addSong,
    getSong
  }
}

const songsManager = SongsManager()

songsManager.addSong("sax",      "https://www.youtube.com/watch?v=3JZ4pnNtyxQ")
songsManager.addSong("how long", "https://www.youtube.com/watch?v=CwfoyVa980U")
songsManager.addSong("ain't me", "https://www.youtube.com/watch?v=D5drYkLiLI8")

songsManager.getSong("sax")    // https://www.youtube.com/watch?v=3JZ4pnNtyxQ
