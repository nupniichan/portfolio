
/*
  Social Links
  - Initialize social links functionality
*/
import { links } from "./links.js";

// Function to reset links animation
export function resetLinksAnimation() {
  const links = document.querySelectorAll('.link');
  if (!links || links.length === 0) return;
  
  const linksArray = Array.from(links);
  for (let i = 0; i < linksArray.length; i++) {
    const link = linksArray[i];
    link.style.animation = 'none';
    link.style.opacity = '0';
    link.offsetHeight;
    link.style.animation = `slideIn 0.3s ease forwards ${i * 0.05}s`;
  }
}

// Function to initialize social links ( depend on how many links in links.js )
export function initSocialLinks() {
  const linkContainer = document.getElementById("links");
  if (!linkContainer) return;

  function addLink(name, link, image) {
    return `
      <a href="${link}" class="link" target="_blank"> 
        <img src="${image}" alt="${name}" loading="lazy" decoding="async"/> 
        <span>${name}</span> 
        <img class="linkIcon" src="${image}" alt="" loading="lazy" decoding="async"/> 
      </a> 
    `;
  }

  const linksArray = [];
  for (let i = 0; i < links.length; i++) {
    linksArray.push(addLink(links[i].name, links[i].link, links[i].image));
  }

  linkContainer.innerHTML = linksArray.join('');
  
  const linkElements = document.querySelectorAll('.link');
  const linkElementsArray = Array.from(linkElements);
  for (let i = 0; i < linkElementsArray.length; i++) {
    linkElementsArray[i].style.opacity = '0';
    linkElementsArray[i].style.setProperty('--order', i + 1);
  }

  // Reset links animation
  resetLinksAnimation();
} 