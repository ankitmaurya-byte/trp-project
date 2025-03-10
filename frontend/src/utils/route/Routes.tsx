// Route configurations

import JobDashboard from "../../pages/dashboard/recuriter/JobDashboard";

import {
  About,
  Home,
  Contact,
  SignIn,
  SignUp,
  JobsPage,
  CandidateDashboard,
  TrpScore,
  JobSearch,
  RecruiterDashboard,
  CandidateSearch,
  AdvanceCandidateSearch,
  CandidateSearchResults,
  JobPostingForm,
  JobDetailsForm,
  KanbanBoard,
} from "./LasyComponent";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <SignIn /> },
  { path: "/register", element: <SignUp /> },
  { path: "/jobs", element: <JobsPage /> },
];

export const candidateRoutes = [
  { path: "/dashboard/candidate", element: <CandidateDashboard /> },
  { path: "/dashboard/trp-score", element: <TrpScore /> },
  { path: "/job-search", element: <JobSearch /> },
];

export const recruiterRoutes = [
  { path: "/dashboard/recruiter", element: <RecruiterDashboard /> },
  {
    path: "/dashboard/recruiter/application/:jobPostId",
    element: <KanbanBoard />,
  },
  { path: "/candidate/search", element: <CandidateSearch /> },
  { path: "/candidate/advance-search", element: <AdvanceCandidateSearch /> },
  { path: "/candidate/search-result", element: <CandidateSearchResults /> },
  { path: "/job-post", element: <JobPostingForm /> },
  { path: "/job-post-details", element: <JobDetailsForm /> },
  { path: "/track-jobPost", element: <JobDashboard /> },
];
