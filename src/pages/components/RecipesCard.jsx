import { useHistory } from "react-router-dom";

export default function Recipecard({ data }) {
  const history = useHistory();

  return (
    <div class="col">
      <div class="card shadow-sm">
        <div class="card-body">
          <div className="card-title text-center fw-bold h2">
            {data.recipeName}
          </div>
          <p class="card-text  ">{data.RecipeContent.substr(0, 300)}...</p>
          <div class="d-flex justify-content-between align-items-center ">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                onClick={() => history.push(`/recipe/${data._id}`)}
              >
                View
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
              </button>
            </div>
            <small class="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  );
}
