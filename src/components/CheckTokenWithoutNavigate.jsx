import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../storage/actions";

export default function CheckTokenWithoutNavigate() {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkTokenValidity = () => {
            const expire = localStorage.getItem("expire");
            if (expire) {
                const now = new Date();
                const expireDate = new Date(expire);
                dispatch(setAuth(now < expireDate));
            } else {
                dispatch(setAuth(false));
            }
        };

        checkTokenValidity();
    }, [dispatch]);

    return null;
}