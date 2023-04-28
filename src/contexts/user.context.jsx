import { createContext ,useState,useEffect} from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const Usercontext = createContext({
    currentuser:null,
    setcurrentuser: ()=>null,
});

export const UserProvider = ({children}) =>{

    const [currentuser,setcurrentuser] = useState(null);
    const value=  {currentuser,setcurrentuser};

    useEffect(()=>{
       const unsubscribe = onAuthStateChangedListener((user)=>{
        if(user)
        {
            createUserDocumentFromAuth(user);
        }
       setcurrentuser(user);
       });
       return unsubscribe;
    },[]);

    return <Usercontext.Provider value={value}>{children}</Usercontext.Provider>

}
