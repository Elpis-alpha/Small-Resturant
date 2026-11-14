export const site = {
  name: 'Fresh Bites Grill',
  short: 'Fresh Bites',
  title: 'Fresh Bites Grill — Fire-grilled plates in Sedona, Arizona',
  description:
    'Fresh Bites Grill serves delicious, nutritious plates cooked over open flame with the finest ingredients, in a warm and welcoming room under the red rocks of Sedona.',
  address: {
    line: 'Sedona, Arizona 86336',
    coords: '34.8697° N, 111.7610° W',
    maps: 'https://www.google.com/maps/search/?api=1&query=Sedona%2C+AZ+86336',
  },
  contact: {
    mail: 'mailto:elpis409@gmail.com',
    tel: 'tel:+2349163704134',
  },
  socials: [
    { label: 'Instagram', handle: '@elpis_alpha', href: 'https://www.instagram.com/elpis_alpha' },
    { label: 'Twitter', handle: '@elpis_alpha', href: 'https://twitter.com/elpis_alpha' },
    { label: 'Facebook', handle: 'Fresh Bites Grill', href: 'https://www.facebook.com' },
  ],
  nav: [
    { label: 'Story', href: '#story' },
    { label: 'Favourites', href: '#favourites' },
    { label: 'Menu', href: '#menu' },
    { label: 'Visit', href: '#visit' },
  ],
  credit: { label: 'Elpis', href: 'https://elpis.cc' },
} as const

/** EmailJS wiring for the reservation form (public, client-side keys). */
export const emailjsConfig = {
  serviceId: 'service_vnmbxe9',
  templateId: 'template_dbkcwpl',
  publicKey: '1kUZnj4b88VZl_Gfk',
} as const
