export const sortIdeas = (
  ideas: ItemType[],
  property: keyof ItemType,
  isDescending: boolean
): ItemType[] => {
  return [...ideas].sort((a, b) => {
    if (a[property] < b[property]) return isDescending ? 1 : -1;
    if (a[property] > b[property]) return isDescending ? -1 : 1;

    return 0;
  });
};

type keyUpFunction<T extends HTMLInputElement | HTMLTextAreaElement> =
  | ((e: React.KeyboardEvent<T>) => void)
  | null;

export const handleKeyUp = <T extends HTMLInputElement | HTMLTextAreaElement>(
  func: keyUpFunction<T> = null
) => {
  return (e: React.KeyboardEvent<T>) => {
    // Registers Ctrl + Enter
    if (e.key === 'Enter' && e.ctrlKey) {
      // If a function is passed, run that function
      if (func) {
        func(e);
        // Otherwise, remove the current target focus
      } else {
        e.preventDefault();
        (e.target as HTMLInputElement).blur();
      }
    }
  };
};

export default handleKeyUp;
