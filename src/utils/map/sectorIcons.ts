import L from "leaflet";

const sectors = [
  "Государственное управление",
  "Финансы",
  "Цифровизация",
  "Социальная сфера",
  "Социальное жилье и ипотека",
  "Социальные обеспечения",
  "Здравоохранение",
  "Образование",
  "Охрана окружающей среды и климат",
  "Охрана окружающей среды и экология",
  "Климат",
  "Инфраструктура и ресурсы",
  "Инфраструктура",
  "Водоснабжение",
  "Канализация и твердые бытовые отходы",
  "Энергетика",
  "Транспорт и логистика",
  "Транспорт",
  "Торгово-логистический центр",
  "Связь и телекоммуникации",
  "Сельское хозяйство и ирригация",
  "Сельское хозяйство",
  "Ирригация",
  "Чрезвычайная ситуация",
  "Много секторов",
];

export const sectorIcons: { [key: string]: L.Icon } = {};

sectors.forEach((sector) => {
  const encoded = encodeURIComponent(sector);
  sectorIcons[sector] = new L.Icon({
    iconUrl: `/assets/images/icons/map/markers/${encoded}.png`,
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
});
