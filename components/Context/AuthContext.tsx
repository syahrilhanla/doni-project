import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
} from "firebase/auth";
import { auth, db } from "../Store/firebase";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = (
    email: string,
    password: string,
    username: string,
    name: string,
    phoneNumber: string,
    generation: string
  ) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        const user1 = response.user.uid;
        const emailType = user.email?.split("@")[1];

        if (!emailType) return;

        const userRole = (emailType: string) => {
          switch (emailType) {
            case "mhs.ulm.ac.id":
              return "mhs";
            case "dosen.ulm.ac.id":
              return "dosen";
            default:
              return "admin";
          }
        };

        try {
          const studentsCol = setDoc(doc(db, "studentsList", user1), {
            uid: user1,
            email: email,
            password: password,
            username: username,
            phoneNumber: phoneNumber,
            name: name,
            generation: generation,
            profOne: "",
            profTwo: "",
            profilePict: "",
            note: "",
            statusApprove: "",
            progressStatus: "",
            role: userRole(String(emailType)),
          });
        } catch (e) {
          console.log(e);
        }
      }
    );
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);
        getDoc(doc(db, "studentsList", response.user.uid)).then(
          (userData: any) => {
            if (userData.data()) {
              setUser(userData.data());
            }
          }
        );
        return response.user;
      }
    );
  };
  const logInDosen = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);
        getDoc(doc(db, "professorList", response.user.uid)).then(
          (userData: any) => {
            if (userData.data()) {
              setUser(userData.data());
            }
          }
        );
        return response.user;
      }
    );
  };
  const logInAdmin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);
        getDoc(doc(db, "adminList", response.user.uid)).then(
          (userData: any) => {
            if (userData.data()) {
              setUser(userData.data());
            }
          }
        );
        return response.user;
      }
    );
  };
  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };
  return (
    <AuthContext.Provider
      value={{ user, signUp, logIn, logOut, logInDosen, logInAdmin }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
