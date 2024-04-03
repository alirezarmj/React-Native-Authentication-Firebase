import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { Login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const token = await Login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed!", "Could not log you in. Please check your credentials or try again later!");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <LoadingOverlay message="Loging you in..." />;
  return <AuthContent isLogin onAuthenticate={handleLogin} />;
}

export default LoginScreen;
