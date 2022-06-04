import { useContext, createContext, useState, useEffect } from "react";
import { staffSignIn, staffSignUp } from "../api/supervisor";
import { notification } from "antd";

const authContext = createContext();

export default function useAuth() {
    return useContext(authContext);
}
export function AuthProvider({ children }) {
    // console.log(children)
    const [user, setUser] = useState(null);
    // const [lsChanged, setlsChanged] = useState(false);

    const openNotification = (title, message, success = false) => {
        notification[success ? "success" : "error"]({
            message: title,
            description: message,
            className: "custom-class",
            style: {
                width: 400,
            },
            placement: "bottomRight",
        });
    };

    async function signIn(username, password) {
        const _user = await staffSignIn(username, password);
        if (_user.msg === "success") {
            setUser(_user._user);

            localStorage.setItem("id", _user._user._id);
            localStorage.setItem("userType", "supervisor");
            return true;
        } else {
            openNotification("Signin Faild", _user.err && _user.msg.message);
            return false;
        }
    }
    async function signUp(values) {
        console.log(values);
        const _user = await staffSignUp(values);
        if (_user.msg === "success") {
            openNotification("Signup Success", "Please Signin Again", true);
            return true;
        } else {
            openNotification("Signup Faild", _user.err && _user.msg.message);
            return false;
        }
    }
    async function signOut() {
        setUser(null);

        localStorage.removeItem("id");
        localStorage.removeItem("userType");
        localStorage.removeItem("userData");
        window.history.go("/");
    }
    function setFromCache() {
        // setlsChanged((p) => !p);
        const userType = localStorage.getItem("userType");
        const userid = localStorage.getItem("id");
        if (userType === "supervisor" && userid) {
            try {
                const _user = JSON.parse(localStorage.getItem("userData"));
                setUser(_user);
                return null;
            } catch (error) {
                return null;
            }
        }
    }

    useEffect(() => {
        if (!user) {
            try {
                const _user = JSON.parse(localStorage.getItem("userData"));
                setUser(_user);
            } catch (error) {}
        }
    }, []);
    useEffect(() => {
        if (user) {
            try {
                const _user = JSON.parse(
                    localStorage.setItem("userData", JSON.stringify(user))
                );
                setUser(_user);
            } catch (error) {}
        }
    }, [user]);

    const values = { signIn, user, signUp, signOut, setFromCache };
    return (
        <authContext.Provider value={values}>{children}</authContext.Provider>
    );
}
