'use client';

import { ListingProos } from "@/types/type";
import HomeClient from "./components/HomePage";
import { useEffect, useState } from "react";

const BASE_URL = process.env.URL;

async function fetchListings(params: { type?: string; offer?: boolean; limit?: number; order?: string }): Promise<ListingProos[] | null> {
  try {
    const result = await fetch(`${BASE_URL}/api/listing/get`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      cache: "no-store",
    });
    
    if (!result.ok) {
      console.error('Failed to fetch listings:', result.status);
      return null;
    }
    
    return await result.json();
  } catch (error) {
    console.error('Error fetching listings:', error);
    return null;
  }
}

export default function HomePage() {
  const [rentListings, setRentListings] = useState<ListingProos[] | null>(null);
  const [saleListings, setSaleListings] = useState<ListingProos[] | null>(null);
  const [offerListings, setOfferListings] = useState<ListingProos[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [rent, sale, offer] = await Promise.all([
          fetchListings({ type: "rent", limit: 4, order: "asc" }),
          fetchListings({ type: "sale", limit: 4, order: "asc" }),
          fetchListings({ offer: true, limit: 4, order: "asc" })
        ]);

        setRentListings(rent);
        setSaleListings(sale);
        setOfferListings(offer);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError('Failed to load listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllListings();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <HomeClient 
      rentListings={rentListings}
      saleListings={saleListings}
      offerListings={offerListings}
    />
  );
}
