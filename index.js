let fetchedData = [];

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
)
  .then((res) => res.json())
  .then((data) => {
    fetchedData = data.map((item) => ({
      symbol: item.symbol,
      name: item.name,
      id: item.id,
      image: item.image,
      currentPrice: item.current_price,
      marketCap: item.market_cap,
      percentageChange: item.market_cap_change_percentage_24h,
    }));
    console.log(fetchedData);
    renderData(fetchedData);
  })
  .catch((error) => {
    console.log(`${error} because of 429 error`);
  });

async function fetchData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();

    fetchedData = data.map((item) => ({
      symbol: item.symbol,
      name: item.name,
      id: item.id,
      image: item.image,
      currentPrice: item.current_price,
      marketCap: item.market_cap,
      percentageChange: item.market_cap_change_percentage_24h,
    }));
    renderData(fetchedData);
  } catch (error) {
    console.log(`${error} because of max limit of fecting data`);
  }
}

const tableBody = document.getElementById("data-entry");

// function for rendering data into UI

function renderData(data) {
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");

    const imageCell = document.createElement("td");
    const imageData = document.createElement("img");
    imageData.src = item.image;
    imageData.alt = item.name;
    imageCell.appendChild(imageData);
    row.appendChild(imageCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const symbolCell = document.createElement("td");
    symbolCell.textContent = item.symbol.toUpperCase();
    row.appendChild(symbolCell);

    const currentPriceCell = document.createElement("td");
    currentPriceCell.textContent = "$" + item.currentPrice;
    row.appendChild(currentPriceCell);

    const percentageChangeCell = document.createElement("td");
    percentageChangeCell.textContent = item.percentageChange.toFixed(2) + "%";

    if (item.percentageChange < 0) {
      percentageChangeCell.style.color = "red";
    } else {
      percentageChangeCell.style.color = "green";
    }

    row.appendChild(percentageChangeCell);

    const marketCapCell = document.createElement("td");
    marketCapCell.textContent = "Mkt Cap : $" + item.marketCap;
    row.appendChild(marketCapCell);

    tableBody.appendChild(row);
  });
}

const search = document.getElementById("search");
const mktButton = document.getElementById("mkt-sort");
const percentButton = document.getElementById("percent-sort");

// Searching eventListener

search.addEventListener("keyup", () => {
  const searchedvalue = search.value.toLowerCase();
  const filterdData = fetchedData.filter((item) =>
    item.name.toLowerCase().includes(searchedvalue)
  );
  renderData(filterdData);
});

// sort by marketcap eventListner

mktButton.addEventListener("click", () => {
  let sortedData = [...fetchedData].sort((a, b) => a.marketCap - b.marketCap);
  renderData(sortedData);
});

// sort by percentagechange eventListner

percentButton.addEventListener("click", () => {
  let sortedData = [...fetchedData].sort(
    (a, b) => a.percentageChange - b.percentageChange
  );
  renderData(sortedData);
});
