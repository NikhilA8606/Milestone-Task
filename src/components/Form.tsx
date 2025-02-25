import { useEffect, useState, useRef } from "react";
import LabeledInput from "../LabeledInput";

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}
interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const intialFormField: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
  { id: 5, label: "Phone Number", type: "tel", value: "" },
];

const getLocalForm: () => formData[] = () => {
  const savedFormJSON = localStorage.getItem("savedForms");
  return savedFormJSON ? JSON.parse(savedFormJSON) : [];
};

//Load the form data from local storage
const initialState: (id: number) => formData = (id) => {
  const localForms = getLocalForm();
  const form = localForms.find((f) => f.id === id);
  if (form) {
    return form;
  }
  const newForm = {
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: intialFormField,
  };
  saveLocalForms([...localForms, newForm]);
  return newForm;
};

const saveLocalForms = (localForm: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForm));
};

//Serialize the form data into single string and save it to local storage
const saveFormData = (currentState: formData) => {
  const localForms = getLocalForm();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};

export default function Form(props: { formId: number }) {
  const [state, setState] = useState(() => initialState(props.formId));
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

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
    let timeout = setTimeout(() => {
      console.log("Form data changed");
      saveFormData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

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
        <a
          href="/"
          className="text-white bg-blue-500 mt-3 hover:bg-blue-800 font-bold py-2 px-4 my-4 rounded-lg w-fit"
        >
          Close Form
        </a>
      </div>
    </div>
  );
}
