import Listing from "../../../../lib/Model/ListingModel";
import { connect } from '../../../../lib/mongodb/mongoose';

interface RequestData {
  startIndex?: string;
  limit?: string;
  order?: 'asc' | 'desc';
  offer?: boolean | string;
  furnished?: boolean | string;
  parking?: boolean | string;
  type?: 'sale' | 'rent' | 'all';
  userId?: string;
  listingId?: string;
  searchTerm?: string;
}

export const POST = async (req: Request): Promise<Response> => {
  await connect();
  
  try {
    const data: RequestData = await req.json();

    const startIndex = parseInt(data.startIndex || '0', 10);
    const limit = parseInt(data.limit || '9', 10);
    const sortDirection = data.order === 'asc' ? 1 : -1;

    const offer: boolean | { $in: boolean[] } = data.offer === 'false' || data.offer === undefined
      ? { $in: [false, true] }
      : Boolean(data.offer);

    const furnished: boolean | { $in: boolean[] } = data.furnished === 'false' || data.furnished === undefined
      ? { $in: [false, true] }
      : Boolean(data.furnished);

    const parking: boolean | { $in: boolean[] } = data.parking === 'false' || data.parking === undefined
      ? { $in: [false, true] }
      : Boolean(data.parking);

    const type: string | { $in: string[] } = data.type === 'all' || data.type === undefined
      ? { $in: ['sale', 'rent'] }
      : data.type;

    const listings = await Listing.find({
      ...(data.userId && { userId: data.userId }),
      ...(data.listingId && { _id: data.listingId }),
      ...(data.searchTerm && {
        $or: [
          { name: { $regex: data.searchTerm, $options: 'i' } },
          { description: { $regex: data.searchTerm, $options: 'i' } },
        ],
      }),
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    return new Response(JSON.stringify(listings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error getting posts:', error);
    return new Response('Error fetching listings', {
      status: 500,
    });
  }
};
