function Header({ counts = {} }) {
    const {
        total = 0,
        completed = 0,
        watching = 0,
        plan = 0,
        dropped = 0
    } = counts;

    return (
        <header className="topbar">
            <div className="logo-box">
                <h1>Series Tracker</h1>
                <p>Track. Rate. Review.</p>
            </div>

            <div className="stats">
                <span>Total: {total}</span>
                <span>Completed: {completed}</span>
                <span>Watching: {watching}</span>
                <span>Plan to Watch: {plan}</span>
                <span>Dropped: {dropped}</span>
            </div>
        </header>
    );
}

export default Header;