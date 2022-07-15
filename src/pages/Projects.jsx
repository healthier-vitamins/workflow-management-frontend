import { useState } from "react";

function Projects() {
  const [allProjects, setAllProjects] = useState({});
  const [entry, setEntry] = useState({
    services_required: "",
    customer_company: "",
    customer_poc_name: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEntry({
      ...entry,
      [name]: value,
    });
  }

  function handleSubmit() {
    fetch("https://workflow-management-backend.herokuapp.com/create-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllProjects(data);
      });
  }

  return (
    <>
      <p>Create a Project:</p>
      <div className="create-project-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <div className="create-project-field">
              <label htmlFor="services_required">Services Required:</label>
              <br />
              <input
                id="services_required"
                className="project-input"
                name="services_required"
                type="text"
                value={entry["services_required"]}
                onChange={handleChange}
              />
            </div>

            <div className="create-project-field">
              <label htmlFor="customer_company">Customer Company:</label>
              <br />
              <input
                id="customer_company"
                className="project-input"
                name="customer_company"
                type="text"
                value={entry["customer_company"]}
                onChange={handleChange}
              />
            </div>

            <div className="create-project-field">
              <label htmlFor="customer_poc_name">Customer POC Name:</label>
              <br />
              <input
                className="project-input"
                id="customer_poc_name"
                name="customer_poc_name"
                type="text"
                value={entry["customer_poc_name"]}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleSubmit}>Create Project</button>
          </fieldset>
        </form>
        
      </div>
    </>
  );
}
export default Projects;
