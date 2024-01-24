import SubmitButton from "../ui-elements/SubmitButton";
import CancelButton from "../ui-elements/CancelButton";
import { TableCreate } from "../types";
import { ChangeEvent, FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";

export type TableFormProps = {
  tableForm: TableCreate,
  navigate: NavigateFunction,
  handleChange: (e: ChangeEvent<HTMLInputElement>)=>void,
  submitHandler: (e: FormEvent<HTMLFormElement>) => void,
}

function TableForm({ tableForm, navigate, handleChange, submitHandler }: TableFormProps) {
  const form = (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="first_name">Table Name</label>
        <input
          type="text"
          className="form-control"
          id="table_name"
          name="table_name"
          value={tableForm.table_name}
          onChange={handleChange}
          minLength={2}
          required
          placeholder="Enter a table name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Capacity</label>
        <input
          type="number"
          className="form-control"
          id="capacity"
          name="capacity"
          value={tableForm.capacity}
          onChange={handleChange}
          placeholder="Enter a capacity (minimum 1)"
          min="1"
          required
        />
      </div>
      <div className="d-flex justify-content-between">
        <SubmitButton />
        <CancelButton navigate={navigate} />
      </div>
    </form>

  );

  return form;
}

export default TableForm;
