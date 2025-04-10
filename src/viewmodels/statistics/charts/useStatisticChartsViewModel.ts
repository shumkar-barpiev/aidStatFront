"use client";

import { useEffect, useState } from "react";

export const useStatisticsChartsViewModel = () => {
  const [cardsData, setCardsData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    setCardsData([
      {
        id: 1,
        title: "Ведущие доноры по сумме инвестиций",
        totalValue: "3.9",
        unit: "млрд USD",
        chartData: [
          { label: "Азиатский Банк Развития", value: "1.3 млрд", color: "#2196f3" },
          { label: "Европейский Банк Реконструкции и Развития", value: "824.8 млн", color: "#03A9F4" },
          { label: "Всемирный банк", value: "332.7 млн", color: "#4caf50" },
          { label: "Международная ассоциация развития (МАР)", value: "274.2 млн", color: "#ff9800" },
          { label: "Исламский банк развития (ИБР)", value: "259.6 млн", color: "#8BC34A" },
          { label: "Другие", value: "894.2 млн", color: "#9e9e9e" },
        ],
      },
      {
        id: 2,
        title: "Ведущие доноры по количеству проектов",
        totalValue: "115",
        unit: "",
        chartData: [
          { label: "Международная ассоциация развития (МАР)", value: "24", color: "#2196f3" },
          { label: "Европейский Банк Реконструкции и Развития", value: "23", color: "#03A9F4" },
          { label: "Азиатский Банк Развития", value: "23", color: "#ff9800" },
          { label: "Саудовский фонд развития", value: "12", color: "#ffc107" },
          { label: "Всемирный банк", value: "10", color: "#4caf50" },
          { label: "Другие", value: "37", color: "#9e9e9e" },
        ],
      },
      {
        id: 3,
        title: "Ведущие регионы по сумме инвестиций",
        totalValue: "3.9",
        unit: "млрд USD",
        chartData: [
          { label: "Джалал-Абадская Область", value: "1.3 млрд", color: "#2196f3" },
          { label: "Нарынская Область", value: "736 млн", color: "#f57c00" },
          { label: "Ошская Область", value: "684.7 млн", color: "#ffc107" },
          { label: "Иссык-Кульская Область", value: "522.3 млн", color: "#4caf50" },
          { label: "Другие", value: "2 млрд", color: "#9e9e9e" },
        ],
      },
      {
        id: 4,
        title: "Ведущие регионы по количеству проектов",
        totalValue: "115",
        unit: "",
        chartData: [
          { label: "Ошская Область", value: "23", color: "#03A9F4" },
          { label: "Джалал-Абадская Область", value: "21", color: "#ff9800" },
          { label: "Иссык-Кульская Область", value: "19", color: "#ffc107" },
          { label: "Баткенская Область", value: "18", color: "#4caf50" },
          { label: "Другие", value: "77", color: "#9e9e9e" },
        ],
      },
      {
        id: 5,
        title: "Ведущие секторы по сумме инвестиций",
        totalValue: "3.9",
        unit: "млрд USD",
        chartData: [
          { label: "Транспорт", value: "1.2 млрд", color: "#2196f3" },
          { label: "Водоснабжение", value: "872.9 млн", color: "#03A9F4" },
          { label: "Государственное управление", value: "589.7 млн", color: "#ff9800" },
          { label: "Энергетика", value: "314 млн", color: "#ffc107" },
          { label: "Сельское хозяйство", value: "185 млн", color: "#4caf50" },
          { label: "Другие", value: "837.1 млн", color: "#9e9e9e" },
        ],
      },
      {
        id: 6,
        title: "Ведущие секторы по количеству проектов",
        totalValue: "115",
        unit: "",
        chartData: [
          { label: "Транспорт", value: "30", color: "#2196f3" },
          { label: "Водоснабжение", value: "25", color: "#03A9F4" },
          { label: "Государственное управление", value: "15", color: "#ff9800" },
          { label: "Энергетика", value: "20", color: "#ffc107" },
          { label: "Сельское хозяйство", value: "10", color: "#4caf50" },
          { label: "Другие", value: "15", color: "#9e9e9e" },
        ],
      },
      {
        id: 7,
        title: "Ведущие реализующие агентства по количеству проектов",
        totalValue: "115",
        unit: "",
        chartData: [
          { label: "Министерство транспорта и коммуникаций Кыргызской Республики", value: "19", color: "#2196f3" },
          { label: "Министерство Энергетики Кыргызской Республики", value: "14", color: "#03A9F4" },
          { label: "Министерство Здравоохранения Кыргызской Республики", value: "10", color: "#ff9800" },
          {
            label:
              "Служба водных ресурсов при Министерстве водных ресурсов, сельского хозяйства  перерабатывающей промышленности Кыргызской Республики",
            value: "9",
            color: "#ffc107",
          },
          { label: "ГУ «Развитие питьевого водоснабжения»", value: "9", color: "#4caf50" },
          { label: "Другие", value: "55", color: "#9e9e9e" },
        ],
      },
      {
        id: 8,
        title: "Ведущие исполнительные агентства по количеству проектов",
        totalValue: "115",
        unit: "",
        chartData: [
          { label: "Министерство транспорта и коммуникаций Кыргызской Республики", value: "19", color: "#2196f3" },
          { label: "Министерство Энергетики Кыргызской Республики", value: "14", color: "#03A9F4" },
          { label: "Министерство Здравоохранения Кыргызской Республики", value: "10", color: "#ff9800" },
          {
            label:
              "Служба водных ресурсов при Министерстве водных ресурсов, сельского хозяйства  перерабатывающей промышленности Кыргызской Республики",
            value: "9",
            color: "#ffc107",
          },
          { label: "ГУ «Развитие питьевого водоснабжения»", value: "9", color: "#4caf50" },
          { label: "Другие", value: "55", color: "#9e9e9e" },
        ],
      },
    ]);
  }, []);

  return {
    cardsData,
  };
};
