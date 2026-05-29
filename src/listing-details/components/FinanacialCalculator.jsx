import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function FinanceCalculator({ price }) {
  const [carPrice, setCarPrice] = useState("");
  const [months, setMonths] = useState(36);
  const [monthlyRate, setMonthlyRate] = useState(null);

  useEffect(() => {
    if (price) {
      setCarPrice(Number(price));
    }
  }, [price]);

  const calculateRate = () => {
    if (!carPrice || !months) return;
    const rate = carPrice / months;
    setMonthlyRate(rate.toFixed(2));
  };

  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Kalkulator finansowania</h2>

      {/* PRICE */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Cena samochodu (zł)
        </label>
        <Input
          type="number"
          value={carPrice}
          onChange={(e) => setCarPrice(e.target.value)}
          placeholder="Enter car price"
        />
      </div>

      {/* MONTHS */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Okres spłaty (miesiące)
        </label>

        <div className="flex gap-3 items-center">
          <Input
            type="number"
            min={1}
            max={100}
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-28"
          />

          <input
            type="range"
            min={1}
            max={100}
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* BUTTON */}
      <Button className="w-full" onClick={calculateRate}>
        Oblicz miesieczną ratę
      </Button>

      {/* RESULT */}
      {monthlyRate && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">Szacowana miesięczna rata</p>
          <p className="text-3xl font-bold text-primary">{monthlyRate} PLN</p>
        </div>
      )}
    </div>
  );
}

export default FinanceCalculator;
