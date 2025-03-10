// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { verifyUserSession } from "../store/actions/userActions";
import { setRecruiter } from "../store/slice/recruiterSlice";
import { useAppDispatch } from "../store/store";

export interface AuthData {
  isAuthenticated: boolean;
  role?: string;
}
export const useAuth = () => {
  const dispatch = useAppDispatch();

  const verifyAuth = async (): Promise<AuthData> => {
    const result = await dispatch(verifyUserSession());
    dispatch(
      setRecruiter({
        provider: result.payload.provider,
        providerId: result.payload.providerId,
        avatar: result.payload.avatar,
        emailTemplates: result.payload.emailTemplates,
        company: result.payload.company,
        jobsPosted: result.payload.jobsPosted,
        notification: result.payload.notification,
        savedcandidates: result.payload.savedcandidates,
        savedSearch: result.payload.savedSearch,
      })
    );
    if (
      result.payload &&
      typeof result.payload === "object" &&
      "isAuthenticated" in result.payload
    ) {
      return result.payload as AuthData;
    }

    return { isAuthenticated: false };
  };

  return useQuery<AuthData>({
    queryKey: ["auth"],
    queryFn: verifyAuth,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
