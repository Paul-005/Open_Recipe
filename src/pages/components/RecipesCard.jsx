import { useNavigate } from "react-router-dom";

export default function Recipecard({ data }) {
  const navigate = useNavigate();

  return (
    <div class="col">
      <div class="card shadow">
        <img src={data.thumbnail} class="card-img-top" alt="" />

        <div class="card-body">
          <div className="card-title text-center fw-bold h2">
            {data.recipeName}
          </div>
          <p class="card-text  ">{data.RecipeContent.substr(0, 300)}...</p>
          <div class="d-flex justify-content-between align-items-center ">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              onClick={() => navigate(`/recipe/${data._id}`)}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
