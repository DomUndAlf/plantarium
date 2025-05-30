import { useEffect, useState } from "react";
import Header from "./Header";

function GardenBase(){
        const [user, setUser] = useState<any>(null);
    
        useEffect(() => {
        const fetchUser = async () => {
          const res = await fetch("http://localhost:3001/users/me", {
            credentials: "include",
          });
    
          if (res.ok) {
            const data = await res.json();
            setUser({
                height: data.data.height,
                width: data.data.width,
                });
            }
        };
         fetchUser();
      }, []);
    return (
        <>
        <Header />


        </>
    )
}

export default GardenBase;