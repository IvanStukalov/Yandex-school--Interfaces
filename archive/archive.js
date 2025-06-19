const getActualVersionText = (from, to, doc) => {
  const actualVersion = doc.versions.reverse().find((ver) => {
    const hasLeftBorder = !!ver.from;
    const hasRightBorder = !!ver.to;

    let leftSide = true;
    let rightSide = true;

    let fromVer = ver.from ? new Date(ver.from) : null;
    let toVer = ver.to ? new Date(ver.to) : null;

    if (hasLeftBorder) {
      rightSide = fromVer <= from || fromVer <= to;
    }

    if (hasRightBorder) {
      leftSide = toVer >= from || toVer >= to;
    }

    return leftSide && rightSide;
  });

  return actualVersion?.text ?? null;
};

export const search = (from, to, data) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const texts = [];
  for (const doc of data) {
    const actualVersionText = getActualVersionText(fromDate, toDate, doc);
    if (actualVersionText !== null) {
      const deps = data.filter((d) => doc.deps.some((dep) => d.id === dep.id));
      const depTexts = search(from, to, deps);
      if (depTexts && depTexts.length === deps.length) {
        texts.push(actualVersionText);
      }
    }
  }

  return texts;
};
