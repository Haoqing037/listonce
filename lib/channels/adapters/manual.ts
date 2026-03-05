/**
 * Placeholder adapter for channels that use assisted posting (FB, OfferUp)
 * or are not yet integrated (Craigslist mock).
 */

import type { ChannelAdapter, ListingPayload, PublishResult } from "../types";

export const manualAdapter: ChannelAdapter = {
  channel: "offerup", // used for OfferUp; duplicate pattern for Facebook
  canPublishFromServer: false,
  async publish(): Promise<PublishResult> {
    return {
      ok: false,
      error: "Use the ListOnce Chrome extension to fill the form and publish on the site.",
    };
  },
};

export function createManualAdapter(channel: "facebook" | "offerup"): ChannelAdapter {
  return { ...manualAdapter, channel };
}
