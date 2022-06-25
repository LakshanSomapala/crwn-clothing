import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContex } from "../../contexts/user.context";
import { signOutUser } from '../../utils/firebase/firebase.util'

const Navigation = () => {
    const { currentUser } = useContext(UserContex); //get the current user value
 
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container" >
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>
                                SIGN OUT
                            </span>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;