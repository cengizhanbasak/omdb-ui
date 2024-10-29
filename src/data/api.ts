export interface Entry {
    Poster: string;
    Title: string;
    Type: EntryType;
    Year: string;
    imdbID: string;
}

export enum EntryType {
    All = "",
    Movie = "movie",
    Series = "series",
    Episode = "episode"
};

export interface OkSearchResult {
    Response: "True";
    Search: Entry[];
    totalResults: string;
}

export interface ErrorResponse {
    Response: "False";
    Error: string;
}

export type SearchResult = OkSearchResult | ErrorResponse;
export type EntryDetailResponse = OkEntryDetailResponse | ErrorResponse;

export interface OkEntryDetailResponse extends Entry {
    Response: "True";
    imdbRating: string;
    imdbVotes: string;
    Genre: string;
    Runtime: string;
    Director: string;
    Actors: string;
    BoxOffice: string;
}


export async function searchEntries({
    keyword,
    type,
    page,
    year,
}: {
    keyword: string,
    type: EntryType,
    page?: string;
    year?: string;
}): Promise<SearchResult> {
    const url = new URL("https://www.omdbapi.com");
    url.searchParams.append("s", keyword.trim());
    if (type !== EntryType.All) {
        url.searchParams.append("type", type);
    }
    if (page) {
        url.searchParams.append("page", page);
    }
    if (year) {
        url.searchParams.append("y", year);
    }
    url.searchParams.append("apiKey", import.meta.env.VITE_OMDB_API_KEY);
    const result = await fetch(url);
    return result.json();
}

export async function getEntryDetail({
    id
}: {
    id: string;
}): Promise<EntryDetailResponse> {
    const url = new URL("https://www.omdbapi.com");
    url.searchParams.append("i", id);
    url.searchParams.append("apiKey", import.meta.env.VITE_OMDB_API_KEY);
    const result = await fetch(url);
    return result.json();
}