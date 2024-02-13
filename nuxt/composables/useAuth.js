export const useAuth = () => {
  const authUser = useState("auth_user", () => null);
  return {authUser}
};
