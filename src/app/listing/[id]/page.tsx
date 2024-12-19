import { Bath, Bed, RockingChair, Car } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
interface Listing {
  id: number;
  name: string;
  imageUrls: string[];
  bedrooms: number;
  bathrooms: number;
  parking: number;
  furnished: boolean;
  // ... other properties
}

const ListingDetails = async ({ params }: { params: { id: string } }) => {
  let listing: Listing | null = null;

  try {
    const result = await fetch(`${process.env.URL || 'http://localhost:3000'}/api/listing/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listingId: params.id }),
      cache: 'no-store',
    });

    if (!result.ok) {
      throw new Error('Failed to fetch listing');
    }

    const data: Listing[] = await result.json();
    listing = data[0] || null;
  } catch (error) {
    console.error('Error fetching listing:', error);
    listing = null;
  }

  if (!listing) {
    return <p>Listing not found</p>;
  }

  return (
    <div className="p-4">
      <Image
        src={listing.imageUrls[0]}
        alt={listing.name}
        width={1200}
        height={400}
        className='w-full h-[400px] object-cover'
      />
      <h2 className="text-3xl font-bold mt-4">{listing?.name}</h2>
      <div className="flex mt-2">
        <Bed className='text-lg' aria-label="Bedrooms" />
        <span className="mx-2">{listing?.bedrooms}</span>
        <Bath className='text-lg' aria-label="Bathrooms" />
        <span className="mx-2">{listing?.bathrooms}</span>
        <Car className='text-lg' aria-label="Parking" />
        <span className="mx-2">{listing?.parking}</span>
        <RockingChair className='text-lg' aria-label="Furnishing" />
        <span className="mx-2">{listing?.furnished ? 'Furnished' : 'Unfurnished'}</span>
      </div>
      {/* ... rest of the listing details */}
    </div>
  );
};

export default ListingDetails;

