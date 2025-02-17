import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigation = useNavigate();
  const token = Cookies.get("token");
  const user = !!token;
  useEffect(() => {
    if (!user) {
      navigation("/");
    }
  }, [user, navigation]);
}
