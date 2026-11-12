
import { describe, it, expect } from "vitest";
import resumeReducer, {
  setTemplate,
  updatePersonalInfo,
  updateWorkExperience,
  updateEducation,
  updateSkills,
  updateProjects,
  updateCertifications,
} from "./ResumeSlice";

describe("Resume Redux Slice", () => {
  it("should have the correct initial state", () => {
    const state = resumeReducer(undefined, { type: "unknown" });

    expect(state.selectedTemplate).toBe(1);
    expect(state.personalInfo.fullName).toBe("");
    expect(state.skills).toEqual([]);
    expect(state.projects).toEqual([]);
    expect(state.certifications).toEqual([]);
  });

  it("should update the selected template", () => {
    const state = resumeReducer(undefined, setTemplate(2));
    expect(state.selectedTemplate).toBe(2);
  });

  it("should update personal information", () => {
    const state = resumeReducer(
      undefined,
      updatePersonalInfo({
        fullName: "Alex Smith",
        email: "alex@example.com",
      })
    );

    expect(state.personalInfo.fullName).toBe("Alex Smith");
    expect(state.personalInfo.email).toBe("alex@example.com");
  });

  it("should update work experience", () => {
    const state = resumeReducer(
      undefined,
      updateWorkExperience({
        company: "ABC Technologies",
        position: "Frontend Developer",
      })
    );

    expect(state.workExperience.company).toBe("ABC Technologies");
    expect(state.workExperience.position).toBe("Frontend Developer");
  });

  it("should update education", () => {
    const state = resumeReducer(
      undefined,
      updateEducation({
        institution: "ABC University",
        degree: "B.Tech",
      })
    );

    expect(state.education.institution).toBe("ABC University");
    expect(state.education.degree).toBe("B.Tech");
  });

  it("should update skills", () => {
    const state = resumeReducer(
      undefined,
      updateSkills(["React", "JavaScript", "CSS"])
    );

    expect(state.skills).toEqual(["React", "JavaScript", "CSS"]);
  });

  it("should update projects", () => {
    const projects = [
      {
        name: "Resume Builder",
        technologies: "React, Redux",
        description: "A resume building application",
        link: "https://example.com",
      },
    ];

    const state = resumeReducer(undefined, updateProjects(projects));

    expect(state.projects).toEqual(projects);
  });

  it("should update certifications", () => {
    const certifications = [
      {
        name: "React Certification",
        organization: "ABC Institute",
        date: "2026",
        link: "https://example.com",
      },
    ];

    const state = resumeReducer(
      undefined,
      updateCertifications(certifications)
    );

    expect(state.certifications).toEqual(certifications);
  });
});
