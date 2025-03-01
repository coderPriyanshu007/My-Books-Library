document.addEventListener("DOMContentLoaded", () => {
    const numStars = 600;
    const container = document.createElement("div");

    container.id = 'star-container';
    document.body.prepend(container)
    const colors = [
      "#FFD700", // Gold
      "#FFFFFF", // White (Common Stars)
      "#B0E0E6", // Pale Blue (Hot Stars)
      "#ADD8E6", // Light Blue (Young Stars)
      "#FFFAF0", // Soft Warm White (Distant Stars)
      "#E6E6FA",
    ]; // Lavender Tint (For Variety)

    for (let i = 0; i < numStars; i++) {
      let star = document.createElement("div");
      star.className = "glowing-stars";
      
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      let size = Math.random()*2;
      let duration = Math.random() + 1;
      let color = colors[Math.floor(Math.random() * colors.length)];

      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = 'white';
      star.style.boxShadow = `0 0 5px white`;
      star.style.animationDuration = `${duration}s`;

      container.appendChild(star);
    }
    setInterval(createStar,5000);












    function createStar() {
      const star = document.createElement("div");
      star.className = "shooting-star";

      // Random position near the top
      star.style.top = Math.random() * 10 + "vh";
      star.style.left = Math.random() * 100 + "vw";

      // Random animation duration
      star.style.animationDuration = (Math.random() * 2 + 1) + "s";
      star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      container.appendChild(star);

      // Remove star after animation ends
      setTimeout(() => {
          star.remove();
      }, 2000);
  }
  });