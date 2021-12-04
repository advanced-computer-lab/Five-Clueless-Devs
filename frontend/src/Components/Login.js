import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";

const Login = () => {

    let history = useHistory();
    const [user, setUser] = useState({
        userId: '',
        password: ''
    })

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onLogin = () => {
        localStorage.setItem('userId', user.userId);
        history.push("/");
    }

    return (
        <form>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                <h2>Login</h2>

                <TextField
                    className='form-control'
                    label='User Id'
                    name="userId"
                    value={user?.userId}
                    type={"number"}
                    onChange={(e) => onChange(e)}
                    style={{ margin: "10px" }}
                />
                <TextField
                    className='form-control'
                    label='Password'
                    type="password"
                    name="password"
                    value={user?.password}
                    onChange={(e) => onChange(e)}
                    style={{ margin: "10px" }}
                />

                <Button onClick={onLogin} variant={"outlined"} type={"submit"} style={{ margin: "10px" }}>Login</Button>

            </div>
        </form>
    );
}

export default Login;