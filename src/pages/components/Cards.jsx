import { useHistory } from "react-router-dom";
import "../home/homepage.css";
import { motion } from "framer-motion";

export default function CardImg({ items }) {
  const history = useHistory();

  return (
    <div className="col-md-6 col-lg-4  mb-5 ">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileFocus={{ scale: 1.1 }}
        initial={{ opacity: 0, x: 2 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <img src={items.img} className="card-img-top img-fluid " alt="..." />
        <div className="card-body">
          <h5 className="card-title text-center">{items.name}</h5>

          <p className="lead">{items.content.substr(0, 80)}....</p>

          <motion.button
            type="button"
            className="btn btn-primary"
            whileTap={{ scale: 0.8 }}
            onClick={() => history.push(`/details/${items.content}`)}
          >
            View More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
