export interface FormData {
    imageUrls: string[];
    name: string;
    description: string;
    address: string;
    type: 'rent' | 'sale';
    bedrooms: number;
    bathrooms: number;
    regularPrice: number;
    discountPrice: number;
    offer: boolean;
    parking: boolean;
    furnished: boolean;
    [key: string]: string | number | boolean | string[];
  }
  
  export interface InputField {
    id: string;
    label: string;
    min: number;
    max: number;
  }

  