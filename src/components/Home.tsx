import { useEffect, useState } from "react";
import { Link, useQueryParams } from "raviger";
import { formData } from "../types/form";
import { getLocalForm } from "../utils/StorageUtils";

export default function Home() {
  const [forms, setForms] = useState<formData[]>(getLocalForm());
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    localStorage.setItem("savedForms", JSON.stringify(forms));
  }, [forms]);
  return (
    <div>
      <div className="flex items-center justify-end">
        <Link
          className="flex px-4 m-2 shadow-md border border-gray-200 hover:bg-white bg-gray-100 cursor-pointer rounded-lg"
          href={`forms/0`}
        >
          <div className="flex flex-col py-2">
            <h1 className="text-xl text-slate-700">+New Form</h1>
          </div>
        </Link>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <label>Search</label>
        <input
          name="search"
          type="text"
          className="w-full border-2 border-gray-200 rounded-lg p-1 flex-1 my-2"
          placeholder="Search forms"
          title="Search forms"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </form>
      {forms
        .filter((form) =>
          form.title.toLowerCase().includes(search?.toLowerCase() || "")
        )
        .map((form) => {
          return (
            <div className="flex items-center justify-center">
              <div className="flex justify-between w-full p-4 m-2 shadow-md border border-gray-200 hover:bg-white bg-gray-100 cursor-pointer rounded-lg">
                <div className="flex flex-col py-2">
                  <h1 className="text-xl text-slate-700">{form.title}</h1>
                  <span className="text-gray-600">
                    {form.formFields.length} fields
                  </span>
                </div>
                <div className="flex items-center">
                  <Link
                    href={`forms/${form.id}`}
                    className="bg-gray-200 text-gray-800 border-gray-400 rounded-lg p-1 m-2"
                  >
                    Open Form
                  </Link>
                  <button
                    onClick={() => {
                      setForms(forms.filter((f) => f.id !== form.id));
                    }}
                    className="bg-gray-200 text-gray-800 border-gray-400 rounded-lg p-1 m-2"
                  >
                    Delete Form
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
