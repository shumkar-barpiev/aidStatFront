import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface ExcelDataItemProjectCount {
  name: string;
  projectCount: number;
}

interface ExcelDataItemSum {
  name: string;
  totalSum: string;
  grantAmounts: string;
  creditAmounts: string;
}

type ExcelDataItem = ExcelDataItemProjectCount | ExcelDataItemSum;

export const exportToExcel = (
  data: ExcelDataItem[],
  sheetName: string,
  fileName: string
) => {
  if (!data.length) return;

  let mappedData: Record<string, string | number>[] = [];

  if ("projectCount" in data[0]) {
    mappedData = data.map((item: any) => ({
      "Наименование": item.name,
      "Количество проектов": item.projectCount,
    }));
  } else if ("totalSum" in data[0]) {
    mappedData = data.map((item: any) => ({
      "Наименование": item.name,
      "Общая сумма": item.totalSum,
      "Гранты": item.grantAmounts,
      "Кредиты": item.creditAmounts,
    }));
  } else {
    console.warn("Неизвестный формат данных:", data[0]);
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(mappedData);
  worksheet["!cols"] = Array(Object.keys(mappedData[0]).length).fill(null).map((_, i) => ({
    wch: i === 0 ? 40 : 20,
  }));
  worksheet["!rows"] = new Array(mappedData.length + 1).fill({ hpt: 24 });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
};