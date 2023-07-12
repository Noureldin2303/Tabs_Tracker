let tabsList = [];

const inputEL = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEL = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveBtn = document.getElementById("tab-btn");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("tabsList"));

if (leadsFromLocalStorage) {
  tabsList = leadsFromLocalStorage;
  render(tabsList);
}

function render(Leads) {
  let itemsList = "";
  for (let i = 0; i < Leads.length; i++) {
    itemsList += `
    <li>
      <a target='_blank' href='${Leads[i]}'>
        ${Leads[i]}
      </a>
    </li>
    `;
  }

  ulEL.innerHTML = itemsList;
}

saveBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    tabsList.push(tabs[0].url);
    localStorage.setItem("tabsList", JSON.stringify(tabsList));
    render(tabsList);
  });
});

deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  tabsList = [];
  render(tabsList);
});

document.getElementById("input-el").addEventListener("keypress", saveInput);
document.getElementById("input-btn").addEventListener("click", saveInput);

function saveInput(event) {
  if (event.type === "keypress" && event.key !== "Enter") return;
  if (inputEL.value !== "") {
    inputEL.value = `http://${inputEL.value}.com`;
    tabsList.push(inputEL.value);
    inputEL.value = "";
    localStorage.setItem("tabsList", JSON.stringify(tabsList));
    render(tabsList);
  }
}
