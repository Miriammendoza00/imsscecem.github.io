function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET','Form.jpeg', true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad = null;

window.addEventListener('load', async () => {

    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    signaturePad = new SignaturePad(canvas, {});

    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();


		//LLamar las variables del index
    	
        let curso = document.getElementById('curso').value;
        let nombres = document.getElementById('nombre').value;
        let apellidos = document.getElementById('apellido').value;
        let email = document.getElementById('curp').value;
        let direccion = document.getElementById('fecha de nacimiento').value;
        let telefono = document.getElementById('telefono').value;
		let celular =
		document.getElementById('celular').value;
		let nss =
		document.getElementById('nss').value;
		let domi =
	    document.getElementById('domi').value;
		let calle =
		document.getElementById('calle').value;
		let trabajo =
		document.getElementById('trabajo').value;
		let acci =
		document.getElementById('acci').value;
		let num =
		document.getElementById('num').value;
		let servi =
		document.getElementById('servi').value;
        let hijos = document.querySelector('input[name="hijos"]:checked').value;
        
		// meter variable nombre del id
		
        generatePDF(curso, nombres, apellidos, email, direccion, telefono, celular, nss , domi, calle, trabajo, acci, num, hijos, servi);
        alert("exito")
    })

});


async function generatePDF(curso, nombres, apellidos, email, direccion, telefono, celular, nss,domi, calle, trabajo, acci , num, hijos, servi) {
    const image = await loadImage("Form.jpeg");
    const signatureImage = signaturePad.toDataURL();

    const pdf = new jsPDF('p', 'pt', 'letter');

    pdf.addImage(image, 'PNG', 0, 0, 565, 792);
    pdf.addImage(signatureImage, 'PNG', 200, 605, 300, 60);
	
	//seleccion parametros de curso

    pdf.setFontSize(12);
    pdf.text(curso, 260, 715);
	pdf.text(servi,260, 425);
	
	

    const date = new Date();
    pdf.text(date.getUTCDate().toString(), 235, 150);
    pdf.text((date.getUTCMonth() + 1).toString(), 275, 150);
    pdf.text(date.getUTCFullYear().toString(), 320, 150);


// Parametros de ubicacion en pdf

    pdf.setFontSize(10);
    pdf.text(nombres, 170, 290);
    pdf.text(apellidos, 175, 320);
    pdf.text(direccion, 180, 368);
    pdf.text(telefono, 400, 395);
	pdf.text(celular, 170, 395);
	pdf.text(email, 180, 345); 
	pdf.text(nss, 350, 478);
	pdf.text(domi,190, 500);
	pdf.text(calle, 170, 550);
	pdf.text(trabajo, 145, 635);
	pdf.text(acci, 280, 660);
	pdf.text(num, 160, 689);

    pdf.setFillColor(0,0,0);

    if (parseInt(hijos) === 1) {
        //Mujer
        pdf.circle(380, 374, 4, 'FD');
    } else {
        //Hombre
        pdf.circle(425, 374, 4, 'FD');
    }




    pdf.save("example.pdf");

}