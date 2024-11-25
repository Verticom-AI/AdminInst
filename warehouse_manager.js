// داده‌های نمونه سفارشات
const orders = [
    {
      id: 1,
      consultationTitle: 'مشاوره 1',
      products: ['محصول 1', 'محصول 2'],
      customerAddress: 'تهران، خیابان آزادی، پلاک 123',
      status: 'پرداخت شده',
    },
    {
      id: 2,
      consultationTitle: 'مشاوره 2',
      products: ['محصول 3'],
      customerAddress: 'مشهد، خیابان امام رضا، پلاک 45',
      status: 'پرداخت شده',
    },
  ];
  
  // بارگذاری سفارشات پرداخت‌شده
  function loadPaidOrders() {
    const paidOrdersBody = document.getElementById('paidOrdersBody');
    paidOrdersBody.innerHTML = orders
      .filter((order) => order.status === 'پرداخت شده')
      .map(
        (order, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${order.consultationTitle}</td>
            <td>${order.products.join(', ')}</td>
            <td>${order.customerAddress}</td>
            <td>${order.status}</td>
            <td>
              <button onclick="markAsShipped(${order.id})">ارسال</button>
            </td>
          </tr>`
      )
      .join('');
  }
  
  // تغییر وضعیت سفارش به "ارسال شده"
  function markAsShipped(orderId) {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = 'ارسال شده';
      alert(`سفارش با شناسه ${orderId} به وضعیت "ارسال شده" تغییر کرد.`);
      loadPaidOrders();
    }
  }
  
  // بارگذاری اولیه
  document.addEventListener('DOMContentLoaded', loadPaidOrders);
  