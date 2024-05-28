import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../storage/actions";

function CheckToken({ unauthRedirect }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkTokenValidity = useCallback(() => {
        const expire = localStorage.getItem("expire");
        const now = new Date();

        if (expire) {
            const expireDate = new Date(expire);
            const timeDiff = expireDate.getTime() - now.getTime();

            if (timeDiff > 0) {
                dispatch(setAuth(true));
                return;
            }
        }

        dispatch(setAuth(false));
        navigate(unauthRedirect);
    }, [dispatch, navigate, unauthRedirect]);

    useEffect(() => {
        checkTokenValidity();

        const intervalId = setInterval(checkTokenValidity, 15000);

        return () => clearInterval(intervalId);
    }, [checkTokenValidity]);

    return null;
}

export default CheckToken;