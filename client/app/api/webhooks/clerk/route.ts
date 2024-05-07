import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import api from "@/utils/api";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id, ...attr } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  switch (eventType) {
    case "user.created": {
      const attributes = attr as UserJSON;

      const res = await api.post("user", {
        userId: id,
        name: `${attributes.first_name} ${attributes.last_name}`,
        email:
          attributes.email_addresses?.[0].email_address ??
          attributes.external_accounts?.[0].email_address,
      });

      if (res.status === 200) console.log("User created");

      break;
    }

    case "user.deleted": {
      const res = await api.delete(`user/${id}`);

      if (res.status === 204) console.log("User deleted");

      break;
    }

    default: {
      console.log("No action taken");
      break;
    }
  }

  return new Response("", { status: 200 });
}
