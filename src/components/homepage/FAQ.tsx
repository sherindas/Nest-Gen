"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-slate-950 hover:text-orange-600 transition-colors cursor-pointer"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-orange-600" : ""
          }`}
        />
      </button>
      {isOpen && (
        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}

export function FAQ() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqsEn = [
    {
      question: "How are service estimates calculated?",
      answer:
        "We provide transparent, line-item estimates covering components, labor, and diagnostic testing before starting work. There are no hidden fees or unexpected charges.",
    },
    {
      question: "Do you supply hardware as well as installation?",
      answer:
        "Yes. For products like inverters, motors, CCTV cameras, and automation controllers, we supply genuine OEM hardware with valid manufacturer warranties alongside full professional setup.",
    },
    {
      question: "What does the workmanship warranty cover?",
      answer:
        "All our installations and technical repairs include a comprehensive workmanship warranty. Should any issue recur due to our service, our engineering supervisor will re-evaluate and rectify it promptly.",
    },
    {
      question: "How do I request warranty assistance or log a support ticket?",
      answer:
        "Simply select 'Warranty Support / Existing Service Issue' in our inquiry form or contact our direct hotline with your details.",
    },
  ];

  const faqsKn = [
    {
      question: "ಸೇವಾ ವೆಚ್ಚವನ್ನು ಹೇಗೆ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ?",
      answer:
        "ಕೆಲಸ ಪ್ರಾರಂಭಿಸುವ ಮುನ್ನ ಬಿಡಿಭಾಗಗಳು, ಕೆಲಸದ ಕೂಲಿ ಮತ್ತು ಪರೀಕ್ಷಾ ವೆಚ್ಚವನ್ನು ಒಳಗೊಂಡ ಸ್ಪಷ್ಟ ವಿವರವನ್ನು ನೀಡುತ್ತೇವೆ. ಯಾವುದೇ ಗುಪ್ತ ಶುಲ್ಕಗಳಿರುವುದಿಲ್ಲ.",
    },
    {
      question: "ನೀವು ಉಪಕರಣಗಳ ಮಾರಾಟ ಮತ್ತು ಅಳವಡಿಕೆ ಎರಡನ್ನೂ ಮಾಡುತ್ತೀರಾ?",
      answer:
        "ಹೌದು. ಇನ್ವರ್ಟರ್‌ಗಳು, ಮೋಟಾರ್ ಪಂಪ್‌ಗಳು, ಸಿಸಿಟಿವಿ ಕ್ಯಾಮೆರಾಗಳು ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಆಟೊಮೇಷನ್ ಉಪಕರಣಗಳನ್ನು ಮೂಲ ಕಂಪನಿ ವಾರಂಟಿಯೊಂದಿಗೆ ಮಾರಾಟ ಮತ್ತು ಅಳವಡಿಕೆ ಮಾಡುತ್ತೇವೆ.",
    },
    {
      question: "ಕೆಲಸದ ವಾರಂಟಿಯಲ್ಲಿ ಏನು ಒಳಗೊಂಡಿದೆ?",
      answer:
        "ನಾವು ಮಾಡಿದ ಎಲ್ಲಾ ರಿಪೇರಿ ಮತ್ತು ಅಳವಡಿಕೆ ಕೆಲಸಗಳಿಗೆ ಸಮಗ್ರ ವಾರಂಟಿ ಇರುತ್ತದೆ. ನಮ್ಮ ಕೆಲಸದಿಂದ ಯಾವುದೇ ಸಮಸ್ಯೆ ಮರುಕಳಿಸಿದರೆ ಉಚಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ ಸರಿಪಡಿಸಲಾಗುತ್ತದೆ.",
    },
    {
      question: "ವಾರಂಟಿ ಸಹಾಯ ಅಥವಾ ಬೆಂಬಲವನ್ನು ಹೇಗೆ ಪಡೆಯುವುದು?",
      answer:
        "ನಮ್ಮ ಅರ್ಜಿಯಲ್ಲಿ 'ವಾರಂಟಿ ಬೆಂಬಲ / ಸೇವಾ ಸಮಸ್ಯೆ' ಆಯ್ಕೆಮಾಡಿ ವಿವರ ಕಳುಹಿಸಿ ಅಥವಾ ನಮ್ಮ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.",
    },
  ];

  const list = language === "kn" ? faqsKn : faqsEn;

  return (
    <section id="faq" className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            {t("faq_tag")}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            {t("faq_title")}
          </h2>
          <p className="text-sm text-slate-600">
            {t("faq_desc")}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {list.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
