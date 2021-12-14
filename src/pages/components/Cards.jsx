import { useHistory } from "react-router-dom";
import "../home/homepage.css";

export default function CardImg({ items }) {
  const history = useHistory();

  return (
    <div className="col-md-6 col-lg-4  mb-5 ">
      <div className="card">
        <img src={items.img} className="card-img-top img-fluid " alt="..." />
        <div className="card-body">
          <h5 className="card-title text-center">{items.name}</h5>

          <p className="lead">{items.content.substr(0, 80)}....</p>
        </div>
      </div>
    </div>
  );
}
