import { useState } from "react";

export function useCopyToClipboard(callBack) {
  const [copiedText, setCopiedText] = useState(null);

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      callBack("Copy Failed");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      callBack("Copy Successfully");
      setCopiedText(text);
      return true;
    } catch (error) {
      callBack("Copy Failed");
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}
