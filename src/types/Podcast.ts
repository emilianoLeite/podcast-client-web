interface Podcast {
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

export default Podcast;