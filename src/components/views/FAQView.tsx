import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "../../types";

export function FAQView({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const activeFaqs = faqs.filter(f => f.is_active);

  return (
    <div className="space-y-8 py-4 animate-fade-in font-serif" id="faq-page">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight">Tanya Jawab Umum (FAQ)</h2>
        <p className="text-slate-500 font-sans text-xs uppercase tracking-wider">
          Menjawab pertanyaan-pertanyaan yang paling sering diajukan mengenai program rehabilitasi sosial.
        </p>
      </div>

      <div className="max-w-2xl mx-auto border border-amber-100 rounded-2xl bg-white divide-y divide-amber-150 overflow-hidden shadow-sm">
        {activeFaqs.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm font-serif italic">FAQ belum diinput.</div>
        ) : (
          activeFaqs.map((f, i) => (
            <div
              key={f.id}
              className="bg-white overflow-hidden transition"
              id={`faq-item-${f.id}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-serif font-bold text-slate-900 text-sm md:text-base focus:outline-hidden hover:bg-amber-50/30 transition cursor-pointer"
                id={`faq-btn-${f.id}`}
              >
                <span>{f.question}</span>
                <ChevronDown className={`w-4 h-4 text-amber-500 shrink-0 transition duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>

              {openIndex === i && (
                <div className="p-5 pt-0 text-slate-700 text-xs md:text-sm leading-relaxed bg-amber-50/15 font-sans border-t border-amber-50">
                  {f.answer}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// 8. KONTAK VIEW
// ==========================================
