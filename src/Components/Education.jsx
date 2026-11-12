
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEducation } from "../Redux/ResumeSlice";

function Education() {
  const dispatch = useDispatch();

  const education = useSelector(
    (state) => state.resume.education
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      updateEducation({
        [name]: value
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Education details saved successfully!");
  };

  return (
    <div className="education-container">
      <h2>Education Details</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="degree"
          placeholder="Degree / Qualification"
          value={education.degree}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="institution"
          placeholder="School / College"
          value={education.institution}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="startYear"
          placeholder="Start Year"
          value={education.startYear}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="endYear"
          placeholder="End Year"
          value={education.endYear}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Save Education
        </button>
      </form>
    </div>
  );
}

export default Education;
