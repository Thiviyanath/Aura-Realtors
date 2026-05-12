// ============================================================
//  SITE CONFIG — Edit all business details here
//  Changes here automatically update across the whole site
// ============================================================

export const siteConfig = {
  // Company
  companyName:   'Aura real estate ',
  companyShort:  'Aura Realtors ',
  tagline:       'Find Your Dream Property in Colombo',
  description:   'Premium real estate marketplace serving Colombo 01–10. We connect property buyers, sellers, and tenants with Sri Lanka\'s finest listings.',

  // Contact
  address:       '109 Vihara Mawatha, Colombo 03, Sri Lanka',
  phone:         '+94 71 219 481',
  email:         'info@auraestate.lk',
  whatsapp:      '94767114801',           // no +, no spaces
  mapEmbedUrl:   '',                       // paste Google Maps embed src here

  // Service
  serviceArea:   'Colombo 01 – 10',
  serviceAreas:  ['Colombo 1','Colombo 2','Colombo 3','Colombo 4','Colombo 5',
                  'Colombo 6','Colombo 7','Colombo 8','Colombo 9','Colombo 10'],

  // Social
  facebook:      'https://facebook.com',
  instagram:     'https://instagram.com',
  linkedin:      'https://linkedin.com',
}

export const whatsappUrl = (text = "Hi, I'm interested in a property") =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`
