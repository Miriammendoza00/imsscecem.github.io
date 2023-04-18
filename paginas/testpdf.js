
const button = document.getElementById("buttonUno")
console.log(button)

button.addEventListener("click", () => {
    exportpdf()
})
const exportpdf = () => {

    alert("PDF generado");
    var pdf = new jsPDF();
    pdf.text(15, 100, "NOMBRE COMPLETO: ");
    pdf.save('a4.pdf');
}