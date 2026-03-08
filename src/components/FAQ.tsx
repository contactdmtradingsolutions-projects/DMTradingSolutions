import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What regions in Africa do you primarily serve?",
    answer: "While our headquarters are in South Africa, we specialize in cross-border trade and logistics across the SADC region, with a particularly strong focus on the Democratic Republic of the Congo (DRC)."
  },
  {
    question: "How do you ensure the quality of sourced products?",
    answer: "We conduct rigorous supplier verification, including background checks, financial health assessments, and on-site visits when necessary. We also ensure suppliers hold required export licenses and quality certifications (like ISO)."
  },
  {
    question: "Can you handle the entire import/export process?",
    answer: "Yes, we provide end-to-end supply chain management. This includes product sourcing, price negotiation, documentation guidance (certificates of origin, commercial invoices, etc.), customs clearance coordination, and final delivery logistics."
  },
  {
    question: "What types of industries do you typically procure for?",
    answer: "We serve a diverse range of sectors, including mining (heavy machinery and safety gear), construction (bulk materials), industrial manufacturing (components and parts), NGO relief efforts, and general wholesale distribution."
  },
  {
    question: "Do you assist with company registration in South Africa?",
    answer: "Absolutely. We provide professional assistance for both local and international clients to register Private Companies (PTY LTD), Non-Profit Companies (NPC), and External/Foreign Branch Companies, ensuring full legal compliance."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1 w-8 bg-corporate-gold"></span>
            <span className="text-corporate-navy font-semibold tracking-wider uppercase text-sm">
              FAQ
            </span>
            <span className="h-1 w-8 bg-corporate-gold"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-corporate-navy mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Common questions about our procurement and logistics services in Africa.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-gray-200 rounded-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <span className="font-semibold text-corporate-navy text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-corporate-gold transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-4 bg-white text-gray-600 leading-relaxed border-t border-gray-200">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
