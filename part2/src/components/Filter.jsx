const Filter = ({ handlePersonChange, filter }) => {
    return (
        <div>
            filter person by name: <input onChange={handlePersonChange} value={filter} />
        </div>
    )
}

export default Filter