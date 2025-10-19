import React from 'react';

export default function Footer() {
  const html = `
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <a href="/index.html" class="logo-link">
                    <div class="footer-logo">
                        <img src="https://jtheberg.cloud/assets/images/logo.png" alt="Jtheberg" class="logo">
                        <span class="logo-text">Jtheberg</span>
                    </div>
                </a>
                <p data-i18n="footer.description">Votre partenaire de confiance pour l'hébergement web professionnel.</p>
                <div class="social-links">
                    <a href="https://billing.jtheberg.cloud/cdn/autourl/twitter" class="social-link"><i class="fa-brands fa-twitter"></i></a>
                    <a href="https://billing.jtheberg.cloud/cdn/autourl/youtube" class="social-link"><i class="fa-brands fa-youtube"></i></a>
                    <a href="https://www.linkedin.com/in/jtheberg/" class="social-link"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://billing.jtheberg.cloud/cdn/autourl/discord" class="social-link"><i class="fa-brands fa-discord"></i></a>
                </div>
            </div>
            
            <div class="footer-section">
                <h4 data-i18n="footer.sections.products">Produits</h4>
                <ul>
                    <li><a href="/hosting/vps/" data-i18n="footer.links.vpsHosting">Hébergement VPS</a></li>
                    <li><a href="/hosting/web" data-i18n="footer.links.webHosting">Hébergement Web</a></li>
                    <li><a href="/hosting/minecraft/" data-i18n="footer.links.minecraftHosting">Hébergement Minecraft</a></li>
                    <li><a href="/hosting/garrys-mod/" data-i18n="servicesDropdown.gmod">Garry's Mod</a></li>
                    <li><a href="/hosting/nodejs" data-i18n="footer.links.discordBot">Discord Bot / NodeJS</a></li>
                    <li><a href="/hosting/minecraft-proxy/" data-i18n="servicesDropdown.minecraftProxy">Minecraft Proxy</a></li>
                    <li><a href="/hosting/licenses/" data-i18n="footer.links.licenses">Licenses</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4 data-i18n="footer.sections.support">Support</h4>
                <ul>
                    <li><a href="https://docs.jtheberg.cloud" data-i18n="footer.links.documentation">Documentation</a></li>                         
                    <li><a href="/contact/" data-i18n="footer.links.contactUs">Contactez-nous</a></li>
                    <li><a href="https://billing.jtheberg.cloud/clientarea.php" data-i18n="footer.links.clientArea">Espace client</a></li>
                    <li><a href="https://status.jtheberg.cloud/status/jtheberg" data-i18n="footer.links.serviceStatus">Statut des services</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4 data-i18n="footer.sections.company">Entreprise</h4>
                <ul>
                    <li><a href="/about/" data-i18n="footer.links.about">À propos</a></li>
                    <li><a href="https://billing.jtheberg.cloud/announcements" data-i18n="footer.links.news">Actualités</a></li>
                    <li><a href="/free-node/">Free-Node</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="footer-info">
                <p data-i18n="footer.legal.copyright">&copy; 2025 Jtheberg. Tous droits réservés.</p>
                <p data-i18n="footer.legal.company">Siren : 932 243 876 | RNA : W543 016 552</p>
            </div>
            <div class="footer-links">
                <a href="/cdn/legal/ml/ml_jtheberg.pdf" data-i18n="footer.legal.legalNotice">Mentions légales</a>
                <a href="/cdn/legal/pdc/pdc_Jtheberg.pdf" data-i18n="footer.legal.privacy">Politique de confidentialité</a>
                <a href="/cdn/legal/cgu/Jtheherg_cgu.pdf" data-i18n="footer.legal.terms">Conditions général d'utilisation</a>
                <a href="/cdn/legal/cgv/Jtheberg_cgv.pdf" data-i18n="footer.legal.cgv">Conditions général de vente</a>
            </div>
        </div>
    </div>
</footer>`;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}