import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const handleCreateUser = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed!", "Could not create user. Please check your input or try again later!");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <LoadingOverlay message="Creating user..." />;
  return <AuthContent onAuthenticate={handleCreateUser} />;
}

export default SignupScreen;
