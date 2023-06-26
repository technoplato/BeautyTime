import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { Client } from "../types";
import * as Clipboard from "expo-clipboard";

export const upsertClient = async (
  client: Partial<Client>
): Promise<Partial<Client>> => {
  const id = client.id || (await addDoc(collection(db, "clients"), client)).id;

  // Required because firebase does not allow undefined values
  const undefinedOmittedClient = Object.fromEntries(
    Object.entries({ ...client, id }).filter(([_, v]) => v !== undefined)
  );

  const clientRef = doc(db, "clients", id);
  await setDoc(clientRef, undefinedOmittedClient, { merge: true });
  return { ...client, id };
};

export const deleteClient = async (id: string) => {
  const clientRef = doc(db, "clients", id);
  return deleteDoc(clientRef);
};

export const getClients = async () => {
  const querySnapshot = await getDocs(collection(db, "clients"));
  const clients: Client[] = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Client;
  });
  return clients;
};

export const signInAnonymouslyToFirebase = async (): Promise<{
  uid: string;
}> => {
  const auth = getAuth();
  return signInAnonymously(auth).then((user) => {
    return {
      uid: user.user?.uid,
    };
  });
};

export const useSignIn = () => {
  const [uid, setUid] = useState("");
  const isSignedIn = uid !== "";

  useEffect(() => {
    signInAnonymouslyToFirebase().then((user) => {
      console.log(user.uid);
      Clipboard.setStringAsync(user.uid);
      setUid(user.uid);
    });
  }, []);

  return { isSignedIn, uid };
};
