export function transformData(newData) {
  const yearMap = {};

  newData.forEach((categoryGroup) => {
    const category = categoryGroup.category;
    categoryGroup.items.forEach((yearItem) => {
      const year = yearItem.year;
      if (!yearMap[year]) {
        yearMap[year] = { year, items: [] };
      }

      yearItem.items.forEach((monthItem) => {
        const month = monthItem.month;
        let existingMonth = yearMap[year].items.find((m) => m.month === month);
        if (!existingMonth) {
          existingMonth = { month, items: [] };
          yearMap[year].items.push(existingMonth);
        }

        existingMonth.items.push({
          category,
          items: monthItem.items.map((doc) => ({
            ...doc,
            file: doc.file?.url || null, // flatten file URL
          })),
        });
      });
    });
  });

  return Object.values(yearMap).sort((a, b) => b.year - a.year); // descending year
}
