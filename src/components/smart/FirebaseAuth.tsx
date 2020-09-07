import React from "react";
import { auth as googleAuth } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { PublicContext } from "../../context/Auth";

import { auth } from "../../shared/firebase";

const FirebaseAuth: React.FC = () => {
  const { loggedIn } = React.useContext(PublicContext);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/home",
    signInOptions: [googleAuth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid firebase's default redirect after successful sign-in.
      signInSuccessWithAuthResult: () => false,
      // signInSuccessWithAuthResult: ({ user }: { user: { uid: string } }) => {
      //   login(user);
      //   return false; // Avoid firebase's default redirect after successful sign-in.
      // },
    },
  };


  if (!loggedIn) {
  // TODO: investigate *how* the component hides itself. Additionally, figure
  // out if we can control this behaviour.
    return (
      <StyledFirebaseAuth
      // uiCallback={ui => ui.disableAutoSignIn()}
        uiConfig={uiConfig}
        firebaseAuth={auth}
      />
    );
  }

  return null;
};

export default FirebaseAuth;
