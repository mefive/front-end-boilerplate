export default function (delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
}
