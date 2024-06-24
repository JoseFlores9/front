const InformationFilledIcon = ({ styles }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={"fill-current " + styles}
      viewBox="0 0 11 11"
    >
      <g clipPath="url(#a)">
        <path d="M5.5 10.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-.781-3.438h.468v-1.25H4.72a.468.468 0 1 1 0-.937h.937c.26 0 .469.209.469.469v1.718h.156a.468.468 0 1 1 0 .938H4.72a.468.468 0 1 1 0-.938ZM5.5 3a.625.625 0 1 1 0 1.25.625.625 0 0 1 0-1.25Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M.5.5h10v10H.5z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InformationFilledIcon;
