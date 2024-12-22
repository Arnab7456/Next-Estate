export interface RequestData {
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


export interface UpdateRequestData {
    userMongoId: string;
    listingId: string;
    name: string;
    description: string;
    address: string;
    regularPrice: number;
    discountPrice: number;
    bathrooms: number;
    bedrooms: number;
    furnished: boolean;
    parking: boolean;
    type: 'rent' | 'sale';
    offer: boolean;
    imageUrls: string[];
  }