const FORM = document.querySelector("form")
const INPUT = document.querySelector("input[type='text']")

FORM.addEventListener("submit", (e) => {
  // Get the input element & searched number
  e.preventDefault()
  const inputElement = document.querySelector("input[type='file']")
  const searchedNumber = INPUT.value.toUpperCase()

  // Get result display elements
  const explanation = document.querySelector("[data-explanation]")

  // Check if a file has been uploaded
  if (inputElement.files.length > 0 && INPUT.value.length > 0) {
    const file = inputElement.files[0]
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = function (e) {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: "array" })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      const result = jsonData.find((item) => item.Name === searchedNumber)
      explanation.style.display = "none"

      const resultElement = document.createElement("h1")
      resultElement.classList.add(
        "slide-in-element",
        "slide-in-element",
        "text-xl",
        "mt-6",
        "text-center",
      )

      resultElement.innerHTML = result
        ? `<b>${result.Name}</b> - номер найден ✅`
        : `<b>${searchedNumber}</b> - номер не найден ❌`

      INPUT.value = ""
      document.body.append(resultElement)
    }
  } else if (!inputElement.files.length) {
    alert("Сначала загрузите файл.")
  } else {
    alert("Текстовое поле не должно быть пустым.")
  }
})
