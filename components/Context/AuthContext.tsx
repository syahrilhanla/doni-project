import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
} from "firebase/auth";
import  { auth, db } from "../Store/firebase";
import {

  getFirestore,
  setDoc,
  doc,
  getDoc,
  DocumentSnapshot,
} from "firebase/firestore";



interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
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
  
 const signUp = (email: string, password: string, username:string, name:string, phoneNumber:string,generation:string) => {
   return createUserWithEmailAndPassword(auth, email, password)
     .then((response) => {
       const user1 = response.user.uid
       try {
         const studentsCol = setDoc(doc(db, 'studentsList', user1), {
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
           progresStatus: "",
           
         })
       } catch (e) {
         console.log(e);
         
       }
     })
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
        getDoc(doc(db, "studentsList", response.user.uid))
          .then((userData:any) => {
            if (userData.data()) {
            setUser(userData.data())
          }
        })
         return response.user
      })
      ;
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };
  return (
<AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};