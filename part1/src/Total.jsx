const Total = ({ parts }) => {
    let total = parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises;
    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}
export default Total