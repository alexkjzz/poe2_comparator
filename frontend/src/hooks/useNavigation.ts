import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate("/"),
    goComparator: () => navigate("/comparator"),
    goSettings: () => navigate("/settings"),
  };
};
