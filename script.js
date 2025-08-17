// 50 Men + 50 Women (demo): Generate random item names, shuffle products, use Unsplash for realism.
// We'll use 25 unique images per section, repeated once, with randomized order.

function getRandomName(gender, i) {
  const base = gender === "men" ? [
    "Classic Tee", "Modern Crew", "Minimal Hoodie", "Essential Jogger", "Stone Chinos",
    "Relaxed Polo", "Urban Shirt", "Taupe Sweat", "Black Denim", "Textured Henley",
    "Layered Zip", "Casual Shorts", "Neutral Vest", "Slate Tracks", "Edge Jacket",
    "Cloud Pullover", "Cotton Bomber", "Oat Blazer", "Street Longsleeve", "Slate Tank",
    "Lowkey Cardigan", "Subtle Plaid", "Everyday Polo", "Ice Quarterzip", "Simple Flannel"
  ] : [
    "Airy Linen Top", "Chic Midi Dress", "Crew Neck Knit", "Pebble Pants", "Minimalist Jacket",
    "Pleated Skirt", "Olive Shirt", "Stone Kimono", "Soft Blouse", "Classic Cami",
    "Beige Cardigan", "Cotton Dress", "Pebble Tunic", "Urban Crop", "Cloud Legging",
    "Easy Maxi", "Ribbed Sweater", "Relaxed Jumpsuit", "Simple Wrap", "Slouch Tee",
    "Sable Pullover", "Layered Tank", "Textured Blouse", "Subtle Skirt", "Modern Trench"
  ];
  return `${base[i % base.length]} ${i < base.length ? "" : "#"+(Math.floor(i/base.length)+1)}`;
}

const menImages = [
  "photo-1512436991641-6745cdb1723f",
  "photo-1517841905240-472988babdf9",
  "photo-1503342217505-b0a15ec3261c",
  "photo-1529626455594-4ff0802cfb7e",
  "photo-1519125323398-675f0ddb6308",
  "photo-1526178613658-3e83fae8b96e",
  "photo-1524253482453-3fed8d2fe12b",
  "photo-1465101046530-73398c7f28ca",
  "photo-1475189778702-5ec9941484ae",
  "photo-1512436991641-6745cdb1723f",
  "photo-1464983953574-0892a716854b",
  "photo-1469398715555-cbcabfb4d8b9",
  "photo-1516035069371-29a1b244cc32",
  "photo-1454023492550-5696f8ff10e1",
  "photo-1517260911058-0fcfd733702f",
  "photo-1530847886849-ab9c7d8da3f2",
  "photo-1520813792240-56fc4a3765a7",
  "photo-1526178613658-3e83fae8b96e",
  "photo-1512428559087-560fa5ceab42",
  "photo-1514412076817-2bf33e148d88",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1515378791036-0648a3ef77b2",
  "photo-1464983953574-0892a716854b",
  "photo-1530847886849-ab9c7d8da3f2",
  "photo-1520813792240-56fc4a3765a7"
];
const womenImages = [
  "photo-1515378791036-0648a3ef77b2",
  "photo-1506744038136-46273834b3fb",
  "photo-1469398715555-cbcabfb4d8b9",
  "photo-1517260911058-0fcfd733702f",
  "photo-1519681393784-d120267933ba",
  "photo-1513129231964-4b01e04b9e2c",
  "photo-1516035069371-29a1b244cc32",
  "photo-1502082553048-f009c37129b9",
  "photo-1517841905240-472988babdf9",
  "photo-1514412076817-2bf33e148d88",
  "photo-1465101046530-73398c7f28ca",
  "photo-1464983953574-0892a716854b",
  "photo-1503342217505-b0a15ec3261c",
  "photo-1454023492550-5696f8ff10e1",
  "photo-1530847886849-ab9c7d8da3f2",
  "photo-1524253482453-3fed8d2fe12b",
  "photo-1519125323398-675f0ddb6308",
  "photo-1512436991641-6745cdb1723f",
  "photo-1520813792240-56fc4a3765a7",
  "photo-1526178613658-3e83fae8b96e",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1465101046530-73398c7f28ca",
  "photo-1475189778702-5ec9941484ae",
  "photo-1506744038136-46273834b3fb",
  "photo-1469398715555-cbcabfb4d8b9"
];

// Generate random INR price between 899 and 2499
function randomPrice() { return "₹" + (Math.floor(Math.random()*17)*100 + 899); }

function genProducts(gender) {
  const imArr = gender === "men" ? menImages : womenImages;
  let arr = [];
  for (let i=0; i<50; ++i) {
    const name = getRandomName(gender, i);
    const imgId = imArr[i % imArr.length];
    const image = `https://images.unsplash.com/${imgId}?auto=format&fit=crop&w=400&q=80`;
    arr.push({
      name,
      image,
      desc: gender==="men" ? "Modern neutral, comfortable fit." : "Minimal + versatile, premium material.",
      price: randomPrice()
    });
  }
  // shuffle array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
const menProducts = genProducts("men");
const womenProducts = genProducts("women");

// --- Cart Logic
let cartCount = 0;
function incrementCart() {
  cartCount++;
  document.getElementById("cart-count").textContent = cartCount;
}

// --- Size modal
function showSizeModal() {
  document.getElementById("size-modal").style.display = "flex";
}
function hideSizeModal() {
  document.getElementById("size-modal").style.display = "none";
}

function sizesSelectHtml() {
  return `<div class="size-select-row">
    <select class="select-size" required>
      <option value="">Size</option>
      <option>S</option><option>M</option><option>L</option><option>XL</option>
    </select>
    <button type="button" class="size-chart-link" tabindex="0">Size Chart</button>
  </div>`;
}

function populateProducts(productArray, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  productArray.forEach((prod, idx) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" loading="lazy">
      <h3>${prod.name}</h3>
      <p>${prod.desc}</p>
      <div class="price">${prod.price}</div>
      <div class="card-row">
        ${sizesSelectHtml()}      
        <button class="add-cart-btn">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);

    // Event listeners for this card:
    // Size chart modal
    card.querySelector('.size-chart-link').onclick = showSizeModal;
    // Add to cart
    card.querySelector('.add-cart-btn').onclick = function() {
      const selSize = card.querySelector('.select-size');
      if (!selSize.value) {
        selSize.style.borderColor = "#e56d6d";
        selSize.focus();
        setTimeout(()=>selSize.style.borderColor="#dedede",800);
        return;
      }
      incrementCart();
      this.textContent = "Added!";
      setTimeout(()=>this.textContent = "Add to Cart",950);
    };
  });
}

// Nav: scroll and highlight
document.addEventListener('DOMContentLoaded', () => {
  populateProducts(menProducts, 'men-products');
  populateProducts(womenProducts, 'women-products');

  // Size chart modal
  document.getElementById("close-size-modal").onclick = hideSizeModal;
  document.getElementById("size-modal").onclick = function(e) {
    if (e.target === this) hideSizeModal();
  };

  // Contact Form handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      document.getElementById('formMessage').textContent = "Thank you, we'll get back to you soon.";
      contactForm.reset();
    });
  }
});
