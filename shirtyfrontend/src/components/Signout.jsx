import { useEffect } from "react";
import { toast } from 'react-toastify';
import auth from "../services/authService";

function Signout({ history, settingUser }) {
  useEffect(() => {
    auth.signout();

    settingUser(null);
    toast.success('Signout successfully.');
    history.replace("signin");
  }, [settingUser, history]);

  return null;
}

export default Signout;
