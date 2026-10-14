/* ==========================================================================
   DOCTOR PET - PHÒNG KHÁM THÚ Y CHUẨN Y KHOA
   Main Interactive Scripts & Voucher Management
   ========================================================================== */

// Voucher Data Repository
const voucherData = {
  rabies: {
    tag: 'Chương Trình Dài Hạn — Áp Dụng Xuyên Suốt',
    tagClass: 'tag-primary',
    image: 'assets/images/tiem-dai-voucher-16x9.png',
    valueLabel: 'ĐẶC QUYỀN MIỄN PHÍ',
    valueAmount: '0Đ',
    validity: 'Áp dụng xuyên suốt tất cả các ngày trong tuần',
    title: 'TIÊM NGỪA DẠI & SỔ GIUN MIỄN PHÍ CHO CHÓ MÈO',
    quote: 'Doctor Pet chọn làm điều này lâu dài vì phòng bệnh luôn tốt hơn chờ có vấn đề mới điều trị. Yêu thương là chủ động bảo vệ bé cưng trước những nguy cơ hoàn toàn có thể phòng ngừa.',
    perks: [
      '<strong>01 Mũi Tiêm Vaccine Phòng Dại Chính Hãng:</strong> Miễn phí 100% (0Đ), vắc-xin nhập khẩu chính hãng bảo quản dây chuyền lạnh chuẩn GSP.',
      '<strong>01 Liều Thuốc Sổ Giun Định Kỳ:</strong> Miễn phí 100% (0Đ), loại bỏ nội ký sinh trùng định kỳ an toàn cho đường ruột.',
      '<strong>Khám Sàng Lọc Thể Trạng Ban Đầu:</strong> Bác sĩ thú y trực tiếp kiểm tra thể trạng, đo cân nặng và thân nhiệt kỹ lưỡng trước khi tiêm.'
    ],
    note: 'Chương trình áp dụng XUYÊN SUỐT tất cả các ngày trong tuần tại 114 Lê Văn Lương, Quận 7. Không giới hạn thời gian, không cần chờ đợt khuyến mãi!',
    actionText: 'Đặt Lịch Nhận Ưu Đãi 0Đ Ngay',
    serviceTarget: 'Tiêm phòng vaccine / Ngừa dại'
  },
  birthday: {
    tag: 'Mừng Sinh Nhật Doctor Pet — Kéo Dài Đến Hết Năm 2026',
    tagClass: 'tag-secondary',
    image: 'assets/images/uudai-sinhnhat-voucher-16x9.png',
    valueLabel: 'TIẾT KIỆM ĐẾN',
    valueAmount: '700.000Đ',
    validity: 'Kéo dài xuyên suốt đến hết ngày 31/12/2026',
    title: 'MỪNG SINH NHẬT DOCTOR PET – TRI ÂN KHÁCH HÀNG',
    quote: 'Thêm một tuổi mới là thêm một cột mốc đáng nhớ. Doctor Pet tri ân sâu sắc tình cảm của ba mẹ thú cưng với 2 gói chăm sóc đặc quyền kéo dài xuyên suốt đến hết năm 2026!',
    perks: [
      '<strong>Gói 1 – Khám Sức Khỏe Toàn Diện 4 trong 1:</strong> Chỉ 900.000đ (Giá gốc 1.300.000đ) bao gồm Khám lâm sàng + Xét nghiệm sinh lý & sinh hóa máu + Siêu âm màu tổng quát + Chụp X-quang kỹ thuật số + Tặng voucher sổ giun 2 lần tiếp theo miễn phí.',
      '<strong>Gói 2 – Triệt Sản Thú Cưng (Chó & Mèo):</strong> TẶNG NGAY dịch vụ cạo vôi răng cao cấp trị giá 700.000đ. Kỹ thuật vi phẫu đường mổ siêu nhỏ 1-2cm, chỉ tự tiêu thẩm mỹ, quy trình gây mê an toàn và hồi tỉnh nhanh.'
    ],
    note: 'Chương trình áp dụng cho cả Chó và Mèo, kéo dài đến hết ngày 31/12/2026 tại phòng khám 114 Lê Văn Lương, Phường Tân Hưng, Quận 7.',
    actionText: 'Đặt Lịch Nhận Gói Tri Ân Ngay',
    serviceTarget: 'Triệt sản an toàn'
  }
};

// Global Voucher Modal Functions
window.openVoucherModal = function(type) {
  const modal = document.getElementById('voucherDetailModal');
  const container = document.getElementById('voucherModalDynamicContent');
  const data = voucherData[type];

  if (!modal || !container || !data) return;

  const perksHtml = data.perks.map(p => `
    <div class="voucher-perk-card">
      <div class="voucher-perk-icon"><i class="fa-solid fa-check"></i></div>
      <div class="voucher-perk-text">${p}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="voucher-modal-layout">
      <!-- Cột Trái: Ảnh Banner & Thông Tin Tóm Tắt -->
      <div class="voucher-modal-media-col">
        <div class="voucher-modal-banner-wrap">
          <img src="${data.image}" alt="${data.title}" class="voucher-modal-banner">
        </div>
        <div class="voucher-modal-sidebar-card">
          <div class="voucher-modal-value-pill">
            <span class="value-label">${data.valueLabel}</span>
            <span class="value-amount">${data.valueAmount}</span>
          </div>
          <div class="voucher-modal-side-meta">
            <div class="side-meta-item">
              <i class="fa-regular fa-calendar-check"></i>
              <span>${data.validity}</span>
            </div>
            <div class="side-meta-item">
              <i class="fa-solid fa-location-dot"></i>
              <span>114 Lê Văn Lương, Q.7, TP.HCM</span>
            </div>
            <div class="side-meta-item">
              <i class="fa-solid fa-phone"></i>
              <span>Hotline 24/7: <strong>0981 489 114</strong></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cột Phải: Nội Dung Chi Tiết Căn Chỉnh Khoa Học -->
      <div class="voucher-modal-content-col">
        <div class="voucher-modal-header">
          <span class="voucher-modal-tag ${data.tagClass}">${data.tag}</span>
          <h3 class="voucher-modal-title">${data.title}</h3>
        </div>

        <div class="voucher-modal-quote">
          <i class="fa-solid fa-quote-left quote-icon"></i>
          <p>${data.quote}</p>
        </div>
        
        <div class="voucher-modal-perks-section">
          <h4 class="voucher-modal-section-title">
            <i class="fa-solid fa-gift"></i> Quyền Lợi Đặc Quyền Dành Cho Bé:
          </h4>
          <div class="voucher-perks-grid">
            ${perksHtml}
          </div>
        </div>

        <div class="voucher-modal-note-box">
          <i class="fa-solid fa-circle-info"></i>
          <div><strong>Lưu ý:</strong> ${data.note}</div>
        </div>

        <div class="voucher-modal-actions">
          <button class="btn btn-primary btn-lg" onclick="claimVoucher('${data.serviceTarget}')">
            <i class="fa-regular fa-calendar-check"></i>
            <span>${data.actionText}</span>
          </button>
          <a href="tel:0981489114" class="btn btn-outline btn-lg">
            <i class="fa-solid fa-phone"></i>
            <span>Gọi Hotline</span>
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeVoucherModal = function() {
  const modal = document.getElementById('voucherDetailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.claimVoucher = function(serviceTarget) {
  closeVoucherModal();

  const serviceSelect = document.getElementById('serviceType');
  if (serviceSelect && serviceTarget) {
    // Select the service if exists in options
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value.includes(serviceTarget) || serviceTarget.includes(serviceSelect.options[i].value)) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }

  const bookingSec = document.getElementById('booking');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('ownerName');
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 600);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (mainNav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking nav links
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Header Scroll Effect
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Voucher Modal Close Events
  const closeVoucherBtn = document.getElementById('closeVoucherModalBtn');
  const voucherModal = document.getElementById('voucherDetailModal');

  if (closeVoucherBtn) {
    closeVoucherBtn.addEventListener('click', closeVoucherModal);
  }

  if (voucherModal) {
    voucherModal.addEventListener('click', (e) => {
      if (e.target === voucherModal) {
        closeVoucherModal();
      }
    });
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVoucherModal();
      const successModal = document.getElementById('successModal');
      if (successModal) successModal.classList.remove('active');
    }
  });

  // 4. Appointment Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalClientName = document.getElementById('modalClientName');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('ownerName');
      const phoneInput = document.getElementById('ownerPhone');
      const petType = document.getElementById('petType');
      const serviceType = document.getElementById('serviceType');
      const bookDate = document.getElementById('bookDate');

      if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        alert('Vui lòng điền họ tên và số điện thoại liên hệ!');
        return;
      }

      // Save appointment mock to localStorage
      const appointment = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        pet: petType ? petType.value : 'Chó / Mèo',
        service: serviceType ? serviceType.value : 'Khám tổng quát',
        date: bookDate ? bookDate.value : new Date().toLocaleDateString('vi-VN'),
        createdAt: new Date().toISOString()
      };

      try {
        const history = JSON.parse(localStorage.getItem('drpet_bookings') || '[]');
        history.push(appointment);
        localStorage.setItem('drpet_bookings', JSON.stringify(history));
      } catch (err) {
        console.error('LocalStorage write error', err);
      }

      // Show success modal
      if (modalClientName) {
        modalClientName.textContent = appointment.name;
      }

      if (successModal) {
        successModal.classList.add('active');
      }

      bookingForm.reset();
    });
  }

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // 5. Set default date to tomorrow for booking input
  const dateInput = document.getElementById('bookDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // 6. Interactive Service Tabs (The Animal Doctors International Luxury Style)
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  const tabPanels = document.querySelectorAll('.service-tab-panel');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        if (!targetId) return;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // 6b. Interactive Pricing Tabs
  const pricingTabBtns = document.querySelectorAll('.pricing-tab-btn');
  const pricingTabPanels = document.querySelectorAll('.pricing-tab-panel');

  if (pricingTabBtns.length > 0) {
    pricingTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        if (!targetId) return;

        pricingTabBtns.forEach(b => b.classList.remove('active'));
        pricingTabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // 7. Smooth Scroll for all internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
