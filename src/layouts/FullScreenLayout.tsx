import { Outlet } from "react-router";

export const FullScreenLayout = () => {
  return (
    <main className="h-screen w-screen flex bg-gray-100 dark:bg-gray-900 p-10">
      <Outlet />
    </main>
  );
};
