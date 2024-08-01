const Note = ({ note, number, deletePerson, id }) => {
  return (
    <li>{note} - {number} <button onClick={() => deletePerson(id)}>delete</button> </li>
  )
}

export default Note