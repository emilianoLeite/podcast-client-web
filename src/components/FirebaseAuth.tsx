import React from "react";
import { auth as googleAuth } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import AuthContext from "../context/Auth";

import { auth } from "../shared/Firebase";

const FirebaseAuth: React.FC<{}> = () => {
  const { login, setCurrentUser } = React.useContext(AuthContext);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "", // not used
    signInOptions: [googleAuth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (result: { user: { uid: string } }) => {
        setCurrentUser(result.user);
        login();
        return false; // Avoid firebase's default redirect after successful sign-in.
      },
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
};

export default FirebaseAuth;
