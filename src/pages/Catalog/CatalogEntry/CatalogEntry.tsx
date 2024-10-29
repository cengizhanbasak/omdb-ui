import { Link } from "react-router-dom";
import { Entry } from "../../../data/api";

import "./CatalogEntry.less";

function CatalogEntry({ data }: { data: Entry }) {
    return (
        <Link className="catalogEntry" to={`/${data.imdbID}`}>
            <div className="id">{data.imdbID}</div>
            <div className="title" title={data.Title}>{data.Title}</div>
            <div className="year">{data.Year}</div>
        </Link>
    );
}

export default CatalogEntry;
