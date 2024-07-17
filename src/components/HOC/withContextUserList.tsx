import { useUserContext } from "../../Context/UserContext";

const withContextUserList =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  (props) => {
    const userContext = useUserContext();
    return <Component {...props} userContext={userContext} />;
  };

export default withContextUserList;
