import { Entry } from "../../../data/api";

import "./CatalogEntry.less";

function CatalogEntry({ data }: { data: Entry }) {
    return (
        <div className="catalogEntry">
            {data.Poster === "N/A" ? (
                <div>No image</div>
            ) : (
                <img src={data.Poster} className="posterImage" sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw"/>
            )}
            <div className="title">{data.Title}</div>
            <div className="year">{data.Year}</div>
        </div>
    );
}

export default CatalogEntry;
