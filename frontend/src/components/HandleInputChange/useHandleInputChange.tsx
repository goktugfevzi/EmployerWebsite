import { useCallback } from "react";

export const useHandleInputChange = (
    state: any,
    callback: (data: any) => void
) => {
    const handleInputChange = useCallback(() => {
        if (
            state.email === "" ||
            state.password === "" ||
            state.userName === "" ||
            state.departmentId === null
        ) {
            console.log("karakter gir");
        }

        const data: any = {
            userName: state.userName,
            email: state.email,
            password: state.password,
            departmentId: state.departmentId,
        };

        callback(data);
    }, [state, callback]);

    return handleInputChange;
};
