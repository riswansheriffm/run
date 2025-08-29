export async function getLatestPublicationAndPressRelease(
  releaseContent,
  pressReleases
) {
  let latestPublication = null;
  let latestPressRelease = null;

  // Flatten all publication items
  const publicationItems = [];
  releaseContent?.forEach((category) => {
    category.items?.forEach((year) => {
      year.items?.forEach((month) => {
        month.items?.forEach((item) => {
          if (item?.file?.publishedAt) {
            publicationItems.push({
              title: item.title,
              description: item.description || null,
              file: item.file,
            });
          }
        });
      });
    });
  });

  // Sort and pick the latest publication
  if (publicationItems.length) {
    publicationItems.sort(
      (a, b) => new Date(b.file.publishedAt) - new Date(a.file.publishedAt)
    );
    latestPublication = publicationItems[0];
  }

  // Flatten all press release items
  const pressReleaseItems = [];
  pressReleases?.forEach((year) => {
    year.items?.forEach((month) => {
      month.items?.forEach((section) => {
        if (section.category === "Press Releases") {
          section.items?.forEach((item) => {
            if (item?.file?.publishedAt) {
              pressReleaseItems.push({
                title: item.title,
                description: item.description || null,
                file: item.file,
              });
            }
          });
        }
      });
    });
  });

  // Sort and pick the latest press release
  if (pressReleaseItems.length) {
    pressReleaseItems.sort(
      (a, b) => new Date(b.file.publishedAt) - new Date(a.file.publishedAt)
    );
    latestPressRelease = pressReleaseItems[0];
  }

  // Return result in the required format
  return [
    {
      publication: latestPublication,
      pressRelease: latestPressRelease,
    },
  ];
}
