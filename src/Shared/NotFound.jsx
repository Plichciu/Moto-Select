import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

function NotFound() {
  return (
    <div>
      <Header />

      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        {/* ICON */}
        <TbError404 className="text-[120px] text-primary mb-6" />

        {/* TEXT */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nie znaleziono strony
        </h1>
        <p className="text-gray-500 max-w-md mb-8">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
        </p>

        {/* BUTTON */}
        <Link to="/">
          <Button size="lg">Powrót do strony głównej</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
