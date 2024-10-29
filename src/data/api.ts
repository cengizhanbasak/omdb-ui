import { pokemonData } from "./fixture";

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
    Error?: string;
}

export interface ErrorSearchResult {
    Response: "False";
    Error: string;
}

export type SearchResult = OkSearchResult | ErrorSearchResult;

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
    if (keyword === "Pokemon" && type === EntryType.All) {
        return Promise.resolve(pokemonData);
    }
    const result = await fetch(url);
    return result.json();
}