import * as XLSX from "xlsx";
import api from "../../api";

export default function TaskUpload() {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    await api.post("/tasks/bulk-upload", { tasks: rows });
    alert("Tasks uploaded successfully");
  };

  return (
    <div>
      <h3>Upload Bulk Tasks</h3>
      <input type="file" accept=".xlsx,.csv" onChange={handleFile} />
    </div>
  );
}
