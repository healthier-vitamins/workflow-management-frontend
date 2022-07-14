import { useAtom } from "jotai";
import { useState } from "react";
import { userAtom } from "../App";

function Login() {
    const [login, setLogin] = useAtom(userAtom);
    const [form, setForm] = useState({
        "email": "",
        "password": ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch("https://workflow-management-backend.herokuapp.com/login-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    .then((response) => response.json())
    .then((data) => setLogin(data))
    }

    return (
        <>
        <p>Login</p>
        <form onSubmit={(e) => e.preventDefault()}>

                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Login</button>
        </form>
        </>
    )
}
export default Login