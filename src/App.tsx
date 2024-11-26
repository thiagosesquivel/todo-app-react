import  NotificationList  from "@/shared/NotificationList/components/NotificationList";
import AppRoutes from "@/router";
import authState from "@/features/auth/state/authState";
import { useEffect } from "react";

function App() {
  const initializeAuth = authState((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  return (
    <>
      <NotificationList />
      <AppRoutes />;
    </>
  );
}

export default App;
