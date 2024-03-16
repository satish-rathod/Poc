import projectSelector from "../projectselector.html?raw";

const setupProjectSelector = async (product) => {
  const html = projectSelector;
  document.getElementById("projectSelector").innerHTML = html;

  // Pass specific variable to each link in the navigation menu
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    // Ensure 'product' is a string or convert it to a string if needed
    const productValue = encodeURIComponent(String(product));

    // Modify this line to pass only the desired property
    link.href = `${href}?product=${productValue}`;
  });
};

export default setupProjectSelector;
