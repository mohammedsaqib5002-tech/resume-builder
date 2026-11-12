
import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./ResumeSlice";

export const store = configureStore({
  reducer: {
    resume: resumeReducer
  }
});
