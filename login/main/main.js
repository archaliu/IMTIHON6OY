const API_B = "https://66cef7df901aab2484205834.mockapi.io/API/carta";
const form = document.querySelector("form");
const h1 = document.querySelector(".h1");
const h2 = document.querySelector(".h2");
const h3 = document.querySelector(".h3");
const h4 = document.querySelector(".h4");
const mouth = document.querySelector(".kartaoyraqami");
const ism = document.querySelector(".ism");
const btn = document.querySelector(".btnSave");
const cartalar = document.querySelector(".cartalar");
if (!localStorage.getItem("token")) {
  window.location.replace("../index.html");
}
form.tozalash.addEventListener("click", () => {
  h1.textContent = "####";
  h2.textContent = "####";
  h3.textContent = "####";
  h4.textContent = "####";
  form.MUDDAT.value = "##/##";
  ism.textContent = "NAME LASTNAME";
});

form.RAQAM.addEventListener("input", () => {
  h1.textContent = form.RAQAM.value.slice(0, 4);
  h2.textContent = form.RAQAM.value.slice(4, 8);
  h3.textContent = form.RAQAM.value.slice(8, 12);
  h4.textContent = form.RAQAM.value.slice(12, 16);
});
form.MUDDAT.addEventListener("input", () => {
  mouth.textContent =
    form.MUDDAT.value.slice(0, 2) + "/" + form.MUDDAT.value.slice(2, 4);
});

form.ismi.addEventListener("input", () => {
  ism.textContent = form.ismi.value;
});

function maxsulot() {
  fetch(API_B)
    .then((res) => res.json())
    .then((data) => {
      renderProducts(data);
    });
}
maxsulot();

function renderProducts(array) {
  cartalar.textContent = null;
  array.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
 <div class="img-carta">
        <div class="kartaraqami">
          <div class="h1">${product.number.slice(0, 4)}</div>
          <div class="h2">${product.number.slice(4, 8)}</div>
          <div class="h3">${product.number.slice(8, 12)}</div>
          <div class="h4">${product.number.slice(12, 16)}</div>
        </div>
        <div class="kartaoyraqami">${product.mouth.slice(
          0,
          2
        )}/${product.mouth.slice(2, 4)}</div>

        <div class="ism">${product.name}</div>
      </div>
                 
              `;

    cartalar.appendChild(productElement);
  });
}
btn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(API_B, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number: form.RAQAM.value,
      mouth: form.MUDDAT.value,
      name: form.ismi.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      form.ismi.value = "";
      form.MUDDAT.value = "";
      form.RAQAM.value = "";
      h1.textContent = "####";
      h2.textContent = "####";
      h3.textContent = "####";
      h4.textContent = "####";
      form.MUDDAT.value = "##/##";
      ism.textContent = "NAME LASTNAME";
      maxsulot();
    });
});
