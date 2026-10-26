/**
 * Phan Văn Huy - WebBio Interactivity & Visual Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  initHoverEffects();
  initModals();
  initCopySTK();
  initParticleCanvas();
  initMusicPlayer();
  initCard3DTilt();
});

/* ==========================================================================
   1. Interactive Hover Text (Preserves & Enhances Original Logic)
   ========================================================================== */
function initHoverEffects() {
  const zaloBtn = document.getElementById('btnZalo');
  const zaloTitle = document.getElementById('zaloTitle');
  if (zaloBtn && zaloTitle) {
    zaloBtn.addEventListener('mouseenter', () => {
      zaloTitle.textContent = 'Huy Phan';
    });
    zaloBtn.addEventListener('mouseleave', () => {
      zaloTitle.textContent = 'Zalo';
    });
  }

  const fbLink = document.getElementById('linkFacebook');
  const fbTitle = document.getElementById('fbTitle');
  if (fbLink && fbTitle) {
    fbLink.addEventListener('mouseenter', () => {
      fbTitle.textContent = 'Huy Phan';
    });
    fbLink.addEventListener('mouseleave', () => {
      fbTitle.textContent = 'Facebook';
    });
  }

  const ghLink = document.getElementById('linkGithub');
  const ghTitle = document.getElementById('ghTitle');
  if (ghLink && ghTitle) {
    ghLink.addEventListener('mouseenter', () => {
      ghTitle.textContent = 'Huy Phan Van';
    });
    ghLink.addEventListener('mouseleave', () => {
      ghTitle.textContent = 'GitHub';
    });
  }

  const bankBtn = document.getElementById('btnBank');
  const bankTitle = document.getElementById('bankTitle');
  if (bankBtn && bankTitle) {
    bankBtn.addEventListener('mouseenter', () => {
      bankTitle.textContent = 'STK: 1043458381';
    });
    bankBtn.addEventListener('mouseleave', () => {
      bankTitle.textContent = 'Tài Khoản Vietcombank';
    });
  }
}

/* ==========================================================================
   2. Modal Management System
   ========================================================================== */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('[data-close]');
  const overlays = document.querySelectorAll('.modal-overlay');

  // Open Modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  // Close Modal on Close Button Click
  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const overlay = btn.closest('.modal-overlay');
      closeModal(overlay);
    });
  });

  // Close Modal on Backdrop Click
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close Modal on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeOverlay = document.querySelector('.modal-overlay.active');
      if (activeOverlay) {
        closeModal(activeOverlay);
      }
    }
  });

  // Quick switch from Intro modal to Zalo modal
  const btnIntroToZalo = document.getElementById('btnIntroToZalo');
  if (btnIntroToZalo) {
    btnIntroToZalo.addEventListener('click', () => {
      closeModal(document.getElementById('modalIntro'));
      setTimeout(() => {
        openModal('modalZalo');
      }, 200);
    });
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   3. Copy STK & Toast Notification
   ========================================================================== */
function initCopySTK() {
  const btnCopy = document.getElementById('btnCopySTK');
  const copyBtnText = document.getElementById('copyBtnText');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  if (!btnCopy) return;

  btnCopy.addEventListener('click', async () => {
    const stk = btnCopy.getAttribute('data-stk') || '1043458381';
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(stk);
      } else {
        // Fallback for non-https or older browser
        const tempInput = document.createElement('input');
        tempInput.value = stk;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      // Button feedback
      const originalText = copyBtnText.textContent;
      copyBtnText.textContent = '✓ Đã sao chép STK thành công!';
      btnCopy.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
      
      showToast(`Đã sao chép STK: ${stk} (Vietcombank)`);

      setTimeout(() => {
        copyBtnText.textContent = originalText;
        btnCopy.style.background = '';
      }, 2500);

    } catch (err) {
      showToast('Không thể sao chép, vui lòng nhập thủ công: ' + stk);
    }
  });

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

/* ==========================================================================
   4. Ambient Star/Particle Canvas
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle generation
  const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
  const particles = [];
  const colors = [
    'rgba(56, 189, 248, ',   // cyan
    'rgba(168, 85, 247, ',  // purple
    'rgba(244, 63, 94, ',   // pink
    'rgba(255, 255, 255, '  // pure white star
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.45 + 0.2), // gentle upward float
      pulsing: Math.random() * 0.02 + 0.008
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.alpha += p.pulsing;
      if (p.alpha > 0.85 || p.alpha < 0.2) {
        p.pulsing = -p.pulsing;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Draw particle with soft glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color + '0.8)';
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   5. Background Music Toggle
   ========================================================================== */
function initMusicPlayer() {
  const musicToggle = document.getElementById('musicToggle');
  const bgmAudio = document.getElementById('bgmAudio');
  if (!musicToggle || !bgmAudio) return;

  bgmAudio.volume = 0.35; // gentle ambient level

  musicToggle.addEventListener('click', () => {
    if (bgmAudio.paused) {
      bgmAudio.play().then(() => {
        musicToggle.classList.add('playing');
        musicToggle.querySelector('.music-label').textContent = 'Chill Playing';
      }).catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    } else {
      bgmAudio.pause();
      musicToggle.classList.remove('playing');
      musicToggle.querySelector('.music-label').textContent = 'Chill BGM';
    }
  });
}

/* ==========================================================================
   6. 3D Perspective Tilt on Card (Desktop Only)
   ========================================================================== */
function initCard3DTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on mobile touch

  const card = document.getElementById('profileCard');
  if (!card) return;

  const container = document.querySelector('.profile-card-container');
  if (!container) return;

  container.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = (-y / (rect.height / 2)) * 6; // Max 6 deg
    const rotY = (x / (rect.width / 2)) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  });

  container.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}
