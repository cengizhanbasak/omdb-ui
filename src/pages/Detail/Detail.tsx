import { useParams } from "react-router-dom";
import "./Detail.less";

function Detail() {
    const { id } = useParams();

    return (
        <div className="detail">
            Detail {id}
        </div>
    );
}

export default Detail;
