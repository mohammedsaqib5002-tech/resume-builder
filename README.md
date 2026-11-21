# Resume Builder — Create, Preview & Download Professional Resumes

A modern, responsive web-based Resume Builder that helps users create professional resumes through a guided form, organize career information, choose a resume template, preview their final resume, and download it as a PDF.

The application focuses on simplicity, structured data entry, validation, responsive design, and an efficient resume-building experience.

---

## 🚀 Live Application

**Live Demo:**  
https://resume-builder-a63c4djyn-mohammedsaqib5002-1985s-projects.vercel.app/

**GitHub Repository:**  
https://github.com/mohammedsaqib5002-tech/resume-builder

---

## 📸 Application Screenshots

### Home Page

![Resume Builder Home Page](Screenschots/home.png)

## 📌 Project Overview

Creating a professional resume from scratch can be time-consuming, especially when formatting, organizing information, and maintaining a consistent layout.

This application simplifies the process by providing a step-by-step interface where users can enter their professional information, manage resume sections, select a template, review the generated resume, and export it as a PDF.

The application uses React for the user interface, Redux Toolkit for centralized state management, and React Hook Form for form handling and validation.

---

## ✨ Key Features

### Resume Creation
- Guided multi-step resume creation workflow
- Personal details and professional summary
- Work experience details
- Educational background
- Key skills
- Projects with project links
- Certifications with certificate links

### Form Validation
- Required-field validation
- Email and phone validation
- Validation for project and certification information
- Required project and certificate URLs
- URL format validation
- Error messages displayed alongside the relevant fields
- Prevents navigation when required data is invalid

### Resume Templates & Preview
- Multiple resume template options
- Template selection
- Organized resume layout
- Preview before downloading
- Back-to-edit functionality

### PDF Export
- Generate downloadable PDF resumes
- Preserve the resume layout during export
- Capture resume content for document generation

### User Experience
- Responsive interface for desktop, tablet and mobile devices
- Clear navigation between form steps
- Add and manage projects and certifications
- Simple, user-friendly design
- Consistent UI components

---

## 🖥️ Application Workflow

The application follows a structured workflow to help users complete their resumes.

1. **Home Page** — Explore the resume builder and available templates.
2. **Template Selection** — Choose a resume design.
3. **Personal Information** — Enter contact details and professional summary.
4. **Work Experience** — Add employment information.
5. **Education** — Enter academic qualifications.
6. **Key Skills** — Add relevant professional skills.
7. **Projects** — Add project details and required project URLs.
8. **Certifications** — Enter certification details and required certificate URLs.
9. **Resume Preview** — Review the completed resume.
10. **PDF Download** — Export the resume for sharing or printing.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React | Component-based UI development |
| JavaScript | Application logic and interactivity |
| Material UI (MUI) | UI components, layout and styling |
| Redux Toolkit | Centralized resume state management |
| React Redux | Connecting React components to Redux |
| React Hook Form | Form handling and field validation |
| React Router | Navigation between application pages |
| jsPDF | PDF document generation |
| html2canvas | Capturing resume content for PDF export |
| Vite | Development server and production bundling |
| Vitest | Unit and component test execution |
| React Testing Library | Testing UI behavior and interactions |

---

## 🏗️ Project Structure

```text
resume-builder/
├── public/
├── src/
│   ├── Components/
│   │   ├── Header.jsx
│   │   └── TemplateCard.jsx
│   ├── Data/
│   │   └── Data.js
│   ├── Pages/
│   │   ├── Home.jsx
│   │   ├── Details.jsx
│   │   ├── Preview.jsx
│   │   └── About.jsx
│   ├── Redux/
│   │   └── ResumeSlice.js
│   ├── test/
│   │   └── setup.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

*The structure above represents the main application organization. Individual test files, assets and other supporting files may also be present.*

---

## ⚙️ Installation & Setup

### Prerequisites

Ensure the following are installed:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/mohammedsaqib5002-tech/resume-builder.git
```

### 2. Navigate to the project folder

```bash
cd resume-builder
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the localhost URL displayed in your terminal to use the application.

---

## 🧪 Testing

The project uses **Vitest** and **React Testing Library** to test components and application functionality.

### Run tests

```bash
npm test
```

### Current test results

- **Test files:** 5
- **Tests passed:** 19
- **Status:** All tests passing

Testing helps verify component behavior, application logic and expected interactions while reducing the risk of regressions during development.

---

## 📦 Production Build

To generate the optimized production version:

```bash
npm run build
```

Vite generates the production-ready files in the `dist/` directory.

To test the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

The application is deployed using **Vercel**.

The production deployment allows users and evaluators to access the application through a public web link without installing the project locally.

**Deployment URL:**  
https://resume-builder-a63c4djyn-mohammedsaqib5002-1985s-projects.vercel.app/

---

## 📱 Responsive Design

The interface is designed to support different screen sizes:

- **Desktop:** Full-width layouts with comfortable form spacing and resume preview.
- **Tablet:** Adapted layouts for medium-sized screens.
- **Mobile:** Responsive sections, accessible controls, and mobile-friendly form navigation.

---

## 🎯 Learning Outcomes

This project demonstrates practical implementation of:

- React component-based development
- Reusable UI components
- State management with Redux Toolkit
- Dynamic forms and field arrays
- Form validation and error handling
- Client-side routing
- Responsive UI design
- PDF generation
- Automated testing
- Production build and deployment

---

## 🔮 Future Improvements

- More professionally designed resume templates
- Save and restore resume data between sessions
- Additional customization options for fonts and colors
- More advanced PDF layout and page-break handling
- Improved accessibility and keyboard navigation
- Additional test coverage for form validation and PDF export

---

## 👨‍💻 Author

**Resume Builder Project**

Developed as a frontend application demonstrating modern React development practices, user-centered design, validation, state management, and deployment.

---

## 📄 License

This project is available for educational and portfolio purposes. A formal license can be added if the project is intended for open-source distribution.
