

export default function BtnCnpjBase() {
  return (
    <div className={`flex mt-4 gap-4`}>
      <input
        accept=".csv"
        id="upload"
        type="file"
        onchange="handleFiles(this.files)"
      />
    </div>
  )
}