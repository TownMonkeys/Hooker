import { useCallback, useState, useEffect } from "react";

function computeVisiblePieces(activePage, config) {
  const { numberOfPages, maxButtons } = config;
  const visiblePieces = [];
  if (numberOfPages <= maxButtons) {
    visiblePieces.push({
      type: "previous",
      pageNumber: Math.max(1, activePage - 1),
      isDisabled: activePage === 1,
    });
    for (let page = 1; page <= numberOfPages; page++) {
      visiblePieces.push({ type: "page-number", pageNumber: page });
    }
    visiblePieces.push({
      type: "next",
      pageNumber: Math.min(numberOfPages, activePage + 1),
      isDisabled: activePage === numberOfPages,
    });
    return visiblePieces;
  }

  let lowerLimit = activePage;
  let upperLimit = activePage;

  visiblePieces.push({
    type: "previous",
    pageNumber: Math.max(1, activePage - 1),
    isDisabled: activePage === 1,
  });

  for (let i = 1; i < maxButtons && i < numberOfPages; ) {
    if (lowerLimit > 1) {
      lowerLimit--;
      i++;
    }

    if (i < maxButtons && upperLimit < numberOfPages) {
      upperLimit++;
      i++;
    }
  }

  if (lowerLimit > 1 && lowerLimit !== upperLimit) {
    visiblePieces.push({ type: "page-number", pageNumber: 1 });
    visiblePieces.push({ type: "ellipsis" });
  }

  for (let i = lowerLimit; i <= upperLimit; i++) {
    visiblePieces.push({ type: "page-number", pageNumber: i });
  }
  if (activePage < numberOfPages - 2) {
    visiblePieces.push({ type: "ellipsis" });
  }
  if (activePage < numberOfPages - 1) {
    visiblePieces.push({ type: "page-number", pageNumber: numberOfPages });
  }

  visiblePieces.push({
    type: "next",
    pageNumber: Math.min(numberOfPages, activePage + 1),
    isDisabled: activePage === numberOfPages,
  });
  return visiblePieces;
}

export default function usePagination(_config) {
  if (typeof _config !== "object") {
    throw new TypeError(
      `usePagination(config): config must be an object. Go ${typeof _config} instead`
    );
  }

  const config = { ..._config };

  if (config.initialPage > config.numberOfPages) {
    config.initialPage = config.numberOfPages;
  }

  if (config.maxButtons > config.numberOfPages) {
    config.maxButtons = config.numberOfPages;
  }

  const [activePage, setActivePage] = useState(config.initialPage);
  const { numberOfPages, hasNext, hasPrev } = config;
  const isFirst = activePage === 1;
  const isLast = activePage === numberOfPages;
  const visiblePieces = computeVisiblePieces(activePage, config);
  const goToPage = useCallback((pageNumber) => {
    setActivePage(pageNumber);
  }, []);

  useEffect(() => {
    if (config.initialPage !== activePage) {
      setActivePage(config.initialPage);
    }
  }, [config.initialPage]);

  return {
    activePage,
    isFirst,
    isLast,
    hasPrev,
    hasNext,
    visiblePieces,
    goToPage,
  };
}
