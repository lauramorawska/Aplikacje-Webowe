let products = [];
let filtered = [];

async function load() {
  const res = await fetch("https://dummyjson.com/products");
  products = res.ok ? (await res.json()).products.slice(0, 30) : [];
  filtered = [...products];
  render(filtered);
}

function render(list) {
  const tbody = document.querySelector("#table tbody");
  tbody.innerHTML = "";
  list.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td><img src="${p.thumbnail}" width="80"></td>
        <td>${p.title}</td>
        <td>${p.description}</td>
      </tr>`;
  });
}

document.querySelector("#filter").oninput = () => {
  const txt = document.querySelector("#filter").value.toLowerCase();
  filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(txt) ||
      p.description.toLowerCase().includes(txt)
  );
  applySort();
};

document.querySelector("#sort").onchange = applySort;

function applySort() {
  const type = document.querySelector("#sort").value;

  if (type === "asc") filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (type === "desc") filtered.sort((a, b) => b.title.localeCompare(a.title));
  if (type === "original")
    filtered = [...products].filter((p) => filtered.includes(p));

  render(filtered);
}

load();
