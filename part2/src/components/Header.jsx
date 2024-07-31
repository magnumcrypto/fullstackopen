import Part from "./Part"
import TotalExercises from "./TotalExercises"

const Header = ({ course }) => {
    const totalExercises = course.parts.reduce((acc, current) => acc + current.exercises, 0)
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
            )}
            <TotalExercises totalExercises={totalExercises}></TotalExercises>
        </div>
    )
}

export default Header