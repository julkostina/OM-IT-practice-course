import { takeLatest, put, call, all } from "typed-redux-saga/macro";
import { USER_ACTION_TYPES } from "./user.types";
import { User } from "firebase/auth";
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpSuccess,
  signUpStart
} from "./use.action";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation,
} from "../../utils/firebase/firebase.utils";

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* signInAfterSignUp({ payload: { user, additionalDetails } }:SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}
export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* signUp({ payload: { email, password, displayName } }: ReturnType<typeof signUpStart>) {
  try {
    const userCreditential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if(userCreditential){
      const {user} = userCreditential;
    yield* put(signUpSuccess(user, { displayName }));}
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signInWithGoogle);
}
export function* signInWithEmail({ payload: { email, password } }:EmailSignInStart) {
  try {
    const userCreditential  = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if(userCreditential){
      const {user} = userCreditential;
    yield* call(getSnapshotFromUserAuth, user);}
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}
export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
