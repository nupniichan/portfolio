/*
  Main Script
  - Initialize essential components and features
  - Load non-critical features asynchronously
*/

// Import necessary modules
import { initSidebar, highlightActiveSection } from './sidebar.js';
import { initThemeSwitch } from './theme.js';
import { initModal } from './modal.js';
import { optimizeAvatarGif } from './optimize-images.js';
import { initPersistentAudio } from './persistent-audio.js';

// Initialize reset functions
const resetFunctions = {}; 

document.addEventListener('DOMContentLoaded', async () => {
  // Optimize avatar GIF
  optimizeAvatarGif();
  
  // Initialize sidebar
  initSidebar();
  // Initialize persistent audio player with sessionStorage
  initPersistentAudio();
  highlightActiveSection();
  initThemeSwitch();
  initModal();
  
  const loadingOverlay = document.querySelector('.loading-overlay');
  const hasVisitedBefore = sessionStorage.getItem('hasVisited');
  
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

    Promise.all([
      ...Array.from(document.querySelectorAll('img.critical')).map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        });
      }),
      ...Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => {
        return new Promise((resolve) => {
          if (link.sheet) {
            resolve();
          } else {
            link.onload = () => resolve();
            link.onerror = () => resolve();
          }
        });
      }),
      !hasVisitedBefore ? new Promise(resolve => setTimeout(resolve, 1500)) : Promise.resolve()
    ])
  ]);

  if (!hasVisitedBefore) {
    sessionStorage.setItem('hasVisited', 'true');
  }
  
  // Hide loading overlay sau khi tất cả tài nguyên quan trọng và features đã load xong
  loadingOverlay.classList.add('hide');
  
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.style.opacity = '1';
  }

  // Load remaining non-critical features
  loadRemainingFeatures();
});

// Function to load remaining non-critical features
async function loadRemainingFeatures() {
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
  initParticles();
  initAvatarEffect();
}

window.addEventListener('themeChanged', (event) => {
  if (resetFunctions.resetLinksAnimation) {
    resetFunctions.resetLinksAnimation();
  }
  
  if (resetFunctions.resetTyping) {
    resetFunctions.resetTyping();
  }
});
