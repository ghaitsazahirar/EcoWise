class EcoFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
        <p>&copy; 2024 EcoWise. All rights reserved.</p>
    </footer>`;
    }
}

customElements.define('eco-footer', EcoFooter);
