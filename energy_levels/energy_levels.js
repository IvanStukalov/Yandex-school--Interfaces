export function solution(container) {
  const values = Array.from(container.querySelectorAll("div[data-value]")).map(
    (el) => el.getAttribute("data-value")
  );
  
  let max = 0;
  for (let i = 1; i < values.length; i++) {
    const dif = Math.abs(values[i] - values[i - 1]);
    if (dif > max) {
      max = dif;
    }
  }

  return max;
}
