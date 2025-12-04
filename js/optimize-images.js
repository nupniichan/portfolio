/*
  Image Optimization
  - Lazy load images that are not critical
*/

// Function to initialize image optimization
export function initImageOptimization() {
  const lazyImages = document.querySelectorAll('img:not(.critical):not([loading="eager"])');
  
  if (lazyImages.length === 0) return;
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          } else if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          
          img.classList.add('loaded');
          
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.01
    });
    
    lazyImages.forEach(img => {
      if (!img.hasAttribute('loading')) {
        if (!img.dataset.src && img.src && !img.classList.contains('critical')) {
          img.dataset.src = img.src;
          img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
          img.loading = 'lazy';
        }
        
        imageObserver.observe(img);
      }
    });
  } else {
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    });
  }
} 