import React from "react";
import { auth as googleAuth } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { PublicContext } from "../../context/Auth";

import { auth } from "../../shared/firebase";
import { Redirect } from "react-router-dom";

const FirebaseAuth: React.FC = () => {
  const { login, loggedIn } = React.useContext(PublicContext);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "", // not used
    signInOptions: [googleAuth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: ({ user }: { user: { uid: string } }) => {
        login(user);
        return false; // Avoid firebase's default redirect after successful sign-in.
      },
    },
  };

  if (loggedIn) {
    // isso só redireciona uma vez, apesar de parecer que este componente não
    // deixa de ser renderizado, uma vez que o`loggedIn` fica true "pra sempre"
    return <Redirect to="/home" />;
  } else {
    // TODO:
    // parece que este componente "se esconde" automaticamente após login com sucesso...
    // investigar se é isso mesmo
    return (
      <StyledFirebaseAuth
        uiCallback={ui => ui.disableAutoSignIn()}
        uiConfig={uiConfig}
        firebaseAuth={auth}
      />
    );
  }
};

export default FirebaseAuth;
