document.addEventListener('DOMContentLoaded', function() {
  // Function to create sonnet cards
  function createSonnetCards() {
    const sonnetContainer = document.querySelector('#sonnets .grid');
    
    if (!sonnetContainer) return;
    
    sonnets.forEach(sonnet => {
      const card = document.createElement('div');
      card.className = 'sonnet-card';
      
      // Create header
      const header = document.createElement('div');
      header.className = 'sonnet-header';
      
      const authorSection = document.createElement('div');
      authorSection.className = 'author-section';
      
      const initial = document.createElement('div');
      initial.className = 'sonnet-initial';
      initial.style.backgroundColor = sonnet.color;
      initial.textContent = sonnet.initial;
      
      const title = document.createElement('h3');
      title.className = 'sonnet-title';
      title.innerHTML = `${sonnet.author}<span class="text-cs-light-gray">.sonnet</span>`;
      
      authorSection.appendChild(initial);
      authorSection.appendChild(title);
      
      const windowControls = document.createElement('div');
      windowControls.className = 'window-controls';
      
      const redDot = document.createElement('span');
      redDot.style.backgroundColor = 'var(--cs-red)';
      
      const yellowDot = document.createElement('span');
      yellowDot.style.backgroundColor = 'var(--cs-yellow)';
      
      const greenDot = document.createElement('span');
      greenDot.style.backgroundColor = 'var(--cs-green)';
      
      windowControls.appendChild(redDot);
      windowControls.appendChild(yellowDot);
      windowControls.appendChild(greenDot);
      
      header.appendChild(authorSection);
      header.appendChild(windowControls);
      
      // Create content
      const content = document.createElement('div');
      content.className = 'sonnet-content';
      
      const sonnetLines = document.createElement('div');
      sonnetLines.className = 'font-serif line-numbers leading-relaxed';
      
      sonnet.content.forEach(line => {
        const paragraph = document.createElement('p');
        paragraph.textContent = line;
        sonnetLines.appendChild(paragraph);
      });
      
      // Create footer
      const footer = document.createElement('div');
      footer.className = 'sonnet-footer';
      
      const footerContent = document.createElement('div');
      footerContent.className = 'flex items-center justify-between';
      
      const authorInfo = document.createElement('p');
      authorInfo.className = 'text-cs-light-gray text-sm';
      authorInfo.innerHTML = `<span class="text-cs-yellow">@author:</span> ${sonnet.author}`;
      
      footerContent.appendChild(authorInfo);
      footer.appendChild(footerContent);
      
      content.appendChild(sonnetLines);
      content.appendChild(footer);
      
      card.appendChild(header);
      card.appendChild(content);
      
      sonnetContainer.appendChild(card);
    });
  }
  
  // Initialize smooth scrolling for anchor links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
          
          // Update active class
          document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
          });
          this.classList.add('active');
        }
      });
    });
  }
  
  // Update active navigation based on scroll position
  function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollY = window.scrollY;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for header
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = sectionId;
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || 
            (current === '' && link.getAttribute('href') === '#')) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Initialize all functions
  createSonnetCards();
  initSmoothScrolling();
  updateActiveNavOnScroll();
});
