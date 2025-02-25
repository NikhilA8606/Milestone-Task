export default function LabeledInput(props: {
  id: number;
  label: string;
  fieldtype: string;
  value: string;
  onChange: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
}) {
  return (
    <>
      <label>{props.label}</label>
      <div className="flex gap-2">
        <input
          value={props.value}
          className="border-2 border-gray-200 rounded-lg p-1 flex-1"
          type={props.fieldtype}
          onChange={(e) => props.onChange(props.id, e.target.value)}
        />
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white p-1 font-bold rounded-lg"
          onClick={() => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </>
  );
}
