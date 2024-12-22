import { connect } from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';
import Listing from "../../../../lib/Model/ListingModel";
import { UpdateRequestData } from '@/types/listing.types';


export const POST = async (req: Request): Promise<Response> => {
  const user = await currentUser();

  try {
    await connect();

    const data: UpdateRequestData = await req.json();

    if (!user || user.publicMetadata.userMogoId !== data.userMongoId) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      data.listingId,
      {
        $set: {
          name: data.name,
          description: data.description,
          address: data.address,
          regularPrice: data.regularPrice,
          discountPrice: data.discountPrice,
          bathrooms: data.bathrooms,
          bedrooms: data.bedrooms,
          furnished: data.furnished,
          parking: data.parking,
          type: data.type,
          offer: data.offer,
          imageUrls: data.imageUrls,
        },
      },
      { new: true }
    );

    if (!updatedListing) {
      return new Response('Listing not found', {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedListing), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating listing:', error);
    return new Response('Error creating listing', {
      status: 500,
    });
  }
};