import { FaHome, FaKey, FaBuilding } from "react-icons/fa";

const benefits = [
  {
    icon: <FaHome className="text-4xl text-blue-500 mb-4" />,
    description:
      "Find affordable flats and properties with minimal brokerage fees. Nest Scout ensures a cost-effective solution for your housing needs.",
  },
  {
    icon: <FaKey className="text-4xl text-blue-500 mb-4" />,
    description:
      "Discover properties with lower security deposits. Start your journey to a hassle-free living experience with our curated property listings.",
  },
  {
    icon: <FaBuilding className="text-4xl text-blue-500 mb-4" />,
    description:
      "New flats and properties are added daily to help you find your next perfect place with ease. Explore a wide range of options at Nest Scout.",
  },
];

const PromotionPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="text-xl font-bold">BENEFITS OF Nest Scout</h2>
        <span className="text-lg text-gray-600 mt-2 font-sans">
          Why choose <span className="dark:text-white font-semibold">Nest </span>
          <span className="dark:text-blue-500">Scout?</span>
        </span>
      </div>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4 mt-10 justify-items-center">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="sm:text-sm text-xs text-slate-500 dark:text-slate-400 font-medium flex flex-col items-center border p-6 bg-slate-100 gap-4 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg cursor-pointer min-h-[21px] w-3/4 md:w-full"
          >
            {benefit.icon}
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionPage;
