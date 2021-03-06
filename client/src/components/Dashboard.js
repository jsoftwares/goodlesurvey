import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div style={ {textAlign: 'center'}}>
            <h1>Dashboard</h1>
            <div className="fixed-action-btn">
                <Link to="/surveys/new" className="btn-floating btn-large red waves-effect waves-light pulse">
                    <i className="large material-icons">add</i>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;