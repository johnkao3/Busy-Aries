export function exportFileCSV(title: any[], data: any[], fileName = null) {
  return new Promise((resolve, reject) => {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      let name = `${year}年${month}月${day}日`;
      if (fileName) {
        name = fileName;
      }
      const csvData = [title, ...data];
      console.log(csvData);
      const csvContent = csvData.map((e) => e.join(",")).join("\n");
      const encodedUri = URL.createObjectURL(
        new Blob([`\uFEFF${csvContent}`], {
          type: "text/csv;charset=utf-8;",
        })
      );
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${name}.csv`);
      document.body.appendChild(link); // Required for FF

      link.click();
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
}
