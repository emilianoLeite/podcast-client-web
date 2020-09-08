import 'cypress-plugin-snapshots/commands';

import firebaseInstance from "../../src/shared/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";


attachCustomCommands({ Cypress, cy, firebase });
