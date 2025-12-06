import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../redux/store"; // adjust the path to your store

export default function useAuth(): boolean {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { user } = useTypedSelector((state) => state.auth);

  return !!user; // returns true if user exists, false otherwise
}
