import { ChangeEvent, FormEvent, useState } from "react";
import ErrorAlert from "../Layout/ErrorAlert";
import { useNavigate } from "react-router-dom";
import TableForm from "./TableForm";
import { createTable } from "../utils/api";

function NewTable() {
  const [newTableError, setNewTableError] = useState<null | {message: string}>(null);
  const navigate = useNavigate();

  const initialTableForm = {
    table_name: "",
    capacity: 0,
  };
  const [tableForm, setTableForm] = useState({ ...initialTableForm });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTableForm({
      ...tableForm,
      [e.target.name]: e.target.value,
    });
  }

  async function submitTable(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();


    try {
      await createTable(tableForm);
      navigate("/");
    } catch (error) {
      if(error instanceof Error) setNewTableError(error);
    }
  }

  return (
    <main style={{ height: "100%", overflow: "hidden" }}>
      <h1>New Table</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">
          Create a table where reservations can be seated
        </h4>
      </div>
      <ErrorAlert error={newTableError} />
      <TableForm
        navigate={navigate}
        tableForm={tableForm}
        handleChange={handleChange}
        submitHandler={submitTable}
      />
    </main>
  );
}

export default NewTable;
