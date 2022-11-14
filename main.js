const siteBody = document.querySelector(".site-body");
const prayDailyBtn = document.querySelector(".pray-daily-btn");
const prayWeeklyBtn = document.querySelector(".pray-weekly-btn");
const prayLocationSelect = document.querySelector(".pray-location-select");
const prayLocationResult = document.querySelector(".pray-location-res");
const prayList = document.querySelector(".pray-list");
const prayListWeekly = document.querySelector(".pray-list-weekly");
const prayTemplate = document.querySelector(".pray-template").content;
const prayItem = document.querySelector(".pray-item");
const prayItemText = document.querySelector(".pray-item-text");
const prayItemTimeText = document.querySelector(".pray-item-time-text");
const pray_API = "https://islomapi.uz/api/present/day?region=Toshkent";
const pray_API_weekly = "https://islomapi.uz/api/present/week?region=Toshkent";

prayListWeekly.classList.add("d-none")
// const currentDateDay = new Date();
// const currentDateHours = currentDateDay.getHours();
// console.log(currentDateHours);
function prayRender(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // data.times.hufton = currentDateHours;
      // data.times.shom_iftor = currentDateHours;
      // data.times.tong_saharlik = currentDateHours;
      // if (data.times.hufton) {
      //   siteBody.classList.add("site-body--night");
      //   console.log("hufton");
      // } else if (data.times.shom_iftor) {
      //   siteBody.classList.add("site-body--sunset");
      //   siteBody.classList.remove("site-body--night");
      //   console.log("shom");
      // } else if (data.times.tong_saharlik) {
      //   siteBody.classList.remove("site-body--night");
      //   siteBody.classList.remove("site-body--sunset");
      //   console.log("sahar");
      // } else {
      //   console.log("no no no");
      // }
      prayList.childNodes[1].childNodes[3].textContent =
        data.times.tong_saharlik;
      prayList.childNodes[3].childNodes[3].textContent = data.times.quyosh;
      prayList.childNodes[5].childNodes[3].textContent = data.times.peshin;
      prayList.childNodes[7].childNodes[3].textContent = data.times.asr;
      prayList.childNodes[9].childNodes[3].textContent = data.times.shom_iftor;
      prayList.childNodes[11].childNodes[3].textContent = data.times.hufton;
    })
    .catch((err) => console.log(err));
}
prayRender(pray_API);

let prayFragment = document.createDocumentFragment();

function prayWeekly(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        prayListWeekly.innerHTML = "";
        let clonePrayTemplate = prayTemplate.cloneNode(true);
        clonePrayTemplate.querySelector(".pray-weekday").textContent =
          item.weekday;
        clonePrayTemplate.querySelector(".pray-date").textContent =
          item.date.split(", ")[0];
        clonePrayTemplate.querySelector(
          ".pray-sahar"
        ).textContent = `Bomdod: ${item.times.tong_saharlik}`;
        clonePrayTemplate.querySelector(
          ".pray-quyosh"
        ).textContent = `Quyosh: ${item.times.quyosh}`;
        clonePrayTemplate.querySelector(
          ".pray-peshin"
        ).textContent = `Peshin: ${item.times.peshin}`;
        clonePrayTemplate.querySelector(
          ".pray-asr"
        ).textContent = `Shom: ${item.times.asr}`;
        clonePrayTemplate.querySelector(
          ".pray-shom"
        ).textContent = `Shom: ${item.times.shom_iftor}`;
        clonePrayTemplate.querySelector(
          ".pray-hufton"
        ).textContent = `Hufton: ${item.times.hufton}`;

        prayFragment.appendChild(clonePrayTemplate);
      });
      prayListWeekly.appendChild(prayFragment);
    })
    .catch((err) => console.log(err));
}

prayDailyBtn.addEventListener("click", () => {
  prayListWeekly.classList.add("d-none");
  prayList.classList.remove("d-none");
  prayLocationResult.textContent = "Region: Toshkent";
  prayLocationSelect.value = "Toshkent";
  prayRender(pray_API);
});

prayWeeklyBtn.addEventListener("click", () => {
  prayListWeekly.classList.remove("d-none");
  prayList.classList.add("d-none");
  prayLocationResult.textContent = "Region: Toshkent";
  prayLocationSelect.value = "Toshkent";
  prayWeekly(pray_API_weekly);
});

prayLocationSelect.addEventListener("change", () => {
  prayRender(
    `https://islomapi.uz/api/present/day?region=${prayLocationSelect.value}`
  );
  prayWeekly(
    `https://islomapi.uz/api/present/week?region=${prayLocationSelect.value}`
  );
  prayLocationResult.textContent = `Region: ${prayLocationSelect.value}`;
});
