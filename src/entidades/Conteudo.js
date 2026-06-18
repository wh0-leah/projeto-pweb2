class Conteudo {
  constructor(id, title, type, genre, year, imageUrl, usuarioId) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.genre = genre;
    this.year = year;
    this.imageUrl = imageUrl;
    this.usuarioId = usuarioId;
  }
}

module.exports = Conteudo;