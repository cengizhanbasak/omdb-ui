import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { Entry, EntryType, searchEntries } from "../../data/api";

import CatalogEntry from "./CatalogEntry";

import "./Catalog.less";

function Catalog() {
    const [searchState, setSearchState] = useState("Pokemon");
    const [entryType, setEntryType] = useState(EntryType.Movie);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [page, setPage] = useState(1);
    const [numOfEntries, setNumOfEntries] = useState(0);
    const [year, setYear] = useState("");
    const numOfPages = useMemo(() => {
        return Math.floor(numOfEntries / 10) + 1;
    }, [numOfEntries]);

    useEffect(() => {
        async function fetchData() {
            if (!searchState) {
                return;
            }
            const result = await searchEntries({
                keyword: searchState,
                type: entryType,
                page: page.toString(),
                year: year
            });

            console.log(result);
            if (result.Response === "True") {
                setEntries(result.Search);
                setPage(1);
                setNumOfEntries(Number(result.totalResults));
            }
        }
        fetchData();
    }, [searchState, entryType, page, year]);

    function handleSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchState(e.target.value);
    }

    function handleYearInputChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "") {
            setYear("");
        }
        const yearNumber = Number(e.target.value);
        const currentYear = new Date().getFullYear();
        if (yearNumber > 0 && yearNumber <= currentYear) {
            setYear(e.target.value);
        }
    }

    function handleEntryTypeChange(e: ChangeEvent<HTMLSelectElement>) {
        setEntryType(e.target.value as EntryType);
    }

    return (
        <div className="catalog">
            <div className="title">Catalog</div>
            <div className="filters">
                <label>
                    Name: <input type="text" value={searchState} onChange={handleSearchInputChange}/>
                </label>
                <label>
                    Type:&nbsp;
                    <select value={entryType} onChange={handleEntryTypeChange}>
                        <option title="Movie" value={EntryType.Movie}>Movie</option>
                        <option title="Series" value={EntryType.Series}>Series</option>
                        <option title="Episode" value={EntryType.Episode}>Episode</option>
                    </select>
                </label>
                <label>
                    Year: <input type="text" value={year} onChange={handleYearInputChange}/>
                </label>
            </div>
            <div>{numOfEntries} entries found</div>
            <div>Page {page} of {numOfPages}</div>
            <div className="entries">
                {entries.map(entry => (
                    <CatalogEntry key={entry.imdbID} data={entry}/>
                ))}
            </div>
        </div>
    );
}

export default Catalog;
