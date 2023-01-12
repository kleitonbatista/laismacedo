import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import firebase from "../service/firebaseConnection";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  // const [user,setUser] = useState({id: 1, nome: "kleiton"});
  const [user, setUser] = useState(null);

  const [loadingAuth, setLoadingAuth] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("SistemUser");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signup(email, password, nome) {
    setLoadingAuth(true);
    console.log("aqui");
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({
            nome: nome,
            avatarUrl: null,
          })
          .then(async (res) => {
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
              avatarUrl: null,
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem vindo a Laís Macedo Joias e acessórios");
          })
          .catch((err) => {
            console.log("erro ao salvar na tabela de usuario");
          });
      })
      .catch((err) => {
        console.log(err);
        setLoadingAuth(false);
        toast.error("Ops, algo deu errado!");
      });
  }

  function storageUser(data) {
    localStorage.setItem("SistemUser", JSON.stringify(data));
  }

  //logout
  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem("SistemUser");
    toast.success("Até breve!");
    setUser(null);
  }

  //login
  async function signIn(email, password) {
    setLoadingAuth(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        let uid = res.user.uid;
        const userProfile = await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get();
        let data = {
          uid: uid,
          nome: userProfile.data().nome,
          email: res.user.email,
          avatarUrl: userProfile.data().avatarUrl,
        };
        toast.success("Bem vindo novamente a Laís Macedo joias e acessórios");
        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      })
      .catch((err) => {
        setLoadingAuth(false);
        console.log("erro no login");
        console.log(err);
        toast.error("Ops, algo deu errado ao tentar realizar login!");
      });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signup, signOut, signIn, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
