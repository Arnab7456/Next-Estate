
  export interface InputField {
    id: string;
    label: string;
    min: number;
    max: number;
  }

  
 export type ListingProos = {
  _id: string; 
  name: string;
  address: string;
  imageUrls: string[];
  description: string;
  offer: boolean;
  discountPrice: number;
  regularPrice: number;
  type: "rent" | "sale";
  bedrooms: number;
  bathrooms: number;
};
export interface ClerkProps {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  image_url: string;
}