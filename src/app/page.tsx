import { ListingProos } from "@/types/type";
import HomeClient from "./components/HomePage";
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
    
    return await result.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function HomePage() {
  const [rentListings, saleListings, offerListings] = await Promise.all([
    fetchListings({ type: "rent", limit: 4, order: "asc" }),
    fetchListings({ type: "sale", limit: 4, order: "asc" }),
    fetchListings({ offer: true, limit: 4, order: "asc" })
  ]);

  return (
    <HomeClient 
      rentListings={rentListings}
      saleListings={saleListings}
      offerListings={offerListings}
    />
  );
}
