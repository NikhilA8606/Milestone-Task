import { useEffect, useState, useRef } from "react";
import LabeledInput from "../LabeledInput";
import { Link, navigate } from "raviger";
import { formField } from "../types/form";
import {
  getLocalForm,
  initialState,
  saveFormData,
  saveLocalForms,
} from "../utils/StorageUtils";

export const intialFormField: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
  { id: 5, label: "Phone Number", type: "tel", value: "" },
];

export default function Form(props: { formId: number }) {
  const [state, setState] = useState(() => initialState(props.formId));
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    state.id !== props.formId && navigate(`/forms/${state.id}`);
  }, [state.id, props.formId]);

  useEffect(() => {
    const localForms = getLocalForm();
    const formExists = localForms.some((f) => f.id === state.id);
    if (!formExists) {
      saveLocalForms([...localForms, state]);
    }
  }, [state]);

  const addField = () => {
    setState((prevState) => ({
      ...prevState,
      formFields: [
        ...prevState.formFields,
        { id: Date.now(), label: newField, type: "text", value: "" },
      ],
    }));
    setNewField("");
  };
  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };
  useEffect(() => {
    console.log("Component mounted");
    const old_title = document.title;
    document.title = "Form";
    titleRef.current?.focus();
    return () => {
      document.title = old_title;
      console.log("Component unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("timeout");
    let timeout = setTimeout(() => {
      console.log("Form data changed");
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleChange = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, value: value } : field
      ),
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div>
        <input
          type="text"
          className="border-2 border-gray-200 rounded-lg p-1 flex-1"
          value={state.title}
          onChange={(e) => {
            setState({ ...state, title: e.target.value });
          }}
          ref={titleRef}
          title="Form Title"
          placeholder="Enter form title"
        />
      </div>
      {state.formFields.map((field) => (
        <LabeledInput
          key={field.id}
          id={field.id}
          label={field.label}
          value={field.value}
          fieldtype={field.type}
          onChange={handleChange}
          removeFieldCB={removeField}
        />
      ))}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          className="border-2 border-gray-200 rounded-lg p-1 flex-1"
          value={newField}
          onChange={(e) => {
            setNewField(e.target.value);
          }}
          placeholder="Enter field label"
        />
        <button
          type="button"
          onClick={addField}
          className="text-white bg-blue-500 mt-3 hover:bg-blue-800 font-bold py-1 px-1 my-4 rounded-lg w-fit"
        >
          Add Field
        </button>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => saveFormData(state)}
          className="text-white bg-blue-500 mt-3 hover:bg-blue-800 font-bold py-2 px-4 my-4 rounded-lg w-fit"
        >
          Save
        </button>
        <Link
          href="/"
          className="text-white bg-blue-500 mt-3 hover:bg-blue-800 font-bold py-2 px-4 my-4 rounded-lg w-fit"
        >
          Close Form
        </Link>
        <Link
          href="/preview/"
          className="text-white bg-blue-500 mt-3 hover:bg-blue-800 font-bold py-2 px-4 my-4 rounded-lg w-fit"
        >
          Close Form
        </Link>
      </div>
    </div>
  );
}
