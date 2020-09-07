export interface PodcastEpisode {

    /** Episode id. */
    id: string;

    /** Web link of this episode. */
    link: string;

    /** Audio url of this episode, which can be played directly. */
    audio: string;

    /** Image url for this podcast's artwork. If you are using PRO plan, then it's\na high */
    image: string;

    /** Episode name. */
    title: string;

    /** Thumbnail image url for this podcast's artwork (300x300). */
    thumbnail: string;

    /** Html of this episode's full description */
    description: string;

    /** Published date for this episode. In milliseconds. */
    pub_date_ms: number;

    /** The url of this episode on [ListenNotes.com](https://www.ListenNotes.com). */
    listennotes_url: string;

    /** Audio length of this episode. In seconds. */
    audio_length_sec: number;

    /** Whether this podcast contains explicit language. */
    explicit_content: boolean;

    /** Whether or not this episode's audio is invalid. Podcasters may delete the original audio. */
    maybe_audio_invalid: boolean;

    /** Edit url of this episode where you can update the audio url if you find the audio is broken.*/
    listennotes_edit_url: string;
}

export interface PodcastDetails {

  /** Podcast id. */
  id: string;

    /** RSS url of this podcast. This field is available only in the PRO plan. */
  rss: string;

  /** The type of this podcast - episodic or serial. */
  type: "episodic"| "serial";

  /** The email of this podcast's producer. This field is available only in the PRO plan. */
  email: string;

  extra: {
    /** Url affiliated with this podcast */
    url1: string;

    /** Url affiliated with this podcast */
    url2: string;

    /** Url affiliated with this podcast */
    url3: string;

    /** Google Podcasts url for this podcast */
    google_url: string;

    /** Spotify url for this podcast */
    spotify_url: string;

    /** YouTube url affiliated with this podcast */
    youtube_url: string;

    /** LinkedIn url affiliated with this podcast */
    linkedin_url: string;

    /** WeChat username affiliated with this podcast */
    wechat_handle: string;

    /** Patreon username affiliated with this podcast */
    patreon_handle: string;

    /** Twitter username affiliated with this podcast */
    twitter_handle: string;

    /** Facebook username affiliated with this podcast */
    facebook_handle: string;

    /** Instagram username affiliated with this podcast */
    instagram_handle: string;

  };

  /** Image url for this podcast's artwork.
   *
   * If you are using PRO plan, then it's a high resolution image (1400x1400).
   *
   * If you are using FREE plan, then it's the same as thumbnail, low resolution image (300x300). */
  image: string;

  /** Podcast name. */
  title: string;

  /** The country where this podcast is produced. */
  country: string;

  /** Website url of this podcast. */
  website: string;

  episodes: PodcastEpisode[];

  /** The language of this podcast. You can get all supported languages from `GET /languages`. */
  language: string;

  genre_ids: number[];

  /** iTunes id for this podcast. */
  itunes_id: number;

  /** Podcast publisher name. */
  publisher: string;

  /** Thumbnail image url for this podcast's artwork (300x300). */
  thumbnail: string;

  /** Whether this podcast is claimed by its producer on [ListenNotes.com](https://www.ListenNotes.com) */
  is_claimed: boolean;

  /** Html of this podcast's full description */
  description: string;

  /** Total number of episodes in this podcast. */
  total_episodes: number;

  /** The url of this podcast on [ListenNotes.com](https://www.ListenNotes.com). */
  listennotes_url: string;
    /** Whether this podcast contains explicit language. */
  explicit_content: boolean;

  /** The published date of the latest episode of this podcast. In milliseconds */
  latest_pub_date_ms: number;

  /** The published date of the oldest episode of this podcast. In milliseconds */
  earliest_pub_date_ms: number;

  /** Passed to the **next_episode_pub_date** parameter of `GET /podcasts/{id}` to paginate through episodes of that podcast. */
  next_episode_pub_date: number;
}

export interface PodcastSearchResult {
  count: number;
  next_offset: number;
  results: {
    /** Podcast id. */
    id: string;

    /** RSS url of this podcast. This field is available only in the PRO plan. */
    rss: string;

    /** The email of this podcast's producer. This field is available only in the PRO plan. */
    email: string;

    /** Image url for this podcast's artwork. If you are using PRO plan, then it's\na high resolution image (1400x1400). If you are using FREE plan, then it's the same as **thumbnail**,\nlow resolution image (300x300). */
    image: string;

    /** Website url of this podcast. */
    website: string;

    /** Genre ids. */
    genre_ids: number[];

    /** iTunes id for this podcast. */
    itunes_id: number;

    /** Thumbnail image url for this podcast's artwork (300x300). */
    thumbnail: string;

    /** Plain text of podcast name. */
    title_original: string;

    /** Total number of episodes in this podcast. */
    total_episodes: number;

    /** The url of this podcast on [ListenNotes.com](https://www.ListenNotes.com). */
    listennotes_url: string;

    /** Whether this podcast contains explicit language. */
    explicit_content: boolean;

    /** Highlighted segment of podcast name. */
    title_highlighted: string;

    /** The published date of the latest episode of this podcast. In milliseconds */
    latest_pub_date_ms: number;

    /** Plain text of this podcast's publisher name. */
    publisher_original: string;

    /** Plain text of podcast description */
    description_original: string;

    /** The published date of the oldest episode of this podcast. In milliseconds */
    earliest_pub_date_ms: number;

    /** Highlighted segment of this podcast's publisher name. */
    publisher_highlighted: string;

    /** Highlighted segment of podcast description */
    description_highlighted: string;
  }[];
}
