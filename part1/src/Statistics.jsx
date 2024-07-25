import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad, totalFeedbacks, average, percent }) => {
    if (totalFeedbacks === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Statistics</h1>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={totalFeedbacks} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={percent + " %"} />
        </div>
    )
}
export default Statistics