const data = [
  {
    title: 'test 1',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum rem facere earum. Tenetur ipsa, repudiandae voluptate magnam totam voluptas velit dolores? Repudiandae ad porro rerum nostrum cum ipsa id!'
  },
  {
    title: 'test 2',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum rem facere earum. Tenetur ipsa, repudiandae voluptate magnam totam voluptas velit dolores? Repudiandae ad porro rerum nostrum cum ipsa id!'
  },
  {
    title: 'test 3',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum rem facere earum. Tenetur ipsa, repudiandae voluptate magnam totam voluptas velit dolores? Repudiandae ad porro rerum nostrum cum ipsa id!'
  },
  {
    title: 'test 4',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum rem facere earum. Tenetur ipsa, repudiandae voluptate magnam totam voluptas velit dolores? Repudiandae ad porro rerum nostrum cum ipsa id!'
  },
  {
    title: 'test 5',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum rem facere earum. Tenetur ipsa, repudiandae voluptate magnam totam voluptas velit dolores? Repudiandae ad porro rerum nostrum cum ipsa id!'
  },
  {
    title: 'test 6',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum rem facere earum. Tenetur ipsa, repudiandae voluptate magnam totam voluptas velit dolores? Repudiandae ad porro rerum nostrum cum ipsa id!'
  },
  {
    title: 'test 7',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum rem facere earum. Tenetur ipsa, repudiandae voluptate magnam totam voluptas velit dolores? Repudiandae ad porro rerum nostrum cum ipsa id!'
  },
  {
    title: 'test 8',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum rem facere earum. Tenetur ipsa, repudiandae voluptate magnam totam voluptas velit dolores? Repudiandae ad porro rerum nostrum cum ipsa id!'
  },
  {
    title: 'test 9',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum rem facere earum. Tenetur ipsa, repudiandae voluptate magnam totam voluptas velit dolores? Repudiandae ad porro rerum nostrum cum ipsa id!'
  },
  {
    title: 'test 10',
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum rem facere earum. Tenetur ipsa, repudiandae voluptate magnam totam voluptas velit dolores? Repudiandae ad porro rerum nostrum cum ipsa id!'
  },
]



const leftArrow = document.querySelector('#left-arrow');
const rightArrow = document.querySelector('#right-arrow');
const cardContainer = document.querySelector('#card-container');

// Variabel untuk posisi slider
let currentPosition = 0;
let cardWidth = 305; // Lebar kartu
let gap = 5; // Jarak antar kartu
const containerVisibleWidth = cardContainer.offsetWidth; // Lebar kontainer yang terlihat
let totalCards = data.length; // Total kartu


// Fungsi untuk menghitung ulang ukuran kontainer yang terlihat
const calculateVisibleWidth = () => {
  // containerVisibleWidth = cardContainer.offsetWidth;

  // Sesuaikan lebar kartu tergantung pada media query
  if (window.innerWidth <= 480) {
    cardWidth = containerVisibleWidth ; // 1 kartu di layar kecil (mobile)
    gap = 10
    totalCards = data.length - 1
  } else if (window.innerWidth <= 768) {
    cardWidth = containerVisibleWidth / 2 - gap; // 2 kartu di layar tablet
  } else {
    cardWidth = 305; // Default 3 kartu atau lebih di desktop
  }
};


window.addEventListener('DOMContentLoaded', (event) => {
  cardContainer.innerHTML = "";

  data.map((e)=> {
    cardContainer.innerHTML += `
      <div class="card">
        <h1>${e.title}</h1>
        <p>${e.text}</p>
      </div>
    `
  })

   // Menghitung lebar kontainer yang terlihat
   calculateVisibleWidth();

    // Mengatur tampilan panah kiri (sembunyi di awal)
  leftArrow.style.display = 'none';
});

const updateArrowVisibility = () => {
  const maxPosition = (cardWidth + gap) * totalCards - containerVisibleWidth;

  // Tampilkan/hilangkan panah berdasarkan posisi slider
  if (currentPosition <= -maxPosition) {
    rightArrow.style.display = 'none';
  } else {
    rightArrow.style.display = 'flex';
  }

  if (currentPosition >= 0) {
    leftArrow.style.display = 'none';
  } else {
    leftArrow.style.display = 'flex';
  }
};


rightArrow.addEventListener('click', () => {
  const maxPosition = (cardWidth + gap) * totalCards - containerVisibleWidth;
  if (currentPosition > -maxPosition) {
    currentPosition -= cardWidth + gap;
    cardContainer.style.transform = `translateX(${currentPosition}px)`;
  }
  updateArrowVisibility();
  console.log(cardWidth,maxPosition,containerVisibleWidth,currentPosition);
  
});


leftArrow.addEventListener('click',()=>{
  // if (currentPosition === 0 || currentPosition > 0) {
  //   leftArrow.style.display = 'none';
  // } else {
  //   leftArrow.style.display = 'flex';
  //   currentPosition += cardWidth + gap;
  //   cardContainer.style.transform = `translateX(${currentPosition}px)`;
  // }
  if (currentPosition < 0) {
    currentPosition += cardWidth + gap;
    cardContainer.style.transform = `translateX(${currentPosition}px)`;
  }
  updateArrowVisibility();
  console.log(cardWidth,containerVisibleWidth,currentPosition);
  
})

// Memperbarui ukuran kartu saat ukuran layar berubah
window.addEventListener('resize', () => {
  calculateVisibleWidth(); // Hitung ulang lebar yang terlihat
  currentPosition = 0; // Reset posisi slider
  cardContainer.style.transform = `translateX(0px)`; // Reset posisi visual
  updateArrowVisibility();
});