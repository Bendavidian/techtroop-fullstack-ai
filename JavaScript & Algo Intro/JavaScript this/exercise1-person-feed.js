const person = {
  hungry: true,

  feed: function () {
    if (this.hungry) {
      this.hungry = false;
      console.log("I'm no longer hungry!")
    }
  }
}

person.feed()
