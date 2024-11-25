const consultations = [
  { id: 1, title: 'مشاوره 1', description: 'توضیحات مشاوره 1', status: 'منتظر پاسخ', userMessages: [] },
  { id: 2, title: 'مشاوره 2', description: 'توضیحات مشاوره 2', status: 'منتظر پاسخ', userMessages: [] },
];

const finalizedConsultations = [];

const products = [
  { id: 1, name: 'محصول 1', description: 'برای استفاده روزانه', usage: 'روزی دو بار', price: 50000 },
  { id: 2, name: 'محصول 2', description: 'برای سلامت پوست', usage: 'هر شب قبل خواب', price: 70000 },
];

let selectedConsultation = null;
let selectedProducts = [];

// نمایش تاریخ
function showCurrentDate() {
  const dateElement = document.getElementById('currentDate');
  dateElement.textContent = `تاریخ: ${new Date().toLocaleDateString('fa-IR')}`;
}

// نمایش لیست مشاوره‌ها
function loadConsultations() {
  const consultationList = document.getElementById('consultationList');
  consultationList.innerHTML = consultations
    .map(
      (consultation) =>
        `<li onclick="selectConsultation(${consultation.id})" class="${consultation.status === 'نهایی‌شده' ? 'finalized' : ''}">
          ${consultation.title} - وضعیت: ${consultation.status}
        </li>`
    )
    .join('');

  const finalizedList = document.getElementById('finalizedConsultationList');
  finalizedList.innerHTML = finalizedConsultations
    .map((consultation) => `<li>${consultation.title} - وضعیت: ${consultation.status}</li>`)
    .join('');
}

// انتخاب مشاوره
function selectConsultation(consultationId) {
  selectedConsultation = consultations.find((c) => c.id === consultationId);
  document.getElementById('consultationTitle').textContent = `مشاوره: ${selectedConsultation.title}`;
  document.getElementById('consultationDescription').textContent = selectedConsultation.description;
}

// نمایش محصولات
function loadProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = products
    .map(
      (product) =>
        `<li>
          <label for="product-${product.id}">
            ${product.name} - ${product.price.toLocaleString()} تومان
          </label>
          <input type="checkbox" id="product-${product.id}" value="${product.id}" onchange="toggleProduct(${product.id})">
        </li>`
    )
    .join('');
}

// مدیریت انتخاب محصولات
function toggleProduct(productId) {
  const product = products.find((p) => p.id === productId);
  const exists = selectedProducts.some((p) => p.id === productId);

  if (exists) {
    selectedProducts = selectedProducts.filter((p) => p.id !== productId);
  } else {
    selectedProducts.push(product);
  }

  updatePrescription();
}

// به‌روزرسانی نسخه
function updatePrescription() {
  const prescriptionBody = document.getElementById('prescriptionBody');
  const totalCost = document.getElementById('totalCost');

  prescriptionBody.innerHTML = selectedProducts
    .map(
      (product, index) =>
        `<tr>
          <td>${index + 1}</td>
          <td>${selectedConsultation ? selectedConsultation.title : '---'}</td>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${product.usage}</td>
          <td>1</td>
        </tr>`
    )
    .join('');

  const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  totalCost.textContent = `مجموع: ${total.toLocaleString()} تومان`;
}

// نهایی‌سازی مشاوره
document.getElementById('finalizeConsultationButton').addEventListener('click', () => {
  if (!selectedConsultation) {
    alert('لطفاً یک مشاوره انتخاب کنید!');
    return;
  }

  selectedConsultation.status = 'نهایی‌شده';
  finalizedConsultations.push(selectedConsultation);
  consultations.splice(consultations.indexOf(selectedConsultation), 1);
  alert(`مشاوره "${selectedConsultation.title}" به وضعیت "نهایی‌شده" تغییر کرد.`);
  selectedConsultation = null;
  selectedProducts = [];
  loadConsultations();
});

// بارگذاری اولیه
document.addEventListener('DOMContentLoaded', () => {
  showCurrentDate();
  loadConsultations();
  loadProducts();
});



// مدیریت چت
function loadChat() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = selectedConsultation.userMessages
    .map(
      (msg) =>
        `<div class="message ${msg.sender === 'admin' ? 'admin' : 'user'}">${msg.text}</div>`
    )
    .join('');
}

document.getElementById('sendMessageButton').addEventListener('click', () => {
  const messageInput = document.getElementById('adminMessage');
  const message = messageInput.value.trim();
  if (!message) return;

  selectedConsultation.userMessages.push({ sender: 'admin', text: message });
  messageInput.value = '';
  loadChat();
});


