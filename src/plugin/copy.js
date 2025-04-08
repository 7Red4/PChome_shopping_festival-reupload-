let copyClickEvent = null;
window.addEventListener("click", event => {
  copyClickEvent = event;
});

export default function (str) {
  // must be slower than window event
  setTimeout(() => {
    console.log(str);
    const tempInput = document.createElement("textarea");
    tempInput.value = str;
    tempInput.style.opacity = 0.1;
    tempInput.style.position = "fixed";

    copyClickEvent.target.appendChild(tempInput);

    tempInput.select();
    document.execCommand("copy");
    getSelection().removeAllRanges();
    tempInput.blur();

    tempInput.remove();
  });
};