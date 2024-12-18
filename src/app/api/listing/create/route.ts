import Listing from "../../../../lib/Model/ListingModel";
import { connect } from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<Response> {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connect();
    const data = await req.json();

    if (user.publicMetadata.userMongoId !== data.userMongoId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const newListing = new Listing({
      userRef: user.publicMetadata.userMongoId,
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
    });

    const savedListing = await newListing.save();
    return NextResponse.json({ success: true, ...savedListing.toJSON() });

  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { success: 'Error creating listing'},
      { status: 500 }
    );
  }
}