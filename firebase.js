import admin from "firebase-admin";

const privateKey =
  process.env.FIREBASE_PRIVATE_KEY;

if (!privateKey) {

  throw new Error(
    "FIREBASE_PRIVATE_KEY missing"
  );

}

const serviceAccount = {

  projectId:
    process.env.FIREBASE_PROJECT_ID,

  clientEmail:
    process.env.FIREBASE_CLIENT_EMAIL,

  privateKey:
    privateKey.replace(
      /\\n/g,
      "\n"
    ),

};

admin.initializeApp({
  credential:
    admin.credential.cert(
      serviceAccount
    ),
});

export default admin;