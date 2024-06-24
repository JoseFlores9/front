import Check from "../../../assets/icons/Check";

const CheckBox = (props) => {
  const {
    value = false,
    setValue,
    checkboxId,
    styles = "relative mr-2 h-6 bg-transparent",
  } = props;
  return (
    <div className={styles}>
      <input
        type="checkbox"
        id={checkboxId}
        name={checkboxId}
        onClick={(e) => e.stopPropagation()}
        value={value}
        checked={value}
        onChange={setValue}
        className="peer relative h-4 w-4 appearance-none rounded border-1 border-principal text-principal checked:bg-white"
      />
      <label htmlFor={checkboxId} className="text-principal" />
      <Check styles="pointer-events-none text-principal absolute top-0 ml-[2px] mt-[4px] hidden fill-current peer-checked:block w-3 h-3" />
    </div>
  );
};

export default CheckBox;
