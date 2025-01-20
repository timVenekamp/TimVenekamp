document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');

    if (!gallery || !prevArrow || !nextArrow) {
        console.error('One or more required elements not found');
        return;
    }

    let currentIndex = 0;
    const images = Array.from(gallery.children); // Ensure we handle it as an array
    let imageWidth = 0;

    // Function to calculate image width dynamically
    const updateImageWidth = () => {
        imageWidth = images[0]?.clientWidth || 0; // Default to 0 if no images found
    };

    // Function to move the gallery
    const moveGallery = (index) => {
        // Circular logic: wrap around to 0 if we go past the last image, or to last if we go before first
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;
        gallery.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    };

    // Update image width when images are loaded or window is resized
    window.addEventListener('load', updateImageWidth);
    window.addEventListener('resize', updateImageWidth);

    // Event listeners for navigation
    prevArrow.addEventListener('click', () => {
        moveGallery(currentIndex - 1);
    });

    nextArrow.addEventListener('click', () => {
        moveGallery(currentIndex + 1);
    });

    // Initial setup
    updateImageWidth();
});