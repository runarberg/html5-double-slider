var rangeLength = document.querySelector("input[type='range']").clientWidth;

var inputs = document.querySelectorAll("input[type='range']");

Array.prototype.forEach.call(inputs, function(input) {
  input.addEventListener("change", function(e) {
    var name = this.name.split("__");
    var otherId = (name[0]+"__"+ (name[1] !== "gte" ? "gte" : "lte"));
    var otherEl = document.getElementById(otherId);
    var domain = [Math.min(this.min, otherEl.min),
                  Math.max(this.max, otherEl.max)];
    if (name[1] === "gte") {
      otherEl.min = this.value;
      otherEl.style.width = fixWidth(domain[1] - this.value, domain);
    } else if (name[1] === "lte") {
      otherEl.max = this.value;
      otherEl.style.width = fixWidth(this.value, domain);
    }
    console.log(this.clientWidth, otherEl.clientWidth);
  });
});

function fixWidth(value, domain) {
  return (Math.abs(domain[0] - value) /
          Math.abs(domain[0] - domain[1])) *
    rangeLength;
}
