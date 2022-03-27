class MemoryDaos {
  constructor() {
    this.elementos = [];
  }

  list(id) {
    const user = this.elementos.find(x => {
      return x.id == id
    })

    if (!user) {
      throw new Error("Error al lisar usuario: Elmento no econtrado");
    } else {
      return user;
    }
  }

  listAll() {
    return [...this.elementos];
  }

  guardar(element) {
    let newId;
    if (this.elementos.length === 0) {
      newId = 1;
    } else {
      newId = this.elementos[this.elementos.length - 1].id + 1;
    }
    const newElement = { ...element, id: newId };
    this.elementos.push(newElement);
    return newElement;
  }
}

module.exports = MemoryDaos;