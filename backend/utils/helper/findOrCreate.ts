import Recruiter from "../../models/users/Recruiter";
import Candidate from "../../models/users/Candidate";

export default async function findOrCreateUser(
  role: string,
  profile: {
    id: string;
    displayName?: string;
    username?: string;
    email?: string;
  },
  providedkey: string
) {
  let user;
  const providerQuery = { [providedkey]: profile.id };
  if (role === "recruiter") {
    user = await Recruiter.findOne(providerQuery);
    if (user) {
      // User already exists
      console.log("User already exists");
      return user;
    } else {
      // Create a new user if not found
      user = new Recruiter({
        username: profile.displayName || profile.username,
        email: profile.email,
        ...providerQuery,
        role,
      });
      await user.save();
    }
  } else {
    user = await Candidate.findOne(providerQuery);
    if (user) {
      // User already exists
      console.log("User already exists");
      return user;
    } else {
      // Create a new user if not found
      user = new Candidate({
        username: profile.displayName || profile.username,
        email: profile.email,
        ...providerQuery,
        role,
      });
      await user.save();
    }
  }

  return user;
}
