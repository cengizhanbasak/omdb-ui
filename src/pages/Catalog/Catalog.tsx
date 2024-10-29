import { ChangeEvent, useEffect, useMemo, useState } from "react";

import DebouncedInput from "../../components/DebouncedInput";
import { Entry, EntryType, searchEntries } from "../../data/api";

import CatalogEntry from "./CatalogEntry";

import "./Catalog.less";

function Catalog() {
    const [searchState, setSearchState] = useState("Pokemon");
    const [entryType, setEntryType] = useState(EntryType.All);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [page, setPage] = useState(1);
    const [numOfEntries, setNumOfEntries] = useState(0);
    const [year, setYear] = useState("");
    const [error, setError] = useState(false);

    const numOfPages = useMemo(() => {
        return Math.floor(numOfEntries / 10) + 1;
    }, [numOfEntries]);

    useEffect(() => {
        const fetchData = async (keyword: string, type: EntryType, page: number, year: string) => {
            if (!keyword) {
                return;
            }
            const result = await searchEntries({
                keyword,
                type,
                page: page.toString(),
                year: year
            });

            if (result.Response === "True") {
                setEntries(result.Search);
                setNumOfEntries(Number(result.totalResults));
                setError(false);
            } else {
                setError(true);
            }
        };
        fetchData(searchState, entryType, page, year);
    }, [entryType, page, searchState, year]);

    function handleYearInputChange(value: string) {
        if (value === "") {
            setYear("");
        }
        const yearNumber = Number(value);
        const currentYear = new Date().getFullYear();
        if (yearNumber > 0 && yearNumber <= currentYear) {
            setYear(value);
        }
    }

    function handleSearchInputChange(value: string) {
        setSearchState(value);
    }

    function handleEntryTypeChange(e: ChangeEvent<HTMLSelectElement>) {
        setEntryType(e.target.value as EntryType);
    }

    function nextPage() {
        setPage(page + 1);
    }

    function prevPage() {
        setPage(page - 1);
    }

    useEffect(() => {
        setPage(1);
    }, [searchState, year, entryType]);

    return (
        <div className="catalog">
            <div className="title">OMDB Database</div>
            <div className="filters">
                <label>
                    Name: <DebouncedInput value={searchState} onChange={handleSearchInputChange}/>
                </label>
                <label>
                    Type:&nbsp;
                    <select value={entryType} onChange={handleEntryTypeChange}>
                        <option title="All" value={EntryType.All}>All</option>
                        <option title="Movie" value={EntryType.Movie}>Movie</option>
                        <option title="Series" value={EntryType.Series}>Series</option>
                        <option title="Episode" value={EntryType.Episode}>Episode</option>
                    </select>
                </label>
                <label>
                    Year: <DebouncedInput className="yearInput" value={year} onChange={handleYearInputChange}/>
                </label>
            </div>
            {error ? (
                <div>
                    No entries found
                </div>
            ) : (
                <>
                    <div>{numOfEntries} entries found</div>
                    <div className="pages">
                        Page {page} of {numOfPages}
                        <button
                            onClick={prevPage}
                            disabled={page === 1}>
                            Prev
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={page === numOfPages}>
                            Next
                        </button>
                    </div>
                    <div className="entries">
                        {entries.map(entry => (
                            <CatalogEntry key={entry.imdbID} data={entry}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Catalog;
