import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <header className="dash-header">
        <div className="dash-header_container">
            <Link to="/dash">
            <h1 className="dash-header_title">techNotes</h1>
            </Link>
            <nav className="dash-header_nav">
                {/* buttons will go here */}
            </nav>
        </div>
    </header>
  )
}

export default DashHeader