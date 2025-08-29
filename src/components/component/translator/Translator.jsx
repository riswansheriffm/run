import styles from "./style.module.css";

const Translator = ({ themeColor }) => {
  const changeLanguage = (lang) => {
    const googleTranslate = document.querySelector(".goog-te-combo");

    if (googleTranslate) {
      googleTranslate.value = lang;
      googleTranslate.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      {/* <div className="notranslate flex justify-center items-center gap-1 "> */}
      <div className="relative inline-block">
        <label className="notranslate flex justify-center items-center gap-1 cursor-pointer px-2 py-1">
          <span role="img" aria-label="language">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                d="M6 12.5C9.31371 12.5 12 9.81371 12 6.5C12 3.18629 9.31371 0.5 6 0.5C2.68629 0.5 0 3.18629 0 6.5C0 9.81371 2.68629 12.5 6 12.5ZM6 1.5C6.37372 1.5 6.87543 1.85608 7.31258 2.81781C7.4073 3.02619 7.49448 3.25446 7.57265 3.5H4.42735C4.50552 3.25446 4.5927 3.02619 4.68742 2.81781C5.12457 1.85608 5.62628 1.5 6 1.5ZM3.77705 2.40401C3.62614 2.73601 3.49428 3.1038 3.38411 3.5H1.99963C2.52341 2.80269 3.22525 2.24677 4.03766 1.89978C3.94287 2.06117 3.85596 2.2304 3.77705 2.40401ZM3.16299 4.5C3.05694 5.1275 3 5.80146 3 6.5C3 7.19854 3.05694 7.8725 3.16299 8.5H1.41604C1.14845 7.88754 1 7.2111 1 6.5C1 5.7889 1.14845 5.11246 1.41604 4.5H3.16299ZM3.38411 9.5C3.49428 9.8962 3.62614 10.264 3.77705 10.596C3.85596 10.7696 3.94287 10.9388 4.03766 11.1002C3.22525 10.7532 2.52341 10.1973 1.99963 9.5H3.38411ZM4.42735 9.5H7.57265C7.49448 9.74554 7.4073 9.97381 7.31258 10.1822C6.87543 11.1439 6.37372 11.5 6 11.5C5.62628 11.5 5.12457 11.1439 4.68742 10.1822C4.5927 9.97381 4.50552 9.74554 4.42735 9.5ZM7.82134 8.5H4.17866C4.06438 7.8892 4 7.21396 4 6.5C4 5.78604 4.06438 5.1108 4.17866 4.5H7.82134C7.93562 5.1108 8 5.78604 8 6.5C8 7.21396 7.93562 7.8892 7.82134 8.5ZM8.61589 9.5H10.0004C9.47659 10.1973 8.77475 10.7532 7.96234 11.1002C8.05713 10.9388 8.14404 10.7696 8.22295 10.596C8.37386 10.264 8.50572 9.8962 8.61589 9.5ZM10.584 8.5H8.83701C8.94306 7.8725 9 7.19854 9 6.5C9 5.80146 8.94306 5.1275 8.83701 4.5H10.584C10.8516 5.11246 11 5.7889 11 6.5C11 7.2111 10.8516 7.88754 10.584 8.5ZM7.96234 1.89978C8.77475 2.24677 9.47659 2.80269 10.0004 3.5H8.61589C8.50572 3.1038 8.37386 2.73601 8.22295 2.40401C8.14404 2.2304 8.05713 2.06117 7.96234 1.89978Z"
                fill={`${themeColor}`}
              />
            </svg>
          </span>
          <select
            className="notranslate border-0 outline-0 bg-transparent cursor-pointer text-[10px] md:text-[12px] "
            defaultValue="en"
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option
              className={`notranslate text-black  ${styles.option}`}
              value="en"
            >
              Eng
            </option>
            <option
              className={`notranslate text-black  ${styles.option}`}
              value="fr"
            >
              Fre
            </option>
            <option
              className={`notranslate text-black ${styles.option}`}
              value="es"
            >
              Spa
            </option>
            <option
              className={`notranslate text-black ${styles.option}`}
              value="hi"
            >
              Hin
            </option>
            <option
              className={`notranslate text-black ${styles.option}`}
              value="zh-CN"
            >
              Chi
            </option>
            <option
              className={`notranslate text-black ${styles.option}`}
              value="ta"
            >
              Tam
            </option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2.21967 4.46967C2.51256 4.17678 2.98744 4.17678 3.28033 4.46967L6 7.18934L8.71967 4.46967C9.01256 4.17678 9.48744 4.17678 9.78033 4.46967C10.0732 4.76256 10.0732 5.23744 9.78033 5.53033L6.53033 8.78033C6.23744 9.07322 5.76256 9.07322 5.46967 8.78033L2.21967 5.53033C1.92678 5.23744 1.92678 4.76256 2.21967 4.46967Z"
              fill={`${themeColor}`}
            />
          </svg>
        </label>
      </div>
    </>
  );
};

export default Translator;
