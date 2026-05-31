import React, { useState } from "react";

const FAQ_DATA = [
  {
    question: "Czy korzystanie z serwisu jest darmowe?",
    answer:
      "Tak, przeglądanie ogłoszeń i wyszukiwanie samochodów jest całkowicie darmowe. Opłaty mogą dotyczyć jedynie dodawania ogłoszeń premium.",
  },
  {
    question: "Jak dodać ogłoszenie?",
    answer:
      "Wystarczy założyć konto, przejść do sekcji „Dodaj ogłoszenie” i wypełnić krótki formularz. Cały proces zajmuje tylko kilka minut.",
  },
  {
    question: "Czy ogłoszenia są weryfikowane?",
    answer:
      "Tak, dokładamy wszelkich starań, aby ogłoszenia były rzetelne i aktualne. Część z nich przechodzi dodatkową weryfikację.",
  },
  {
    question: "Czy mogę filtrować wyniki po lokalizacji?",
    answer:
      "Oczywiście. Możesz wybrać miejscowość oraz promień wyszukiwania, aby znaleźć oferty najbliżej Ciebie.",
  },
  {
    question: "Jak skontaktować się ze sprzedającym?",
    answer:
      "Dane kontaktowe sprzedającego znajdują się bezpośrednio w ogłoszeniu. Możesz zadzwonić lub napisać bezpośrednio.",
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Najczęściej zadawane pytania
        </h2>
        <p className="text-gray-600">
          Masz pytania? Tutaj znajdziesz odpowiedzi na najważniejsze z nich.
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="space-y-4">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className="border rounded-2xl p-5 transition hover:shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-medium text-gray-900">
                  {item.question}
                </span>
                <span
                  className={`text-xl transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;
