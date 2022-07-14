import { useState } from "react";

function CreateProject() {
  const [form, setForm] = useState({
    services_required: "",
    customer_company: "",
    customer_poc_name: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
  
  function handleSubmit() {
    
  }

  return (
    <>
      <p>Create a Project:</p>
      <div className="create-project-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="create-project-field">
            <label htmlFor="services_required">Services Required:</label>
            <br />
            <input
              id="services_required"
              className="project-input"
              name="services_required"
              type="text"
              value={form["services_required"]}
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
              value={form["customer_company"]}
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
              value={form["customer_poc_name"]}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSubmit}>Create Project</button>
        </form>
      </div>
    </>
  );
}

export default CreateProject;
