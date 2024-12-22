export interface ClerkUserEventData {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email_addresses: { email_address: string }[];
}

export interface ClerkWebhookEvent {
  type: string;
  data: ClerkUserEventData;
}
