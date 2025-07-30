import { Outlet } from "react-router";

export const FullScreenLayout = () => {
  return (
    <main className="w-screen flex bg-gray-100 dark:bg-gray-900 overflow-y-auto p-10">
      <Outlet />
    </main>
  );
};
