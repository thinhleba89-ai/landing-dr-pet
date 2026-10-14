/* ==========================================================================
   DOCTOR PET - PHÒNG KHÁM THÚ Y CHUẨN Y KHOA
   Main Interactive Scripts & Voucher Management
   ========================================================================== */

// Voucher Data Repository
const voucherData = {
  rabies: {
    tag: 'Chương Trình Dài Hạn — Áp Dụng Xuyên Suốt',
    tagClass: 'tag-primary',
    image: 'assets/images/tiem-dai-free.png',
    title: 'TIÊM NGỪA DẠI & SỔ GIUN MIỄN PHÍ CHO CHÓ MÈO',
    quote: '“Doctor Pet chọn làm điều này lâu dài vì phòng bệnh luôn tốt hơn chờ có vấn đề mới điều trị. Yêu thương là chủ động bảo vệ bé cưng trước những nguy cơ hoàn toàn có thể phòng ngừa.”',
    perks: [
      '<strong>01 Mũi Tiêm Vaccine Phòng Dại Chính Hãng:</strong> Miễn phí 100% (0Đ).',
      '<strong>01 Liều Thuốc Sổ Giun Định Kỳ:</strong> Miễn phí 100% (0Đ).',
      '<strong>Khám Sàng Lọc Sức Khỏe Ban Đầu:</strong> Bác sĩ thú y kiểm tra thể trạng, cân nặng, thân nhiệt trước khi tiêm.'
    ],
    note: 'Chương trình áp dụng XUYÊN SUỐT tất cả các ngày trong tuần tại 114 Lê Văn Lương, Q.7. Không giới hạn thời gian, không cần chờ đợt khuyến mãi!',
    actionText: 'Đặt Lịch Nhận Ưu Đãi Tiêm Phòng Ngay',
    serviceTarget: 'Tiêm phòng vaccine / Ngừa dại'
  },
  birthday: {
    tag: 'Mừng Sinh Nhật Doctor Pet — Kéo Dài Đến Hết Năm 2026',
    tagClass: 'tag-secondary',
    image: 'assets/images/uudai-sinhnhat.png',
    title: 'MỪNG SINH NHẬT DOCTOR PET – TRI ÂN KHÁCH HÀNG THÂN YÊU',
    quote: '“Thêm một tuổi mới là thêm một cột mốc đáng nhớ. Doctor Pet tri ân sâu sắc tình cảm của ba mẹ thú cưng với 2 gói chăm sóc đặc quyền kéo dài xuyên suốt đến hết năm 2026!”',
    perks: [
      '<strong>ƯU ĐÃI 1 – Khám Sức Khỏe Toàn Diện Chỉ 900.000đ (Giá gốc 1.300.000đ):</strong> Khám lâm sàng + Xét nghiệm sinh lý & sinh hóa máu + Siêu âm màu tổng quát + Chụp X-quang kỹ thuật số + 🎁 Tặng voucher sổ giun 2 lần tiếp theo miễn phí.',
      '<strong>ƯU ĐÃI 2 – Triệt Sản Thú Cưng (Chó & Mèo):</strong> 🎁 TẶNG NGAY dịch vụ cạo vôi răng cao cấp trị giá 700.000đ. Kỹ thuật vi phẫu đường mổ siêu nhỏ, chỉ tự tiêu, gây mê bay hơi Isoflurane hồi tỉnh an toàn sau 4 tiếng.'
    ],
    note: 'Chương trình áp dụng cho cả Chó và Mèo, kéo dài đến hết ngày 31/12/2026 tại 114 Lê Văn Lương, Phường Tân Hưng, Quận 7.',
    actionText: 'Đặt Lịch Nhận Gói Ưu Đãi Này Ngay',
    serviceTarget: 'Triệt sản an toàn'
  }
};

// Global Voucher Modal Functions
window.openVoucherModal = function(type) {
  const modal = document.getElementById('voucherDetailModal');
  const container = document.getElementById('voucherModalDynamicContent');
  const data = voucherData[type];

  if (!modal || !container || !data) return;

  const perksHtml = data.perks.map(p => `<li><i class="fa-solid fa-circle-check"></i> <div>${p}</div></li>`).join('');

  container.innerHTML = `
    <img src="${data.image}" alt="${data.title}" class="voucher-modal-banner">
    <div class="voucher-modal-inner">
      <span class="voucher-modal-tag ${data.tagClass}">${data.tag}</span>
      <h3 class="voucher-modal-title">${data.title}</h3>
      <div class="voucher-modal-quote">${data.quote}</div>
      
      <h4 class="voucher-modal-section-title"><i class="fa-solid fa-gift" style="color: var(--color-secondary);"></i> Quyền Lợi Đặc Quyền Dành Cho Bạn:</h4>
      <ul class="voucher-modal-list">
        ${perksHtml}
      </ul>

      <div class="voucher-modal-note-box">
        <i class="fa-solid fa-circle-info"></i>
        <div><strong>Lưu ý:</strong> ${data.note}</div>
      </div>

      <div class="voucher-modal-actions">
        <button class="btn btn-secondary btn-lg" onclick="claimVoucher('${data.serviceTarget}')">
          <i class="fa-regular fa-calendar-check"></i>
          <span>${data.actionText}</span>
        </button>
        <a href="tel:0981489114" class="btn btn-outline btn-lg" style="flex: 0 0 auto;">
          <i class="fa-solid fa-phone"></i>
          <span>Hotline: 0981 489 114</span>
        </a>
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

  // 6. Smooth Scroll for all internal anchors
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
