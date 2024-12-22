import ListingItem from "../app/components/srcListingItem";
import Link from "next/link";
import PromotionPage from "./components/PromotionPage";
import AccordatioPage from "./components/AccordationPage";
import { ListingProos } from "../types/type";


async function fetchListings(params: { type?: string; offer?: boolean; limit?: number; order?: string }): Promise<ListingProos[] | null> {
  try {
    const result = await fetch(`${process.env.URL}/api/listing/get`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      cache: "no-store",
    });
    
    if (!result.ok) {
      return null;
    }
    
    const data: ListingProos[] = await result.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return null;
    }
    return null;
  }
}

export default async function Home() {
  const [rentListings, saleListings, offerListings] = await Promise.all([
    fetchListings({ type: "rent", limit: 4, order: "asc" }),
    fetchListings({ type: "sale", limit: 4, order: "asc" }),
    fetchListings({ offer: true, limit: 4, order: "asc" })
  ]);

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
        <Link
          href="/search"
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let&apos;s get started...
        </Link>
        <div>
          <PromotionPage />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                href="/search?offer=true"
              >
                Show more listings
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing: ListingProos) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                href="/search?type=rent"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing: ListingProos) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                href="/search?type=sale"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing: ListingProos) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        <div>
          <AccordatioPage />
        </div>
      </div>
    </div>
  );
}