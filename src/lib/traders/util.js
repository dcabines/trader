export const timeout = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));
export const userName = () => `user-${new Date().getTime()}-${Math.random()}`;

export function upsert(findKey) {
  return (destination, incoming) => {
    const existing = destination.find(x => findKey(x, incoming));
    const others = destination.filter(x => x !== existing);
    const updated = {...existing, ...incoming };
    return [...others, updated];
  };
}