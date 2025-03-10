import { lazy } from "react";

export const Home = lazy(() => import("../../pages/Home"));
export const About = lazy(() => import("../../pages/About"));
export const Contact = lazy(() => import("../../pages/Contact"));
export const SignIn = lazy(() => import("../../pages/auth/SignIn"));
export const SignUp = lazy(() => import("../../pages/auth/SignUp"));
export const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
export const JobsPage = lazy(() => import("../../pages/Jobs"));
export const TrpScore = lazy(() => import("../../pages/TrpScore"));
export const CandidateDashboard = lazy(
  () => import("../../pages/dashboard/candidate/Candidate")
);
export const RecruiterDashboard = lazy(
  () => import("../../pages/dashboard/recuriter/Recruiter")
);
export const CandidateSearch = lazy(
  () => import("../../pages/recruiter/CandidateSearch")
);
export const AdvanceCandidateSearch = lazy(
  () => import("../../pages/recruiter/AdvanceCandidateSearch")
);
export const CandidateSearchResults = lazy(
  () => import("../../pages/recruiter/CandidateSearchResult")
);
export const JobPostingForm = lazy(
  () => import("../../pages/recruiter/CreateJobs")
);
export const JobDetailsForm = lazy(
  () => import("../../pages/recruiter/JobDescription")
);
export const KanbanBoard = lazy(
  () => import("../../pages/recruiter/AplicationTrackingInterface")
);
export const JobSearch = lazy(() => import("../../pages/candidate/JobSearch"));
