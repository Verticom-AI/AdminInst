// انتخاب عناصر مورد نیاز
const menuIcon = document.getElementById('menuIcon');
const sideMenu = document.getElementById('sideMenu');
const themeToggle = document.getElementById('themeToggle');

// مدیریت منوی کناری
menuIcon.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});
// بسته شدن منو هنگام کلیک در خارج از منو

document.addEventListener('click', (e) => {
  if (!sideMenu.contains(e.target) && !menuIcon.contains(e.target)) {
    sideMenu.classList.remove('open');
  }
});

// مدیریت تم
themeToggle.addEventListener('click', () => {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
});
// اعمال تم ذخیره‌شده هنگام بارگذاری صفحه

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});

// بررسی وضعیت لاگین
function checkLoginStatus() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// وقتی کاربر لاگین می‌کند (برای نمونه)
function loginUser() {
  localStorage.setItem('isLoggedIn', 'true');
  alert('شما با موفقیت وارد شدید.');
}

// وقتی کاربر لاگین نشده است
function redirectToLogin() {
  alert('لطفاً ابتدا وارد شوید.');
  window.location.href = 'login.html'; // آدرس صفحه لاگین
}

// نمایش فرم مشاوره تخصصی
function showConsultationForm() {
  document.getElementById('specialConsultationForm').style.display = 'block';
}

// مدیریت کلیک روی دکمه درخواست مشاوره تخصصی
document.getElementById('requestConsultation').addEventListener('click', () => {
  if (checkLoginStatus()) {
    showConsultationForm();
  } else {
    redirectToLogin();
  }
});
