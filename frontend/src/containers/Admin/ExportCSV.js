import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { message } from "antd";

export const ExportCSV = (csvData, fileName, fileExtension) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const header =
    Boolean(Object.keys(csvData).length) && Object.keys(csvData[0]); // columns name

  const exportToCSV = (csvData, fileName) => {
    if (Boolean(Object.keys(csvData).length)) {
      let wscols = [];
      for (let i = 0; i < header.length; i++) {
        // columns length added
        wscols.push({ wch: csvData[0][header[i]].length + 5 });
      }

      const ws = XLSX.utils.json_to_sheet(csvData);
      const csv = XLSX.utils.sheet_to_csv(ws);

      /* generate a download */
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }

      ws["!cols"] = wscols;
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data =
        fileExtension === ".xlsx"
          ? new Blob([excelBuffer], { type: fileType })
          : new Blob([s2ab(csv)], { type: "application/octet-stream" });
      FileSaver.saveAs(data, fileName + fileExtension);
    } else {
      message.error("Please select at least one row");
    }
  };

  return exportToCSV(csvData, fileName);
};
