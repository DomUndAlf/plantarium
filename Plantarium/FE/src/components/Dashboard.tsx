import { useEffect, useState } from "react";
import CreateGarden from "./CreateGarden";
import Dash from "./Dash";

function Dashboard () {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:3001/users/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.data); // ⬅️ Struktur wie in deinem Backend
      }
    };
     fetchUser();
  }, []);

 function isNew():boolean {
    if (!user)
        return true;
    else return false;
    }
    
    if (isNew()) return <CreateGarden/>
    else 
    return (<p> Hallo {user.name} </p>);
}

export default Dashboard;