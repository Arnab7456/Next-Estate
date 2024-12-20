import { faqs } from "@/lib/constant/faqs.constants";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

export default function FAQPage() {
  return (
    <div className=" text-center">
      <h1 className=" text-4xl font-sans font-bold pb-2">Frequently Asked Questions </h1>
      <p className=" font-serif pb-4"> Quick answers to any questions you may have.</p>

      <div className="w-full h-fit py-0 flex justify-center items-center">
        <div className="md:w-3/6 w-full flex flex-col items-center rounded-lg ">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="flex w-full justify-between items-center cursor-pointer focus:outline-none p-4 text-left font-medium text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="flex w-full justify-between items-center cursor-pointer focus:outline-none p-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
