import landingPage from "@/assets/landing-page.png";
import { FlightSearch } from "@/components/FlightSearch";

export const LandingPage = () => {
  return (
    <section className="w-screen flex flex-col gap-3 justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <img
          src={landingPage}
          alt="Landing Page"
          className="mx-auto object-cover dark:invert"
        />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Re-Flights
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Your journey to explore flight data starts here.
        </p>
      </div>
      <FlightSearch />
    </section>
  );
};
