// on peut au utiliser un hook pour charger le user
import { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useUser } from "@/lib/store/userState";

const useInitializeUser = (user: User | undefined) => {
  useEffect(() => {
    useUser.setState({ user });
  }, [user]);
};

export default useInitializeUser;
