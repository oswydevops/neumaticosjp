# Traducciones Completas Pendientes

Este documento contiene todas las traducciones que necesitan ser agregadas para completar el sistema multiidioma.

## Contact - Payment Methods

### Español
```typescript
transfer: 'Transferencia',
cash: 'Efectivo'
```

### English  
```typescript
transfer: 'Bank Transfer',
cash: 'Cash'
```

### Français
```typescript
transfer: 'Virement',
cash: 'Espèces'
```

## Catalog - Filter Modal & Count

### Español
```typescript
catalog: {
  // ... existentes
  showingResults: 'Mostrando {count} neumáticos',
  noTiresFound: 'No se encontraron neumáticos',
  filterByBrand: 'Filtrar por Marca',
  filterBySize: 'Filtrar por Medida',
  allBrands: 'Todas las Marcas',
  clearFilters: 'Limpiar Filtros'
}
```

### English
```typescript
catalog: {
  // ... existing
  showingResults: 'Showing {count} tires',
  noTiresFound: 'No tires found',
  filterByBrand: 'Filter by Brand',
  filterBySize: 'Filter by Size',
  allBrands: 'All Brands',
  clearFilters: 'Clear Filters'
}
```

### Français
```typescript
catalog: {
  // ... existants
  showingResults: 'Affichage de {count} pneus',
  noTiresFound: 'Aucun pneu trouvé',
  filterByBrand: 'Filtrer par Marque',
  filterBySize: 'Filtrer par Taille',
  allBrands: 'Toutes les Marques',
  clearFilters: 'Effacer les Filtres'
}
```

## Footer - Main Content & Modals

### Español
```typescript
footer: {
  legalTitle: 'Información Legal',
  terms: 'Términos y Condiciones',
  privacy: 'Política de Privacidad',
  resourcesTitle: 'Recursos',
  docs: 'Centro de Ayuda',
  support: 'Soporte y Asistencia',
  brandDesc: '"Elevando tu experiencia de conducción al siguiente nivel de lujo y rendimiento..."',
  rights: '© 2026 JP TIRES, CANADÁ. TODOS LOS DERECHOS RESERVADOS.',
  excellence: 'EXCELENCIA AUTOMOTRIZ',
  closeWindow: 'Cerrar Ventana',
  
  // Modal Docs
  modalDocsTitle: 'Centro de Ayuda',
  modalDocsUserGuide: 'Guía de Usuario',
  modalDocsUserGuideText: 'Usteded como usuario podrá navegar por nuestro catálogo premium utilizando los filtros laterales, puede buscar por marca, ancho, perfil o diámetro. Al seleccionar un neumático, se desplegará una ficha técnica detallada con todas las especificaciones, en la misma ademas encontrará su precio y disponibilidad, para concretar la compra deberá contactar al vendedor vía teléfono o email, donde se confirmará el stock, se le brindará toda la asistencia necesaria y podrá negociar precio según la cantidad a comprar. En la sección de contacto, encontrará los datos del vendedor para coordinar la operación así como horarios de atención y métodos de pago aceptados.',
  modalDocsTechSpecs: 'Especificaciones Técnicas',
  modalDocsFrontend: 'Frontend Framework',
  modalDocsStyles: 'Estilos',
  modalDocsDatabase: 'Base de Datos',
  modalDocsVersion: 'Versión del Producto',
  
  // Modal Terms
  modalTermsTitle: 'Términos y Condiciones',
  modalTermsIntro: '1. Introducción',
  modalTermsIntroText: 'Estos Términos y Condiciones rigen el uso de nuestro sitio web [JP TIRES], operado por [Jean Plourde]. El Sitio actúa como un catálogo en línea para la venta de neumáticos importados directamente desde China y vendidos en Canadá. Al acceder o utilizar el Sitio, usted acepta estar vinculado por estos Términos. Si no está de acuerdo, no utilice el Sitio.',
  modalTermsUse: '2. Uso del Sitio',
  modalTermsUseText1: 'El sitio es solo para fines informativos y de compra. No está destinado a menores de 18 años sin supervisión parental.',
  modalTermsUseText2: 'Usted se compromete a no utilizar el sitio para fines ilegales, fraudulentos o que violen derechos de terceros.',
  modalTermsUseText3: 'Nos reservamos el derecho a modificar, suspender o discontinuar el Sitio en cualquier momento sin previo aviso.',
  modalTermsPricing: '3. Precios y Stock',
  modalTermsPricingText: 'Los precios publicados están sujetos a cambios sin previo aviso. La disponibilidad de stock debe ser confirmada vía WhatsApp antes de concretar el pago.',
  
  // Modal Privacy
  modalPrivacyTitle: 'Políticas de Privacidad',
  modalPrivacyInfo: 'Información que Recopilamos',
  modalPrivacyInfoPersonal: 'Información Personal: Número de teléfono y correo electrónico',
  modalPrivacyInfoContact: 'Información de Contacto: Datos proporcionados al contactarnos vía redes sociales, teléfono o correo electrónico, como mensajes, consultas o reclamos.',
  modalPrivacyInfoAuto: 'Información Automática: Dirección IP, tipo de navegador, páginas visitadas y cookies para mejorar la experiencia del usuario.',
  modalPrivacySecurity: 'Seguridad de la Información',
  modalPrivacySecurityText: 'Sus datos nunca serán compartidos con terceros con fines publicitarios. La información se utiliza exclusivamente para la relación comercial cliente-empresa.',
  modalPrivacyChanges: 'Modificaciones a las Políticas',
  modalPrivacyChangesText: 'Podemos actualizar estas políticas. Los cambios se publicarán en el sitio web, deberás revisarlas periódicamente.'
}
```

### English
```typescript
footer: {
  legalTitle: 'Legal Information',
  terms: 'Terms & Conditions',
  privacy: 'Privacy Policy',
  resourcesTitle: 'Resources',
  docs: 'Help Center',
  support: 'Support & Assistance',
  brandDesc: '"Elevating your driving experience to the next level of luxury and performance..."',
  rights: '© 2026 JP TIRES, CANADA. ALL RIGHTS RESERVED.',
  excellence: 'AUTOMOTIVE EXCELLENCE',
  closeWindow: 'Close Window',
  
  // Modal Docs
  modalDocsTitle: 'Help Center',
  modalDocsUserGuide: 'User Guide',
  modalDocsUserGuideText: 'As a user, you can browse our premium catalog using the side filters, you can search by brand, width, profile or diameter. When selecting a tire, a detailed technical sheet will be displayed with all specifications, in it you will also find its price and availability, to complete the purchase you must contact the seller via phone or email, where stock will be confirmed, all necessary assistance will be provided and you can negotiate price according to the quantity to be purchased. In the contact section, you will find the seller\'s details to coordinate the operation as well as business hours and accepted payment methods.',
  modalDocsTechSpecs: 'Technical Specifications',
  modalDocsFrontend: 'Frontend Framework',
  modalDocsStyles: 'Styles',
  modalDocsDatabase: 'Database',
  modalDocsVersion: 'Product Version',
  
  // Modal Terms
  modalTermsTitle: 'Terms & Conditions',
  modalTermsIntro: '1. Introduction',
  modalTermsIntroText: 'These Terms and Conditions govern the use of our website [JP TIRES], operated by [Jean Plourde]. The Site acts as an online catalog for the sale of tires imported directly from China and sold in Canada. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, do not use the Site.',
  modalTermsUse: '2. Use of the Site',
  modalTermsUseText1: 'The site is for informational and purchasing purposes only. It is not intended for minors under 18 without parental supervision.',
  modalTermsUseText2: 'You agree not to use the site for illegal, fraudulent purposes or that violate third party rights.',
  modalTermsUseText3: 'We reserve the right to modify, suspend or discontinue the Site at any time without prior notice.',
  modalTermsPricing: '3. Pricing and Stock',
  modalTermsPricingText: 'Published prices are subject to change without prior notice. Stock availability must be confirmed via WhatsApp before completing payment.',
  
  // Modal Privacy
  modalPrivacyTitle: 'Privacy Policy',
  modalPrivacyInfo: 'Information We Collect',
  modalPrivacyInfoPersonal: 'Personal Information: Phone number and email',
  modalPrivacyInfoContact: 'Contact Information: Data provided when contacting us via social media, phone or email, such as messages, inquiries or claims.',
  modalPrivacyInfoAuto: 'Automatic Information: IP address, browser type, pages visited and cookies to improve user experience.',
  modalPrivacySecurity: 'Information Security',
  modalPrivacySecurityText: 'Your data will never be shared with third parties for advertising purposes. The information is used exclusively for the client-company business relationship.',
  modalPrivacyChanges: 'Policy Modifications',
  modalPrivacyChangesText: 'We may update these policies. Changes will be posted on the website, you should review them periodically.'
}
```

### Français
```typescript
footer: {
  legalTitle: 'Informations Légales',
  terms: 'Conditions Générales',
  privacy: 'Politique de Confidentialité',
  resourcesTitle: 'Ressources',
  docs: 'Centre d\'Aide',
  support: 'Support et Assistance',
  brandDesc: '"Sublimez votre expérience de conduite avec le luxe et la performance..."',
  rights: '© 2026 JP TIRES, CANADA. TOUS DROITS RÉSERVÉS.',
  excellence: 'EXCELLENCE AUTOMOBILE',
  closeWindow: 'Fermer la Fenêtre',
  
  // Modal Docs
  modalDocsTitle: 'Centre d\'Aide',
  modalDocsUserGuide: 'Guide de l\'Utilisateur',
  modalDocsUserGuideText: 'En tant qu\'utilisateur, vous pouvez parcourir notre catalogue premium en utilisant les filtres latéraux, vous pouvez rechercher par marque, largeur, profil ou diamètre. Lors de la sélection d\'un pneu, une fiche technique détaillée s\'affichera avec toutes les spécifications, vous y trouverez également son prix et sa disponibilité, pour finaliser l\'achat, vous devez contacter le vendeur par téléphone ou par e-mail, où le stock sera confirmé, toute l\'assistance nécessaire sera fournie et vous pourrez négocier le prix en fonction de la quantité à acheter. Dans la section contact, vous trouverez les coordonnées du vendeur pour coordonner l\'opération ainsi que les heures d\'ouverture et les modes de paiement acceptés.',
  modalDocsTechSpecs: 'Spécifications Techniques',
  modalDocsFrontend: 'Frontend Framework',
  modalDocsStyles: 'Styles',
  modalDocsDatabase: 'Base de Données',
  modalDocsVersion: 'Version du Produit',
  
  // Modal Terms
  modalTermsTitle: 'Conditions Générales',
  modalTermsIntro: '1. Introduction',
  modalTermsIntroText: 'Ces Conditions Générales régissent l\'utilisation de notre site Web [JP TIRES], exploité par [Jean Plourde]. Le Site agit comme un catalogue en ligne pour la vente de pneus importés directement de Chine et vendus au Canada. En accédant ou en utilisant le Site, vous acceptez d\'être lié par ces Conditions. Si vous n\'êtes pas d\'accord, n\'utilisez pas le Site.',
  modalTermsUse: '2. Utilisation du Site',
  modalTermsUseText1: 'Le site est à des fins informatives et d\'achat uniquement. Il n\'est pas destiné aux mineurs de moins de 18 ans sans surveillance parentale.',
  modalTermsUseText2: 'Vous acceptez de ne pas utiliser le site à des fins illégales, frauduleuses ou qui violent les droits de tiers.',
  modalTermsUseText3: 'Nous nous réservons le droit de modifier, suspendre ou interrompre le Site à tout moment sans préavis.',
  modalTermsPricing: '3. Prix et Stock',
  modalTermsPricingText: 'Les prix publiés sont sujets à modification sans préavis. La disponibilité du stock doit être confirmée via WhatsApp avant de finaliser le paiement.',
  
  // Modal Privacy
  modalPrivacyTitle: 'Politique de Confidentialité',
  modalPrivacyInfo: 'Informations que Nous Collectons',
  modalPrivacyInfoPersonal: 'Informations Personnelles : Numéro de téléphone et email',
  modalPrivacyInfoContact: 'Informations de Contact : Données fournies lors de la prise de contact via les réseaux sociaux, téléphone ou email, telles que messages, demandes ou réclamations.',
  modalPrivacyInfoAuto: 'Informations Automatiques : Adresse IP, type de navigateur, pages visitées et cookies pour améliorer l\'expérience utilisateur.',
  modalPrivacySecurity: 'Sécurité de l\'Information',
  modalPrivacySecurityText: 'Vos données ne seront jamais partagées avec des tiers à des fins publicitaires. Les informations sont utilisées exclusivement pour la relation commerciale client-entreprise.',
  modalPrivacyChanges: 'Modifications des Politiques',
  modalPrivacyChangesText: 'Nous pouvons mettre à jour ces politiques. Les modifications seront publiées sur le site Web, vous devriez les consulter périodiquement.'
}
```

## Uso en Componentes

### Contact.tsx - Payment Methods
```typescript
const paymentMethods = [
  { name: 'Visa', iconPath: '/icons/visa.svg' },
  { name: 'Mastercard', iconPath: '/icons/mastercard.svg' },
  { name: 'PayPal', iconPath: '/icons/paypal.svg' },
  { name: t.contact.transfer, iconPath: '/icons/bank.svg' }, // Cambiado
  { name: t.contact.cash, iconPath: '/icons/cash.svg' } // Cambiado
];
```

### Catalog.tsx - Tire Count
```typescript
<p className="text-white/60">
  {filteredTires.length === 0 
    ? t.catalog.noTiresFound 
    : t.catalog.showingResults.replace('{count}', filteredTires.length.toString())
  }
</p>
```

### Footer.tsx - All Modals
Usar las claves `t.footer.modal*` en lugar de los textos hardcodeados actuales.

---

**Nota**: Este documento muestra todas las traducciones necesarias para completar el sistema multiidioma.
