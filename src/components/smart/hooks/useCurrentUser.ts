import { useEffect, useState, useContext } from "react";
import { UserData } from "../../../shared/firebase/interfaces";
import { currentUserRecord } from "../../../shared/firebase";
import { PrivateContext } from "../../../context/Auth";

export const useCurrentUser = () => {
  const { currentUser } = useContext(PrivateContext);
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    return currentUserRecord(currentUser.uid).onSnapshot(
      doc => setUserData(doc.data() as UserData)
    );
  }, [currentUser.uid]);

  return {
    currentUser,
    userData,
  };
};
