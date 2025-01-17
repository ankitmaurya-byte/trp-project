import Recruiter from "../../models/users/Recruiter";
import Candidate from "../../models/users/Candidate";

export interface SSOProfile {
  id: string;
  displayName?: string;
  username?: string;
  emails?: { value: string }[];
  provider?: string;
  _json?: any;
}
export default async function handleSSOAuth(
  profile: SSOProfile,
  provider: string,
  role: "recruiter" | "candidate"
) {
  const username = profile.displayName || profile.username || profile.id;
  const email = profile.emails?.[0]?.value;

  try {
    if (role === "recruiter") {
      // Check for existing recruiter
      let recruiter = await Recruiter.findOne({
        $or: [{ [`${provider}Id`]: profile.id }, { email: email }],
      });

      if (recruiter) {
        // Update provider ID if it's not set
        if (!recruiter.providerId) {
          recruiter.providerId = profile.id;
          await recruiter.save();
        }
        return recruiter;
      }

      // Create new recruiter
      recruiter = new Recruiter({
        username,
        email,
        provider,
        providerId: profile.id,
        company: profile._json?.company || "", // Optional: Extract company from profile if available
        notification: [], // Initialize empty notification array
        emailTemplates: [], // Initialize empty email templates array
        savedcandidates: [], // Initialize empty saved candidates array
        jobsPosted: [], // Initialize empty jobs posted array
        contactNumber: profile._json?.phone || null, // Optional: Extract phone if available
      });

      await recruiter.save();
      return recruiter;
    } else {
      // Check for existing candidate
      let candidate = await Candidate.findOne({
        $or: [{ providerId: profile.id }, { email: email }],
      });

      if (candidate) {
        // Update provider ID if it's not set
        if (!candidate.providerId) {
          candidate.providerId = profile.id;
          candidate.provider = provider;
          await candidate.save();
        }
        return candidate;
      }

      // Create new candidate
      candidate = new Candidate({
        username,
        email,
        provider,
        providerId: profile.id,
        skills: [], // Initialize empty skills array
        notification: [], // Initialize empty notification array
        status: "active", // Set default status
        experience: [], // Initialize empty experience array
        education: [], // Initialize empty education array
        jobsApplied: [], // Initialize empty jobs applied array
        currentLocation: profile._json?.location || "", // Optional: Extract location if available
        yearOfExperience: "0", // Default value
        noticePeriod: "0", // Default value
        contact: profile._json?.phone || null, // Optional: Extract phone if available
      });

      await candidate.save();
      return candidate;
    }
  } catch (error) {
    console.error("Error in handleSSOAuth:", error);
    throw new Error(`Failed to handle ${role} SSO authentication`);
  }
}
