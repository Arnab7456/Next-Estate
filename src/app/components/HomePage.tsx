"use client";

import { motion } from "framer-motion";
import ListingItem from "./srcListingItem";
import Link from "next/link";
import PromotionPage from "./PromotionPage";
import AccordionPage from "./AccordationPage";
import { ListingProos } from "@/types/type";

interface HomeClientProps {
  rentListings: ListingProos[] | null;
  saleListings: ListingProos[] | null;
  offerListings: ListingProos[] | null;
}

const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  listingItem: {
    initial: { opacity: 0, y: 20, scale: 1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    whileHover: { scale: 1.05, opacity: 0.9 },
    transition: { duration: 0.3 },
  },
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },
};

const ListingSection = ({
  title,
  listings,
  linkText,
  linkHref,
}: {
  title: string;
  listings: ListingProos[];
  linkText: string;
  linkHref: string;
}) => (
  <motion.div {...animations.stagger}>
    <motion.div className="my-3" {...animations.fadeInUp}>
      <h2 className="text-2xl font-semibold text-slate-600">{title}</h2>
      <Link className="text-sm text-blue-800 hover:underline" href={linkHref}>
        {linkText}
      </Link>
    </motion.div>

    <motion.div className="flex flex-wrap gap-6" {...animations.stagger}>
      {listings.map((listing: ListingProos) => (
        <motion.div key={listing._id} {...animations.listingItem}>
          <ListingItem listing={listing} />
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default function HomeClient({
  rentListings,
  saleListings,
  offerListings,
}: HomeClientProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex flex-col gap-8 p-16 px-3 max-w-6xl mx-auto"
        {...animations.container}
      >
        <motion.h1
          className="text-slate-700 font-bold text-3xl lg:text-6xl"
          {...animations.fadeInUp}
        >
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </motion.h1>

        <motion.div
          className="text-gray-400 text-xs sm:text-sm"
          {...animations.fadeInUp}
        >
          Nest Scout is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </motion.div>

        <motion.div {...animations.fadeInUp}>
          <Link
            href="/search"
            className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          >
            Let&apos;s get started...
          </Link>
          {/* <form className=" text-center ">
          <input type="text" placeholder="Search.." className=" px-44 py-4 rounded-lg border" />
          </form> */}
        </motion.div>

        <PromotionPage />
      </motion.div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <ListingSection
            title="Recent Offers"
            listings={offerListings}
            linkText="Show more listings"
            linkHref="/search?offer=true"
          />
        )}

        {rentListings && rentListings.length > 0 && (
          <ListingSection
            title="Recent places for rent"
            listings={rentListings}
            linkText="Show more places for rent"
            linkHref="/search?type=rent"
          />
        )}

        {saleListings && saleListings.length > 0 && (
          <ListingSection
            title="Recent places for sale"
            listings={saleListings}
            linkText="Show more places for sale"
            linkHref="/search?type=sale"
          />
        )}
      
        <AccordionPage />
      </div>
    </div>
  );
}

