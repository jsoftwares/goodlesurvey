import { connect } from "react-redux";
import { Link }  from 'react-router-dom';
import Payments from "./Payments";

const Header = props => {

    /**props.auth can only be 1 of 3 values: null-default/not sure, false-logged out, an user object */
    const redenderMenu = () => {
        switch (props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>;
            default:
                return (
                    <>
                    <li style={ {margin: '0 10px'}}>Credits: {props.auth.credits}</li>
                    <li><Payments /></li>
                    <li><a href="/api/v1/logout">Logout</a></li>
                    </>
                );
        }
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={props.auth ? '/home':'/'} className="left brand-logo">goodle</Link>
                <ul id="nav-mobile" className="right"> {/* hide-on-med-and-down */}
                    { redenderMenu() }
                </ul>
            </div>
      </nav>
    );
};

const mapStateToProps = ({ auth}) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);