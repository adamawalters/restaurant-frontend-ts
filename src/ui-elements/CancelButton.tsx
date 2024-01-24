import { NavigateFunction } from "react-router-dom";

export type CancelButtonProps = {
  navigate: NavigateFunction
}


function CancelButton({navigate}: CancelButtonProps) {
  const cancelBtn = (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => navigate(-1)}
    >
      Cancel
    </button>
  );

    return cancelBtn;
}

export default CancelButton;