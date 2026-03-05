/**
 * Channel adapter abstraction for ListOnce.
 * Each marketplace has an implementation; we never store FB/OfferUp passwords.
 * - eBay: OAuth + official API
 * - Craigslist: bulk posting API or mocked adapter
 * - Facebook / OfferUp: "assisted" – extension auto-fills; user posts on site
 */

export type ChannelType = "ebay" | "craigslist" | "facebook" | "offerup";

export interface ListingPayload {
  title: string;
  description: string;
  price: string;
  photoUrls: string[];
}

export type PublishResult =
  | { ok: true; externalUrl?: string }
  | { ok: false; error: string };

export interface ChannelAdapter {
  channel: ChannelType;
  /** Whether this channel supports server-side publish (e.g. eBay API). */
  canPublishFromServer: boolean;
  /** Publish listing via API. For FB/OfferUp this is no-op; use extension. */
  publish(listing: ListingPayload, connection: unknown): Promise<PublishResult>;
}
