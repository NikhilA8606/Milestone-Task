import { intialFormField } from "../components/Form";
import { formData } from "../types/form";

//Get the form data from local storage
export const getLocalForm: () => formData[] = () => {
  const savedFormJSON = localStorage.getItem("savedForms");
  return savedFormJSON ? JSON.parse(savedFormJSON) : [];
};

//Load the form data from local storage
export const initialState: (id: number) => formData = (id) => {
  const localForms = getLocalForm();
  const form = localForms.find((f) => f.id === id);
  return form || createNewForm();
};

//create new Form
export const createNewForm = (): formData => {
  return {
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: intialFormField,
  };
};

export const saveLocalForms = (localForm: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForm));
};

//Serialize the form data into single string and save it to local storage
export const saveFormData = (currentState: formData) => {
  console.log("Saving form data");
  const localForms = getLocalForm();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};
