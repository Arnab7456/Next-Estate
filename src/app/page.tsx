
import ListingItem from "../app/components/srcListingItem";
import Link from "next/link";
import PromotionPage from "./components/PromotionPage";
import AccordatioPage from "./components/AccordationPage";

type Listing = {
  _id: string; 
  name: string;
  address: string;
  imageUrls: string[];
  description: string;
  offer: boolean;
  discountPrice: number;
  regularPrice: number;
  type: "rent" | "sale";
  bedrooms: number;
  bathrooms: number;
  
};

export default async function Home() {
  let rentListings: Listing[] | null = null;
  let saleListings: Listing[] | null = null;
  let offerListings: Listing[] | null = null;

  // Fetch rent listings
  try {
    const result = await fetch( process.env.URL  + "/api/listing/get", {
      method: "POST",
      body: JSON.stringify({
        type: "rent",
        limit: 4,
        order: "asc",
      }),
      cache: "no-store",
    });
    const data = await result.json();
    rentListings = data;
  } catch (error) {
    console.error(error);
    rentListings = null;
  }

  // Fetch sale listings
  try {
    const result = await fetch( process.env.URL  + "/api/listing/get", {
      method: "POST",
      body: JSON.stringify({
        type: "sale",
        limit: 4,
        order: "asc",
      }),
      cache: "no-store",
    });
    const data = await result.json();
    saleListings = data;
  } catch (error) {
    console.error(error);
    saleListings = null;
  }

  // Fetch offer listings
  try {
    const result = await fetch( process.env.URL + "/api/listing/get", {
      method: "POST",
      body: JSON.stringify({
        limit: 4,
        order: "asc",
        offer: true,
      }),
      cache: "no-store",
    });
    const data = await result.json();
    offerListings = data;
  } catch (error) {
    console.error(error);
    offerListings = null;
  }

  return (
    <div>
      <div className="flex flex-col gap-8 p-16 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Nest Scout is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <div
          // href={'/search'}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let&apos;s get started...
        </div>
        <div>


        <PromotionPage />

        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                href={"/search?offer=true"}
              >
                Show more listings
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                href={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                href={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        <div><AccordatioPage /></div>
        
      </div>
    </div>
  );
}
