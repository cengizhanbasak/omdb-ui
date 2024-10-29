import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { EntryDetailResponse, getEntryDetail, OkEntryDetailResponse } from "../../data/api";

import "./Detail.less";

function Detail() {
    const { id } = useParams();
    const [detail, setDetail] = useState<OkEntryDetailResponse | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result: EntryDetailResponse = await getEntryDetail({ id: id! });
            if (result.Response === "True") {
                setError(false);
                setDetail(result);
            } else {
                setError(true);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="detail">
            {error ? (
                <div>Error</div>
            ) : (
                detail ? (
                    <div className="entryDetail">
                        <div>
                            {detail.Poster !== "N/A" ? (
                                <img src={detail.Poster} className="posterImage"/>
                            ) : (
                                <div>
                                    No Poster Image
                                </div>
                            )}
                        </div>
                        <div className="title">
                            {detail.Title}
                        </div>
                        <div>
                            {detail.imdbRating}/10 rating with {detail.imdbVotes} votes
                        </div>
                        <div>
                            <span className="key">Genre:</span> {detail.Genre}
                        </div>
                        <div>
                            <span className="key">Duration:</span> {detail.Runtime}
                        </div>
                        <div>
                            <span className="key">Director:</span> {detail.Director}
                        </div>
                        <div>
                            <span className="key">Actors:</span> {detail.Actors}
                        </div>
                    </div>
                ) : (
                    <div>Loading</div>
                )
            )}
            
        </div>
    );
}

export default Detail;
