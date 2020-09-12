import { useEffect, useState, useContext } from "react";
import { User } from "../../../shared/firebase/entities";
import { currentUserRecord } from "../../../shared/firebase";
import { PrivateContext } from "../../../context/Auth";

export const useUserData = () => {
  const { currentUser } = useContext(PrivateContext);
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    return currentUserRecord(currentUser.uid).onSnapshot(
      doc => setUserData(doc.data() as User)
    );
  }, [currentUser.uid]);

  return userData;
};
