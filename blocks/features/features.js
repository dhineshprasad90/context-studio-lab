export default function decorate(block) {
  // Create features grid
  const featuresGrid = document.createElement('div');
  featuresGrid.className = 'features-grid';
  
  // Process each feature card
  const features = [...block.children];
  features.forEach((feature, index) => {
    const featureCard = document.createElement('div');
    featureCard.className = 'feature-card';
    featureCard.setAttribute('data-aos', 'fade-up');
    featureCard.setAttribute('data-aos-delay', index * 100);
    
    // Extract content
    const icon = feature.querySelector('p:first-child');
    const title = feature.querySelector('h3');
    const description = feature.querySelector('p:nth-of-type(2)');
    const list = feature.querySelector('ul');
    const link = feature.querySelector('a');
    
    if (icon) {
      icon.className = 'feature-icon';
      featureCard.appendChild(icon);
    }
    
    if (title) {
      title.className = 'feature-title';
      featureCard.appendChild(title);
    }
    
    if (description) {
      description.className = 'feature-description';
      featureCard.appendChild(description);
    }
    
    if (list) {
      list.className = 'feature-list';
      featureCard.appendChild(list);
    }
    
    if (link) {
      link.className = 'feature-link';
      featureCard.appendChild(link);
    }
    
    featuresGrid.appendChild(featureCard);
  });
  
  block.textContent = '';
  block.appendChild(featuresGrid);
}

// Made with Bob
