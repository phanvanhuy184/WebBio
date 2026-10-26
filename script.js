/**
 * Phan Văn Huy - WebBio Interactivity & Visual Effects (Bento Grid Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHoverEffects();
  initModals();
  initParticleCanvas();
  initMusicPlayer();
  initCard3DTilt();
});

/* ==========================================================================
   1. Interactive Hover Text
   ========================================================================== */
function initHoverEffects() {
  const zaloBtn = document.getElementById('btnZalo');
  const zaloTitle = document.getElementById('zaloTitle');
  if (zaloBtn && zaloTitle) {
    zaloBtn.addEventListener('mouseenter', () => {
      zaloTitle.textContent = 'Zalo: Huy Phan';
    });
    zaloBtn.addEventListener('mouseleave', () => {
      zaloTitle.textContent = 'Zalo: Huy Phan';
    });
  }

  const fbLink = document.getElementById('linkFacebook');
  const fbTitle = document.getElementById('fbTitle');
  if (fbLink && fbTitle) {
    fbLink.addEventListener('mouseenter', () => {
      fbTitle.textContent = 'Facebook: Huy Phan';
    });
    fbLink.addEventListener('mouseleave', () => {
      fbTitle.textContent = 'Facebook: Huy Phan';
    });
  }

  const latticeLink = document.getElementById('linkLattice');
  const latticeTitle = document.getElementById('latticeTitle');
  if (latticeLink && latticeTitle) {
    latticeLink.addEventListener('mouseenter', () => {
      latticeTitle.textContent = 'Khám Phá Lattice OJ';
    });
    latticeLink.addEventListener('mouseleave', () => {
      latticeTitle.textContent = 'Lattice Online Judge';
    });
  }

  const dcLink = document.getElementById('linkDiscord');
  const dcTitle = document.getElementById('discordTitle');
  if (dcLink && dcTitle) {
    dcLink.addEventListener('mouseenter', () => {
      dcTitle.textContent = 'Tham Gia Discord';
    });
    dcLink.addEventListener('mouseleave', () => {
      dcTitle.textContent = 'Discord Server';
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
   3. Ambient Star/Particle Canvas
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

  const particleCount = Math.min(Math.floor((width * height) / 16000), 65);
  const particles = [];
  const colors = [
    'rgba(56, 189, 248, ',   // cyan
    'rgba(168, 85, 247, ',  // purple
    'rgba(244, 63, 94, ',   // pink
    'rgba(88, 101, 242, ',  // discord blurple
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
      vy: -(Math.random() * 0.45 + 0.2), // upward float
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

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

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
   4. Background Music Toggle
   ========================================================================== */
function initMusicPlayer() {
  const musicToggle = document.getElementById('musicToggle');
  const bgmAudio = document.getElementById('bgmAudio');
  if (!musicToggle || !bgmAudio) return;

  bgmAudio.volume = 0.35;

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
   5. 3D Perspective Tilt on Hero Card (Desktop Only)
   ========================================================================== */
function initCard3DTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const heroCard = document.getElementById('heroCard');
  if (!heroCard) return;

  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = (-y / (rect.height / 2)) * 4;
    const rotY = (x / (rect.width / 2)) * 4;

    heroCard.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}
