/*
  Main Script
  - Initialize essential components and features
  - Load non-critical features asynchronously
*/

// Import necessary modules
import { initSidebar, highlightActiveSection } from './sidebar.js';
import { initThemeSwitch } from './theme.js';
import { initModal } from './modal.js';
import { initPersistentAudio } from './persistent-audio.js';

// Initialize reset functions
const resetFunctions = {}; 

function hideLoadingOverlay() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay && !loadingOverlay.classList.contains('hide')) {
    loadingOverlay.classList.add('hide');
  }
  
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.style.opacity = '1';
  }
}

function waitForCriticalImages() {
  const criticalImages = Array.from(document.querySelectorAll('img.critical'));
  const lcpImage = document.querySelector('.avatar');
  
  const imageSet = new Set(criticalImages);
  if (lcpImage) {
    imageSet.add(lcpImage);
  }
  const imagesToWait = Array.from(imageSet);
  
  if (imagesToWait.length === 0) return Promise.resolve();
  
  return Promise.all(
    imagesToWait.map(img => {
      if (img.complete) return Promise.resolve();
      
      return new Promise((resolve) => {
        const timeout = setTimeout(() => resolve(), 1500);
        img.onload = () => {
          clearTimeout(timeout);
          resolve();
        };
        img.onerror = () => {
          clearTimeout(timeout);
          resolve();
        };
      });
    })
  );
}

document.addEventListener('DOMContentLoaded', async () => {
  initSidebar();
  initPersistentAudio();
  highlightActiveSection();
  initThemeSwitch();
  initModal();
  
  const loadingOverlay = document.querySelector('.loading-overlay');
  const hasVisitedBefore = sessionStorage.getItem('hasVisited');
  
  const criticalImagesLoaded = waitForCriticalImages();
  
  criticalImagesLoaded.then(() => {
    setTimeout(() => {
      if (!hasVisitedBefore) {
        setTimeout(hideLoadingOverlay, 800);
      } else {
        hideLoadingOverlay();
      }
    }, 100);
  });
  
  // Load features in parallel but don't block LCP
  const [criticalFeaturesResults] = await Promise.all([
    Promise.all([
      import('./social-links.js').then(({ initSocialLinks, resetLinksAnimation }) => {
        initSocialLinks();
        resetFunctions.resetLinksAnimation = resetLinksAnimation;
        window.resetLinksAnimation = resetLinksAnimation;
        return { resetLinksAnimation };
      }),
      import('./typing.js').then(({ initTypingAnimation, resetTyping }) => {
        initTypingAnimation();
        resetFunctions.resetTyping = resetTyping;
        window.resetTyping = resetTyping;
        return { resetTyping };
      })
    ]),
    criticalImagesLoaded
  ]);

  if (!hasVisitedBefore) {
    sessionStorage.setItem('hasVisited', 'true');
  }
  
  // Loading overlay is now hidden in criticalImagesLoaded promise above

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      loadRemainingFeatures();
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      loadRemainingFeatures();
    }, 100);
  }
});

// Function to load remaining non-critical features
async function loadRemainingFeatures() {
  try {
    const [
      { initParticles },
      { initAvatarEffect },
      { initImageOptimization }
    ] = await Promise.all([
      import('./particles-config.js'),
      import('./avatar.js'),
      import('./optimize-images.js')
    ]);

    initImageOptimization();
    
    const currentTheme = sessionStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      if (typeof particlesJS === 'undefined') {
        await loadParticlesJS();
      }
      initParticles();
    }
    
    initAvatarEffect();
  } catch (error) {
    console.error('Error loading non-critical features:', error);
  }
}

function loadParticlesJS() {
  return new Promise((resolve, reject) => {
    if (typeof particlesJS !== 'undefined') {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load particles.js'));
    document.head.appendChild(script);
  });
}

window.addEventListener('themeChanged', (event) => {
  if (resetFunctions.resetLinksAnimation) {
    resetFunctions.resetLinksAnimation();
  }
  
  if (resetFunctions.resetTyping) {
    resetFunctions.resetTyping();
  }
});
