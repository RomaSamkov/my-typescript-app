import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Якщо користувач не залогінений, перенаправляємо на сторінку логіну
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Якщо користувач залогінений, рендеримо дочірній компонент
  return children;
};

export default PrivateRoute;
