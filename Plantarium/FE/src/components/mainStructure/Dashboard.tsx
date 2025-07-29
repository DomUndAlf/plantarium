import { useEffect, useState } from "react";
import CreateGarden from "../firstLogin/CreateGarden";
import MainFrame from "./MainFrame";

function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:3001/users/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      }
    };
    fetchUser();
  }, []);

  function isNew(): boolean {
    if (!user)
      return true;
    else return false;
  }
  if (isNew()) return <CreateGarden />  
  else
    return (<MainFrame />);
}

export default Dashboard;