/**
 * Documentation Block - Context Studio Lab
 * Decorates the documentation block with custom styling
 * @param {Element} block The documentation block element
 */
export default function decorate(block) {
  // Create section header
  const header = document.createElement('div');
  header.className = 'section-header';
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Documentation';
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.textContent = 'Comprehensive guides and technical specifications';
  
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Create docs grid
  const grid = document.createElement('div');
  grid.className = 'docs-grid';
  
  // Process each row as a doc card
  const rows = Array.from(block.children);
  rows.forEach((row, index) => {
    const card = document.createElement('div');
    card.className = 'doc-card';
    card.setAttribute('data-aos', 'flip-left');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    
    const cells = Array.from(row.children);
    
    // First cell: icon and title
    if (cells[0]) {
      const content = cells[0].textContent;
      const iconMatch = content.match(/([📘📗📙📕])/);
      const icon = iconMatch ? iconMatch[1] : '📘';
      
      const iconEl = document.createElement('span');
      iconEl.className = 'doc-icon';
      iconEl.textContent = icon;
      card.appendChild(iconEl);
      
      const titleEl = document.createElement('h3');
      titleEl.textContent = content.replace(icon, '').trim();
      card.appendChild(titleEl);
    }
    
    // Second cell: description
    if (cells[1]) {
      const desc = document.createElement('p');
      desc.textContent = cells[1].textContent;
      card.appendChild(desc);
    }
    
    // Third cell: link
    if (cells[2]) {
      const link = document.createElement('a');
      link.className = 'doc-link';
      const linkText = cells[2].textContent.trim();
      const linkMatch = linkText.match(/\[(.*?)\]\((.*?)\)/);
      
      if (linkMatch) {
        link.textContent = linkMatch[1];
        link.href = linkMatch[2];
      } else {
        link.textContent = 'Read Documentation';
        link.href = linkText || '#';
      }
      
      card.appendChild(link);
    }
    
    grid.appendChild(card);
  });
  
  // Clear block and add new structure
  block.innerHTML = '';
  block.appendChild(header);
  block.appendChild(grid);
}

// Made with Bob
