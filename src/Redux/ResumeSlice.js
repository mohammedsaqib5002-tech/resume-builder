
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTemplate: 1,

  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    jobTitle: "",
    summary: ""
  },

  workExperience: {
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: ""
  },

  education: {
    institution: "",
    degree: "",
    startYear: "",
    endYear: ""
  },

  skills: [],

  // New sections
  projects: [],

  certifications: []
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,

  reducers: {
    setTemplate: (state, action) => {
      state.selectedTemplate = Number(action.payload);
    },

    updatePersonalInfo: (state, action) => {
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload
      };
    },

    updateWorkExperience: (state, action) => {
      state.workExperience = {
        ...state.workExperience,
        ...action.payload
      };
    },

    updateEducation: (state, action) => {
      state.education = {
        ...state.education,
        ...action.payload
      };
    },

    updateSkills: (state, action) => {
      state.skills = action.payload;
    },

    // Save projects
    updateProjects: (state, action) => {
      state.projects = action.payload;
    },

    // Save certifications
    updateCertifications: (state, action) => {
      state.certifications = action.payload;
    }
  }
});

export const {
  setTemplate,
  updatePersonalInfo,
  updateWorkExperience,
  updateEducation,
  updateSkills,
  updateProjects,
  updateCertifications
} = resumeSlice.actions;

export default resumeSlice.reducer;