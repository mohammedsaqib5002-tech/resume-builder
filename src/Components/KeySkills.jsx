
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSkills } from "../Redux/ResumeSlice";

function KeySkills() {
  const [skill, setSkill] = useState("");

  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills);

  const addSkill = () => {
    const trimmedSkill = skill.trim();

    if (!trimmedSkill) return;

    if (skills.includes(trimmedSkill)) {
      alert("Skill already exists!");
      return;
    }

    dispatch(updateSkills([...skills, trimmedSkill]));
    setSkill("");
  };

  const removeSkill = (skillToRemove) => {
    dispatch(
      updateSkills(
        skills.filter((item) => item !== skillToRemove)
      )
    );
  };

  return (
    <div className="key-skills-container">
      <h2>Key Skills</h2>

      <input
        type="text"
        placeholder="Enter a skill"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />

      <button type="button" onClick={addSkill}>
        Add Skill
      </button>

      <ul>
        {skills.map((item, index) => (
          <li key={`${item}-${index}`}>
            {item}
            <button
              type="button"
              onClick={() => removeSkill(item)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeySkills;
