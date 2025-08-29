export const formatNewLines = (text) => {
  if (!text) return null;

  return text.split("\\n").map((line, index) => (
    <span className="font-h6" key={index}>
      {line}
      <br />
    </span>
  ));
};

export function formatToBullets(text = "") {
  const lines = text.replace(/\\n/g, "\n").split("\n");

  const bulletLines = [];
  const output = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      bulletLines.push(trimmed.slice(2));
    } else {
      // Flush any existing bullet points before adding normal text
      if (bulletLines.length > 0) {
        output.push(
          <ul key={`ul-${index}`} className="list-disc pl-6 font-h6">
            {bulletLines.map((item, i) => (
              <li className="font-h6 text-gray font-normal" key={`li-${i}`}>
                {item}
              </li>
            ))}
          </ul>
        );
        bulletLines.length = 0; // clear bullets
      }

      // Add normal text as <p>
      if (trimmed) {
        const isKeyAreas = trimmed === "Key Areas:";
        const isTheseInclude = trimmed === "These include:";

        output.push(
          <p
            className={`font-h6 ${
              isKeyAreas
                ? "text-darkgray font-medium mt-6"
                : isTheseInclude
                ? "text-gray font-normal mt-6"
                : "text-gray font-normal"
            }`}
            key={`p-${index}`}
          >
            {trimmed}
          </p>
        );
      }
    }
  });

  // Flush remaining bullets if any
  if (bulletLines.length > 0) {
    output.push(
      <ul key={`ul-end`} className="list-disc pl-6 font-h6">
        {bulletLines.map((item, i) => (
          <li className="font-h6 text-gray font-normal" key={`li-end-${i}`}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return output;
}

// export function insertNewLineBeforeBullets(text = "") {
//   if (!text) return "";
//   return text
//     .replace(/([^\n])\s*- /g, "$1\n") // Insert newline before dash
//     .replace(/^- /gm, "") // Remove dash at start of line
//     .replace(/\n/g, "\n\n"); // Add extra spacing between lines
// }

export function insertNewLineBeforeBullets(text = "") {
  if (!text) return "";
  return text
    .replace(/([^\n])\s*- /g, "$1\n- ") // Insert newline before dash
    .replace(/^- /gm, "") // Remove dash at start of line (optional)
    .replace(/\n/g, "\n"); // Ensure no more than one newline
}
