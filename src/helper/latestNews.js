export async function extractAndSortDocuments(releaseContent, pressReleases) {
  const collected = [];

  const extractFromReleases = (data) => {
    data.forEach((category) => {
      if (!Array.isArray(category?.items)) return;

      category?.items?.forEach((year) => {
        if (!Array.isArray(year?.items)) return;

        year?.items?.forEach((month) => {
          if (!Array.isArray(month?.items)) return;

          month?.items?.forEach((item) => {
            if (item?.file) {
              collected.push({
                title: item?.title,
                description: item?.description || null,
                file: item?.file,
              });
            }
          });
        });
      });
    });
  };

  const extractFromPress = (data) => {
    data?.forEach((year) => {
      if (!Array.isArray(year?.items)) return;

      year?.items?.forEach((month) => {
        if (!Array.isArray(month?.items)) return;

        month?.items?.forEach((section) => {
          if (!Array.isArray(section?.items)) return;

          section?.items?.forEach((item) => {
            if (item?.file) {
              collected.push({
                title: item?.title,
                description: item?.description || null,
                file: item?.file,
              });
            }
          });
        });
      });
    });
  };

  extractFromReleases(releaseContent);
  extractFromPress(pressReleases);

  // Sort by file.publishedAt in descending order
  collected.sort(
    (a, b) => new Date(b.file.publishedAt) - new Date(a.file.publishedAt)
  );

  return collected;
}
