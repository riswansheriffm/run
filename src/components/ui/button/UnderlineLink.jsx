const UnderlineLink = ({ name, href, className, isDownloadIconNeeded }) => {
  const isDocumentLink = /\.(pdf|docx?|xlsx?|pptx?)$/i.test(href);

  return (
    <a
      href={href}
      target={isDocumentLink ? "_blank" : "_self"}
      rel={isDocumentLink ? "noopener noreferrer" : undefined}
      className={`text-brown text-[14px] font-medium inline-flex items-center border-b  border-brown  transition ${className}`}
    >
      {name}
      <span className="ml-1 text-xl">
        {isDownloadIconNeeded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g clip-path="url(#clip0_1305_2828)">
              <path
                d="M1.5 11H10.5C10.9142 11 11.25 11.3358 11.25 11.75C11.25 12.1297 10.9678 12.4435 10.6018 12.4932L10.5 12.5H1.5C1.08579 12.5 0.75 12.1642 0.75 11.75C0.75 11.3703 1.03215 11.0565 1.39823 11.0068L1.5 11H10.5H1.5ZM5.89823 -0.993153L6 -1C6.3797 -1 6.69349 -0.717846 6.74315 -0.351771L6.75 -0.25V7.438L9.0052 5.18414C9.27147 4.91787 9.68813 4.89366 9.98175 5.11152L10.0659 5.18414C10.3321 5.4504 10.3563 5.86707 10.1385 6.16068L10.0659 6.2448L6.53033 9.78033C6.26406 10.0466 5.8474 10.0708 5.55379 9.85295L5.46967 9.78033L1.93414 6.2448C1.64124 5.9519 1.64124 5.47703 1.93414 5.18414C2.2004 4.91787 2.61707 4.89366 2.91068 5.11152L2.9948 5.18414L5.25 7.44V-0.25C5.25 -0.629696 5.53215 -0.943491 5.89823 -0.993153L6 -1L5.89823 -0.993153Z"
                fill="#4D2412"
              />
            </g>
            <defs>
              <clipPath id="clip0_1305_2828">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <span className="text-sm leading-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M4.46967 2.21967C4.17678 2.51256 4.17678 2.98744 4.46967 3.28033L7.18934 6L4.46967 8.71967C4.17678 9.01256 4.17678 9.48744 4.46967 9.78033C4.76256 10.0732 5.23744 10.0732 5.53033 9.78033L8.78033 6.53033C9.07322 6.23744 9.07322 5.76256 8.78033 5.46967L5.53033 2.21967C5.23744 1.92678 4.76256 1.92678 4.46967 2.21967Z"
                fill="#4D2412"
              />
            </svg>
          </span> // Unicode › symbol
        )}
      </span>
    </a>
  );
};

export default UnderlineLink;
