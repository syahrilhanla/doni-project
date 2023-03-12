import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
} from "firebase/auth";
import { auth, db } from "../Store/firebase";
import { setDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { StudentsData } from "../../typings";

interface UserType {
  email: string | null;
  uid: string | null;
}

interface Props {
  student: StudentsData;
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
    generation: string,
    proposalDate: string
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
          user.email;
          const studentsCol = setDoc(doc(db, "studentsList", user1), {
            uid: user1,
            email: email,
            password: password,
            username: username,
            phoneNumber: phoneNumber,
            name: name,
            generation: generation,
            profOne: "",
            proposalDate: proposalDate,
            profTwo: "",
            examinerOne: "",
            examinerTwo: "",
            profilePict: "",
            fileSeminar: "",
            fileSidang: "",
            note: "",
            statusApprove: false,
            progressStatus: "",
            role: userRole(String(emailType)),
            files: [
              {
                chapterOne: "",
                chapterTwo: "",
                chapterThree: "",
                chapterFour: "",
                chapterFive: "",
              },
            ],
            notifications: [
              {
                id: user1,
                isRead: true,
                text: "",
                title: "",
              },
            ],
            seminarDate: [
              {
                dateToBe: "",
                isApprovedByProfOne: "",
                isApprovedByProfTwo: "",
              },
            ],
            sidangDate: [
              {
                dateToBe: "",
                isApprovedByProfOne: "",
                isApprovedByProfTwo: "",
              },
            ],
            title: [
              {
                isApprovedByProfOne: "",
                isApprovedByProfTwo: "",
                titleText: "",
              },
            ],
            activity: [
              {
                feedbackActivity: "",
                feedbackDate: "",
                feedbackProfName: "",
                feedbackText: "",
              },
            ],
          });
        } catch (e) {
          console.log(e);
        }
      }
    );
  };

  const registerProf = (
    email: string,
    password: string,
    username: string,
    name: string
  ) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        const user1 = username + Math.random() * 10000;
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
          user.email;
          const professorCol = setDoc(doc(db, "professorList", user1), {
            uid: user1,
            email: email,
            password: password,
            username: username,
            name: name,
            profilePict: "",
            role: "dosen",
            notifications: [
              {
                id: user1,
                isRead: false,
                text: "",
                title: "",
              },
            ],
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
        onSnapshot(
          doc(db, "studentsList", response.user.uid),
          (userData: any) => {
            if (userData.data()) {
              setUser(userData.data());
            }
          }
        );
        // getDoc(doc(db, "studentsList", response.user.uid)).then(
        //   (userData: any) => {
        //     if (userData.data()) {
        //       setUser(userData.data());
        //     }
        //   }
        // );
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
      value={{
        user,
        signUp,
        logIn,
        logOut,
        logInDosen,
        logInAdmin,
        registerProf,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
