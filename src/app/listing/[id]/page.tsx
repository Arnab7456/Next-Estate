'use client';
import { Bath, Bed, RockingChair, MapPinned, Car } from 'lucide-react';
import React from 'react';
import { useParams } from 'next/navigation';

interface Listing {
  name: string;
  imageUrls: string[];
  offer: boolean;
  discountPrice: number;
  regularPrice: number;
  type: 'rent' | 'sale';
  address: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
}

export default function ListingPage() {
  const params = useParams();
  const [listing, setListing] = React.useState<Listing | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchListing = async () => {
      try {
        const result = await fetch(`/api/listing/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listingId: params.id }),
          cache: 'no-store',
        });

        const data: Listing[] = await result.json();
        setListing(data[0] || null);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchListing();
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-2xl">
          Loading...
        </h2>
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-2xl">
          Listing not found
        </h2>
      </main>
    );
  }

  return (
    <main>
      <div>
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="w-full h-[400px] object-cover"
        />
        <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
          <p className="text-2xl font-semibold">
            {listing.name} - ${' '}
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
            <MapPinned className="text-green-700" />
            {listing.address}
          </p>
          <div className="flex gap-4">
            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </p>
            {listing.offer && (
              <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                ${+listing.regularPrice - +listing.discountPrice} OFF
              </p>
            )}
          </div>
          <p className="text-slate-800">
            <span className="font-semibold text-black">Description - </span>
            {listing.description}
          </p>
          <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
            <li className="flex items-center gap-1 whitespace-nowrap">
              <Bed className="text-lg" />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              <Bath className="text-lg" />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              <Car className="text-lg" />
              {listing.parking ? 'Parking spot' : 'No Parking'}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
              <RockingChair className="text-lg" />
              {listing.furnished ? 'Furnished' : 'Unfurnished'}
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}