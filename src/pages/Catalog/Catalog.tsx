import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DebouncedInput from "../../components/DebouncedInput";
import { Entry, EntryType, searchEntries } from "../../data/api";
import { filtersSelector, updateEntryType, updateKeyword, updatePage, updateYear } from "../../data/filtersSlice";

import CatalogEntry from "./CatalogEntry";

import "./Catalog.less";

function Catalog() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [numOfEntries, setNumOfEntries] = useState(0);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const { keyword, entryType, year, page } = useSelector(filtersSelector);

    const numOfPages = useMemo(() => {
        return Math.ceil(numOfEntries / 10);
    }, [numOfEntries]);

    useEffect(() => {
        const fetchData = async () => {
            if (!keyword) {
                return;
            }
            const result = await searchEntries({
                keyword,
                type: entryType,
                page: page.toString(),
                year
            });

            if (result.Response === "True") {
                setEntries(result.Search);
                setNumOfEntries(Number(result.totalResults));
                setError(false);
            } else {
                setError(true);
            }
        };
        fetchData();
    }, [entryType, page, keyword, year]);

    function handleYearInputChange(value: string) {
        if (value === "") {
            dispatch(updateYear(""));
        }
        const yearNumber = Number(value);
        const currentYear = new Date().getFullYear();
        if (yearNumber > 0 && yearNumber <= currentYear) {
            dispatch(updateYear(value));
        }
    }

    function handleSearchInputChange(value: string) {
        dispatch(updateKeyword(value));
    }

    function handleEntryTypeChange(e: ChangeEvent<HTMLSelectElement>) {
        dispatch(updateEntryType(e.target.value as EntryType));
    }

    function nextPage() {
        dispatch(updatePage(page + 1));
    }

    function prevPage() {
        dispatch(updatePage(page - 1));
    }

    function handlePageChange(e: ChangeEvent<HTMLSelectElement>) {
        dispatch(updatePage(Number(e.target.value)));
    }

    return (
        <div className="catalog">
            <div className="title">The Open Movie Database</div>
            <div className="filters">
                <label>
                    Name: <DebouncedInput value={keyword} onChange={handleSearchInputChange}/>
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
                        <select value={page} onChange={handlePageChange}>
                            {[...Array(numOfPages).keys()].map(i => (
                                <option title={`${i+1}`} value={i+1}>{i+1}</option>
                            ))}
                        </select>
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
