function UserIcon(props) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      aria-hidden="true"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path d="M.5.5h25v25H.5z"></path>
        <g transform="translate(1 1)" stroke="currentColor">
          <g transform="translate(5.86 7)">
            <path d="M11.783 15.604A6 6 0 1 0 .186 15.49"></path>
            <circle cx="6" cy="3" r="3"></circle>
          </g>
          <circle cx="12" cy="12" r="12"></circle>
        </g>
      </g>
    </svg>
  );
}
export default UserIcon;
