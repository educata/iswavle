document.addEventListener('DOMContentLoaded', function () {
  // Populate URL info at the top
  const currentUrlSpan = document.getElementById('current-url');
  const pathnameSpan = document.getElementById('pathname');

  if (currentUrlSpan) {
    currentUrlSpan.textContent = window.location.href;
  }

  if (pathnameSpan) {
    pathnameSpan.textContent = window.location.pathname;
  }

  // Add click tracking for navigation links
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      console.log('Navigating to:', this.href);

      // Add a small delay to show the navigation happening
      if (!this.classList.contains('current')) {
        this.style.opacity = '0.7';
        setTimeout(() => {
          this.style.opacity = '';
        }, 200);
      }
    });
  });

  // Add click tracking for visible href links
  const visibleLinks = document.querySelectorAll('.nav-link');
  visibleLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      console.log('Navigating with visible href:', this.href);

      // Add visual feedback
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const currentLink = document.querySelector(`a[href$="${currentPage}"]`);
  if (currentLink) {
    currentLink.classList.add('current');
  }

  // Add breadcrumb functionality
  const breadcrumb = document.createElement('div');
  breadcrumb.className = 'breadcrumb';
  breadcrumb.innerHTML = `
        <span>📁 html-css-navigation</span>
        ${window.location.pathname.includes('/nested/') ? '<span>/ nested</span>' : ''}
        <span>/ ${currentPage}</span>
    `;

  const header = document.querySelector('header');
  header.appendChild(breadcrumb);
});

// Add some CSS for the new elements
const style = document.createElement('style');
style.textContent = `
    .breadcrumb {
        margin-top: 1rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        opacity: 0.8;
    }
    
    .breadcrumb span {
        margin-right: 0.5rem;
    }
    
    .path-info {
        margin-top: 1rem;
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 5px;
        border-left: 3px solid #667eea;
    }
    
    .path-info p {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
    
    .path-info strong {
        color: #667eea;
    }
`;
document.head.appendChild(style);
