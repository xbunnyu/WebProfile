/**
 * Lanyard ID Badge Interactive Logic
 * - Theme Switcher (Dark / Light) with LocalStorage
 * - 3D Parallax Tilt Effect on Mouse Move
 * - Copy Profile Link with Toast Notification
 * - QR Code Modal Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const copyProfileBtn = document.getElementById('copyProfileBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const badgeHolder = document.getElementById('badgeHolder');
  const lanyardWrapper = document.getElementById('lanyardWrapper');

  // 1. Theme Toggle Logic
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#ffd166';
    } else {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '';
    }
  }

  // 2. 3D Tilt Effect on Mouse Move
  if (window.matchMedia('(hover: hover)').matches && badgeHolder) {
    document.addEventListener('mousemove', (e) => {
      const rect = badgeHolder.getBoundingClientRect();
      const badgeCenterX = rect.left + rect.width / 2;
      const badgeCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - badgeCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - badgeCenterY) / (window.innerHeight / 2);

      const rotateX = -deltaY * 12; // tilt up/down
      const rotateY = deltaX * 12;  // tilt left/right

      badgeHolder.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    document.addEventListener('mouseleave', () => {
      badgeHolder.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // 3. Toast Notification
  let toastTimeout;
  function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // 4. Copy Profile Link Buttons
  if (copyProfileBtn) {
    copyProfileBtn.addEventListener('click', () => {
      copyToClipboard(window.location.href, 'คัดลอกลิงก์โปรไฟล์เรียบร้อยแล้ว!');
    });
  }

  const copyProfileBtn2 = document.getElementById('copyProfileBtn2');
  if (copyProfileBtn2) {
    copyProfileBtn2.addEventListener('click', () => {
      copyToClipboard(window.location.href, 'คัดลอกลิงก์โปรไฟล์เรียบร้อยแล้ว!');
    });
  }

  // 5. Flip Card Interaction (สลับฝั่งการ์ด พลิกดูอีก Profile)
  const flipCardBtn = document.getElementById('flipCardBtn');
  const idCardFlipper = document.getElementById('idCardFlipper');
  const flipBtnLabel = document.getElementById('flipBtnLabel');
  const flipSideIndicator = document.getElementById('flipSideIndicator');
  let isFlipped = false;

  if (flipCardBtn && idCardFlipper) {
    flipCardBtn.addEventListener('click', () => {
      toggleCardFlip();
    });
  }

  function toggleCardFlip() {
    isFlipped = !isFlipped;
    idCardFlipper.classList.toggle('is-flipped', isFlipped);
    flipCardBtn.classList.toggle('is-flipped', isFlipped);

    if (flipBtnLabel) {
      flipBtnLabel.textContent = isFlipped ? 'สลับกลับด้านหน้า' : 'สลับฝั่งโปรไฟล์';
    }
    if (flipSideIndicator) {
      flipSideIndicator.textContent = isFlipped ? '2 / 2' : '1 / 2';
    }
  }

  function copyToClipboard(text, successMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
      }).catch(() => fallbackCopy(text, successMessage));
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(successMessage);
  }
});
