// export const Header = ({theme})=>{

/** Implementing with context*/
import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext";
import withAuth from "./withAuth";

const Header = ({loggedInUser, setLoggedInUser}) => {


    function LoggedIn({loggedInUser, setLoggedInUser}) {
        return (
            <div>
                <span>Logged in as {loggedInUser}</span>&nbsp;&nbsp;
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        setLoggedInUser("");
                    }}
                >
                    Logout
                </button>
            </div>
        );
    }

    function NotLoggedIn({loggedInUser, setLoggedInUser}) {
        return (
            <button
                className="btn-secondary"
                onClick={(e) => {
                    e.preventDefault();
                    const username = window.prompt("Enter Login Name:", "");
                    setLoggedInUser(username);
                }}
            >
                Login
            </button>
        );
    }

    const {theme} = useContext(ThemeContext);
    return (
        <div className="padT4 padB4">
            <div className="container mobile-container">
                <div className="d-flex justify-content-between">
                    <div className="">
                        <img src="images/SVCClogo.png" alt="SVCC Home Page" className=""/>

                    </div>
                    <div className="light">
                        <h4 className="header-title">
                            Bengaluru Code Camp
                        </h4>
                    </div>
                    <div className={theme == "light" ? "" : "text-info"}>
                        {loggedInUser && loggedInUser.length > 0 ? (
                            <LoggedIn
                                loggedInUser={loggedInUser}
                                setLoggedInUser={setLoggedInUser}
                            />
                        ) : (
                            <NotLoggedIn
                                loggedInUser={loggedInUser}
                                setLoggedInUser={setLoggedInUser}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withAuth(Header)