import { useUser } from "@clerk/clerk-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function RequireAuth({ children }) {
  const { user, isLoaded } = useUser();

  // ⏳ Clerk jeszcze się ładuje
  if (!isLoaded) {
    return (
      <div>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // ❌ NIEZALOGOWANY
  if (!user) {
    return (
      <div>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold">Wymagane logowanie</h2>
          <p className="text-gray-500">
            Musisz być zalogowany, żeby uzyskać dostęp do tej strony.
          </p>

          <Link to="/sign-in">
            <Button size="lg">Rejestracja</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ✅ ZALOGOWANY
  return children;
}

export default RequireAuth;
