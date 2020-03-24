export interface PodcastSearchResults {
  id: string;
  rss: string;
  audio: string;
  image: string;
  genre_ids: string[];
  itunes_id: number;
  thumbnail: string;
  podcast_id: string;
  pub_date_ms: number;
  title_original: string;
  listennotes_url: string;
  audio_length_sec: number;
  explicit_content: boolean;
  title_highlighted: string;
  publisher_original: string;
  description_original: string;
  publisher_highlighted: string;
  podcast_title_original: string;
  description_highlighted: string;
  podcast_listennotes_url: string;
  transcripts_highlighted: unknown[];
  podcast_title_highlighted: string;
}

export interface PodcastDetails {
  id: string;
  rss: string;
  email: string;
  extra: unknown;
  image: string;
  title: string;
  country: string;
  website: string;
  episodes: {
    id: string;
    link: string;
    audio: string;
    image: string;
    title: string;
    thumbnail: string;
    description: string;
    pub_date_ms: number;
    listennotes_url: string;
    audio_length_sec: number;
    explicit_content: false;
    maybe_audio_invalid: false;
    listennotes_edit_url: string;
  }[];
  language: string;
  genre_ids: number[];
  itunes_id: number;
  publisher: string;
  thumbnail: string;
  is_claimed: boolean;
  description: string;
  looking_for: unknown;
  total_episodes: number;
  listennotes_url: string;
  explicit_content: boolean;
  latest_pub_date_ms: number;
  earliest_pub_date_ms: number;
  next_episode_pub_date: number;
}
