export interface Genre {
  id: string;
  name: string;
  parentId: string;
}

export interface Podcast {
  id: string;
  rss?: string;
  email?: string;
  image: string;
  title: string;
  country?: string;
  website?: string;
  language?: string;
  genreIds?: string[];
  publisher: string;
  url?: string;
  description: string;
  totalEpisodes?: number;
  earliestPublishedAt?: Date;
  latestPublishedAt: Date;
}

export interface Episode {
  id: string;
  audio: string;
  image: string;
  title: string;
  publisher: string;
  podcastId: string;
  description: string;
  publishedAt: Date;
  url: string;
  lengthInSeconds?: number
  explicit?: boolean;
}

export interface PageResult<T> {
  results: T[];
  page: number;
  perPage: number;
}

export interface PodcastClient {
  searchPodcasts(term: string, page: number, perPage: number): PageResult<Podcast>;
  getPodcastEpisodes(podcast: string, page: number, perPage: number): PageResult<Episode>;
}
