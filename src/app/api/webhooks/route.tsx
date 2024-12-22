import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user';
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { ClerkUserEventData } from '@/types/webhook.types';


interface ClerkWebhookEvent {
  type: string;
  data: ClerkUserEventData;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers(); 
  const svix_id = (await headerPayload).get('svix-id');
  const svix_timestamp = (await headerPayload).get('svix-timestamp');
  const svix_signature = (await headerPayload).get('svix-signature');

  
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error: Missing Svix headers', {
      status: 400,
    });
  }

  
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: ClerkWebhookEvent;

  
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkWebhookEvent; 
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new NextResponse('Error: Verification error', {
      status: 400,
    });
  }

  // Process the event
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { first_name, last_name, image_url, email_addresses } = evt.data;
    try {
      const user = await createOrUpdateUser({
        id,
        first_name,
        last_name,
        image_url,
        email_address: email_addresses[0]?.email_address || '',
      });

      if (user && eventType === 'user.created') {
        try {
          // Await clerkClient to get the correct instance
          const clerk = await clerkClient(); // Ensure this resolves to ClerkClient

          // Now you can call `users.updateUserMetadata` correctly
          await clerk.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id,
            },
          });
        } catch (error) {
          console.error('Error: Could not update user metadata:', error);
        }
      }
    } catch (error) {
      console.error('Error: Could not create or update user:', error);
      return new NextResponse('Error: Could not create or update user', {
        status: 400,
      });
    }
  }

  if (eventType === 'user.deleted') {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error('Error: Could not delete user:', error);
      return new NextResponse('Error: Could not delete user', {
        status: 400,
      });
    }
  }

  return new NextResponse('Webhook received', { status: 200 });
}
