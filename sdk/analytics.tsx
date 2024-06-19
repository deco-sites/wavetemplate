import type { AnalyticsEvent } from "apps/commerce/types.ts";

interface PostScoreParams {
  score: number;
}

interface PostScoreEvent {
  name: "post_score";
  params: PostScoreParams;
}

type AnalyticsCustomEvents = PostScoreEvent;

export const sendEvent = <E extends AnalyticsEvent | AnalyticsCustomEvents>(
  event: E,
) => {
  console.log(JSON.stringify(event, null, 2));
  globalThis.window.DECO.events.dispatch(event);
};
