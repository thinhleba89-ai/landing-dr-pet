/* ==========================================================================
   DOCTOR PET - PHÒNG KHÁM THÚ Y CHUẨN Y KHOA
   Main Interactive Scripts
   ========================================================================== */

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

  // 3. Appointment Booking Form Submission
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

  // 4. Set default date to tomorrow for booking input
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

  // 5. Smooth Scroll for all internal anchors
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
