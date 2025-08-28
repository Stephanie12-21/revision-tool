export const formatQuestions = (questionsHtml: string) => {
  if (!questionsHtml) return "";
  const lines = questionsHtml
    .split(/\r?\n|<\/?p[^>]*>/gi)
    .map((q) => q.trim())
    .filter((q) => q.length > 0);

  return `<ol class="list-decimal ml-6">${lines
    .map(
      (q) =>
        `<li class="mb-2 leading-relaxed">${q.replace(/^\d+\.\s*/, "")}</li>`
    )
    .join("")}</ol>`;
};

export const formatFicheContent = (points: string | string[] | undefined) => {
  if (!points) return "";
  const pointsArray = Array.isArray(points)
    ? points
    : points.split("\n").filter(Boolean);
  return pointsArray
    .map(
      (p) =>
        `<div class="flex items-start gap-2 mb-3"><span>${p.replace(
          /^→\s*/,
          ""
        )}</span></div>`
    )
    .join("");
};
