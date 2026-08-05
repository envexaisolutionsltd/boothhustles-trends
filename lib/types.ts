export interface TimelinePoint {
  date: string;
  value: number;
}

export interface RegionPoint {
  location: string;
  value: number;
}

export interface RelatedQuery {
  query: string;
  value: number;
  formattedValue: string;
  link?: string;
}

export interface RelatedTopic {
  title: string;
  type: string;
  value: number;
  formattedValue: string;
  link?: string;
}

export interface RelatedQueries {
  top: RelatedQuery[];
  rising: RelatedQuery[];
}

export interface RelatedTopics {
  top: RelatedTopic[];
  rising: RelatedTopic[];
}

export interface TrendRecord {
  id: string;
  keyword: string;
  interest_over_time: TimelinePoint[];
  interest_by_region: RegionPoint[];
  uk_interest: number | null;
  related_queries: RelatedQueries;
  related_topics: RelatedTopics;
  ebay_listing_count: number | null;
  ebay_avg_price: number | null;
  ebay_min_price: number | null;
  ebay_max_price: number | null;
  vinted_index_count: number | null;
  gumtree_index_count: number | null;
  created_at: string;
}

export interface SearchHistoryItem {
  keyword: string;
  created_at: string;
}

export interface AgentMessage {
  role: "user" | "assistant";
  content: string;
}
