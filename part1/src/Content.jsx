const Part = ({ part, exercises }) => {
    return (
        <div>
            <p>
                {part} {exercises}
            </p>
        </div>
    )
}
const Content = ({ parts }) => {
    return (
        <div>
            {parts.parts.map((part, index) => (
                <Part key={index} part={part.name} exercises={part.exercises} />
            ))}
        </div>
    )
}
export default Content