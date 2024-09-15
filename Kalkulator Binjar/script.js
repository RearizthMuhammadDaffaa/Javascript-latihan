const data = [
  {
    id:0,
    kecamatan : 'cimalaka',
    desa : [
      'Cimalaka',
      'Cibeureum Kulon',
      'Cibeureum Wetan',
      'Cimuja',
      'Cikole',
      'Citimun',
      'Galudra',
    ],
    radius:5.5,
    harga:30000
  },
  {
    id:1,
    kecamatan : 'Sumedang Selatan',
    desa : [
      'Baginda',
      'Cihiherang',
      'Cipancar',
      'Gunung Sari',
      'Kotakulon',
    ],
    radius:1.5,
    harga:10000
  },
  {
    id:2,
    kecamatan : 'Paseh',
    desa : [
      'Bongkok',
      'Cijambe',
      'Citepok',
      'Haurkuning',
      'Legok Kaler',
    ],
    radius:7.5,
    harga:50000
  },
]






const penggugat_kec = document.querySelector('#penggugat-kec');
const penggugat_des = document.querySelector('#penggugat-des');
const namaPenggugat = document.querySelector('#namaPenggugat');
const tergugat_kec = document.querySelector('#tergugat-kec');
const tergugat_des = document.querySelector('#tergugat-des');
const namaTergugat = document.querySelector('#namaTergugat');

const harga = document.querySelector('.harga');

let radiusPenggugat = 0;
let radiusTergugat = 0;

const updateHarga = () => {
  const maxRadius = Math.max(radiusPenggugat, radiusTergugat);
  const kecamatanWithMaxRadius = data.find(kec => kec.radius === maxRadius);
  if (kecamatanWithMaxRadius) {
    harga.textContent = kecamatanWithMaxRadius.harga;
  }
};

namaPenggugat.addEventListener('input' , (e)=>{
  console.log(e.target.value);
  
})



window.addEventListener('DOMContentLoaded', (event) => {
  data.map((kec,i)=> {
    const optionKec = document.createElement('option');
    const optionKec_Ter = document.createElement('option');
   
    optionKec.setAttribute('data-kecamatan',kec.id);
    optionKec.setAttribute('value',kec.kecamatan); 
    optionKec.textContent = kec.kecamatan;
    optionKec_Ter.setAttribute('data-kecamatan',kec.id);
    optionKec_Ter.setAttribute('value',kec.kecamatan); 
    optionKec_Ter.textContent = kec.kecamatan;
    penggugat_kec.appendChild(optionKec);
    tergugat_kec.appendChild(optionKec_Ter);
    //  penggugat_kec.innerHTML += `<option data-kecamatan=${kec.kecamatan} value=${kec.kecamatan}>${kec.kecamatan}</option>`;
     
  });
  
  const defaultKecamatan = data[0].kecamatan;
  penggugat_kec.value = defaultKecamatan;
  tergugat_kec.value = defaultKecamatan;

  data.forEach((kec,i) => {
    if (defaultKecamatan === kec.kecamatan ) {
      kec.desa.forEach(element => {
        const optionDes = document.createElement('option');
        optionDes.setAttribute('value', element);
        optionDes.textContent = element;
        const optionDesTer = document.createElement('option');
        optionDesTer.setAttribute('value', element);
        optionDesTer.textContent = element;
        penggugat_des.appendChild(optionDes);
        tergugat_des.appendChild(optionDesTer);
      });
      radiusPenggugat = data[i].radius;
      radiusTergugat = data[i].radius;
      updateHarga();
    }
  }); 
});

tergugat_kec.addEventListener('change',(e)=>{
  const selectedOption = e.target.selectedOptions[0]; 
  const selectedKec = selectedOption.getAttribute('data-kecamatan'); 
  tergugat_des.innerHTML = ''; 
  for (let i = 0; i < data.length; i++) {
    if(selectedKec == data[i].id){
      data[i].desa.forEach(element => {
        tergugat_des.innerHTML += `<option value=${element}>${element}</option>`;
        
         
      });
      radiusTergugat = data[i].radius;
      updateHarga();
     }
  }
})





penggugat_kec.addEventListener('change',(e)=>{
  const selectedOption = e.target.selectedOptions[0]; // Mendapatkan opsi yang dipilih
const selectedKec = selectedOption.getAttribute('data-kecamatan'); // Mendapatkan atribut data-id dari opsi yang dipilih

  penggugat_des.innerHTML = ''; 
  for (let i = 0; i < data.length; i++) {
    if(selectedKec == data[i].id){
      data[i].desa.forEach(element => {
        penggugat_des.innerHTML += `<option value=${element}>${element}</option>`;
        
         
      });
      radiusPenggugat = data[i].radius;
      updateHarga();
     }
  }
  
})

const submit = document.querySelector('#submit')


submit.addEventListener('click',async ()=>{
  const namaPenggugatValue = namaPenggugat.value || "Nama Penggugat";
  const namaTergugatValue = namaTergugat.value || "Nama Tergugat";
  const penggugat_kecValue = penggugat_kec.value || "Kecamatan";
  const tergugat_kecValue = tergugat_kec.value || "Kecamatan";
  const penggugat_desValue = penggugat_des.value || "Desa";
  const tergugat_desValue = tergugat_des.value || "Desa";
  const url = 'test.pdf'
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
// Membuat dokumen PDF baru
// const pdfDoc = await PDFLib.PDFDocument.create();
const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
    
// Menambahkan halaman baru ke dokumen
// const page = pdfDoc.addPage([600, 400]);
const page = pdfDoc.getPages();
const firstPage = page[0]
let y = 760;
let increment_y = 15;
// Menambahkan teks ke halaman
firstPage.drawText(`${namaPenggugatValue}`, {
    x: 300,
    y: y,
    size: 10,
});
y -= increment_y;
firstPage.drawText(`${namaTergugatValue}`, {
    x: 300,
    y: y,
    size: 10,
});
y -= increment_y;
firstPage.drawText(`${penggugat_kecValue}`, {
    x: 300,
    y: y,
    size: 10,
});
y -= increment_y;
firstPage.drawText(`${tergugat_kecValue}`, {
    x: 300,
    y: y+1,
    size: 10,
});
y -= increment_y;
firstPage.drawText(`${penggugat_desValue}`, {
    x: 300,
    y: y+2,
    size: 10,
});
y -= increment_y;
firstPage.drawText(`${tergugat_desValue}`, {
    x: 300,
    y: y+2,
    size: 10,
});


// Mengubah dokumen PDF menjadi file byte array
const pdfBytes = await pdfDoc.save();

// Membuat link untuk mendownload file PDF
const blob = new Blob([pdfBytes], { type: 'application/pdf' });
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'result.pdf';
link.click();
})
