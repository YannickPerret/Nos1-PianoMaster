
const create = (id, title, content) => {
  const note = {
    id,
    title,
    content,
  };
  client.set(id, JSON.stringify(note), (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Note ${id} created`);
    }
  });
};

const getById = (id) => {
  client.get(id, (error, value) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Note ${id} retrieved`);
      return value;
    }
  });
};

const update = (id, title, content) => {
  client.get(id, (error, value) => {
    if (error) {
      console.error(error);
    } else {
      const note = JSON.parse(value);
      note.title = title;
      note.content = content;
      client.set(id, JSON.stringify(note), (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Note ${id} updated`);
        }
      });
    }
  });
};

const deleteById = (id) => {
  client.del(id, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Note ${id} deleted`);
    }
  });
};

export default { create, getById, update, deleteById };