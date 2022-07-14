import { useNavigate } from "react-router-dom"

function Projects() {
    let navigate = useNavigate();
    

    return (
        <>
        <p>projects</p>
        <button onClick={() => navigate("/createproject")}>Create Project</button>
        </>
    )
}
export default Projects