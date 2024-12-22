// Ads Array (Replace with your ad data or fetch from server)
const ads = [
    { id: 'ad1', type: 'image', src: 'https://via.placeholder.com/300x200?text=Ad+1' },
    { id: 'ad2', type: 'video', src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' },
    { id: 'ad3', type: 'image', src: 'https://via.placeholder.com/300x200?text=Ad+3' },
    // Add more ads as needed
  ];
  
  // Function to Populate Ads
  function populateAds() {
    ads.forEach((ad) => {
      const adBox = document.querySelector(`.box[data-ad-id="${ad.id}"]`);
      if (adBox) {
        const adContent = adBox.querySelector('.ad-content');
        if (ad.type === 'image') {
          const img = document.createElement('img');
          img.dataset.src = ad.src; // Lazy load
          img.alt = `Ad ${ad.id}`;
          adContent.innerHTML = ''; // Clear existing content
          adContent.appendChild(img);
        } else if (ad.type === 'video') {
          const video = document.createElement('video');
          video.dataset.src = ad.src; // Lazy load
          video.controls = true;
          video.muted = true;
          adContent.innerHTML = ''; // Clear existing content
          adContent.appendChild(video);
        }
      }
    });
  
    // Lazy Load Ads
    lazyLoadAds();
  }
  
  // Lazy Load Ads
  function lazyLoadAds() {
    const adElements = document.querySelectorAll('.ad-content img, .ad-content video');
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (element.dataset.src) {
              element.src = element.dataset.src;
              element.onload = () => element.classList.add('loaded');
            }
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.5 }
    );
  
    adElements.forEach((el) => observer.observe(el));
  }
  
  // Event Listeners for Ad Clicks
  document.querySelectorAll('.box').forEach((box) => {
    box.addEventListener('click', () => {
      const adId = box.dataset.adId;
      console.log(`Ad clicked: ${adId}`); // For analytics
      addCoins(5); // Add coins
    });
  });
  
  // Coins Handling
  let totalCoins = localStorage.getItem('totalCoins') || 0;
  
  function addCoins(amount) {
    totalCoins = parseInt(totalCoins) + amount;
    localStorage.setItem('totalCoins', totalCoins);
    updateCoinsDisplay();
  }
  
  function updateCoinsDisplay() {
    const coinsDisplay = document.getElementById('coins-display');
    if (coinsDisplay) {
      coinsDisplay.textContent = `Coins: ${totalCoins}`;
    }
  }
  
  // Initialize Ads and Coins on Page Load
  document.addEventListener('DOMContentLoaded', () => {
    populateAds();
    updateCoinsDisplay();
  });
  