export type MenuItem = {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string | null
}

const SANITY = { projectId: '4birj5g8', dataset: 'production', apiVersion: '2023-04-04' }

const QUERY = `*[_type == "menu" && defined(name)]{
  "id": _id, name, price, category, description, "image": image.asset->url
}`

/** Preferred tab order; anything new added in the studio is appended after these. */
const CATEGORY_ORDER = ['Breakfast', 'Lunch', 'Dinner', 'Misc']

/** Friendlier names for the tabs. */
export const CATEGORY_LABELS: Record<string, string> = {
  Misc: 'Sides & Shakes',
}

const toPrice = (value: unknown) => {
  const price = typeof value === 'number' ? value : parseFloat(String(value ?? '').replace(/[^0-9.]/g, ''))
  return Number.isFinite(price) ? price : 0
}

const rank = (category: string) => {
  const index = CATEGORY_ORDER.indexOf(category)
  return index === -1 ? CATEGORY_ORDER.length : index
}

const normalise = (raw: any[]): MenuItem[] =>
  raw
    .filter((item) => item && typeof item.name === 'string' && item.name.trim())
    .map((item, index) => ({
      id: String(item.id ?? `item-${index}`),
      name: item.name.trim(),
      price: toPrice(item.price),
      category: typeof item.category === 'string' && item.category.trim() ? item.category.trim() : 'Misc',
      description: typeof item.description === 'string' ? item.description.trim() : '',
      image: typeof item.image === 'string' ? item.image : null,
    }))
    .sort((a, b) => rank(a.category) - rank(b.category) || a.category.localeCompare(b.category) || b.price - a.price)

export const getCategories = (items: MenuItem[]) =>
  Array.from(new Set(items.map((item) => item.category))).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))

/** Sanity's image pipeline does the resizing and format negotiation for us. */
export const menuImage = (url: string, width: number, height: number) =>
  url.includes('cdn.sanity.io') ? `${url}?w=${width}&h=${height}&fit=crop&auto=format&q=72` : url

/**
 * Menu content lives in Sanity (https://fresh-bites.sanity.studio).
 * If the CMS is unreachable at build/revalidate time we fall back to a local
 * snapshot so the site never ships without a menu.
 */
export const getMenu = async (): Promise<MenuItem[]> => {
  try {
    const url = `https://${SANITY.projectId}.api.sanity.io/v${SANITY.apiVersion}/data/query/${SANITY.dataset}?query=${encodeURIComponent(QUERY)}`
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!response.ok) throw new Error(`Sanity responded ${response.status}`)

    const { result } = await response.json()
    const items = normalise(Array.isArray(result) ? result : [])
    if (!items.length) throw new Error('Sanity returned an empty menu')

    return items
  } catch (error) {
    console.warn('[menu] Falling back to the local menu snapshot:', error)
    return normalise(FALLBACK_MENU)
  }
}

const FALLBACK_MENU = [
  {
    name: 'Vegan Breakfast Bowl',
    price: 12.99,
    category: 'Breakfast',
    description:
      'A hearty bowl of quinoa, roasted sweet potatoes, sautéed spinach, and chickpeas. Topped with sliced avocado and a drizzle of tahini dressing.',
  },
  {
    name: 'Classic American Breakfast',
    price: 9.99,
    category: 'Breakfast',
    description:
      'Two eggs any style, crispy bacon or sausage links, and your choice of toast or English muffin. Served with hash browns or home fries.',
  },
  {
    name: 'Strawberry Banana French Toast',
    price: 7.99,
    category: 'Breakfast',
    description:
      'Thick-cut brioche dipped in a rich custard batter and grilled to golden brown. Topped with strawberries, bananas, and whipped cream.',
  },
  {
    name: 'Caesar Salad with Grilled Shrimp',
    price: 14.99,
    category: 'Lunch',
    description:
      'Crisp romaine tossed in a classic Caesar dressing and topped with grilled shrimp and shaved Parmesan. Served with garlic croutons.',
  },
  {
    name: 'Southwest Chicken Wrap',
    price: 12.99,
    category: 'Lunch',
    description:
      'Grilled chicken, black beans, corn, tomatoes, lettuce, and cheddar wrapped in a warm flour tortilla. Served with salsa and tortilla chips.',
  },
  {
    name: 'Grilled Veggie Panini',
    price: 11.99,
    category: 'Lunch',
    description:
      'Grilled zucchini, eggplant, bell peppers, and onions with melted provolone and a balsamic glaze. Served with mixed greens.',
  },
  {
    name: 'Grilled Ribeye Steak',
    price: 25.99,
    category: 'Dinner',
    description:
      'A juicy 12-ounce ribeye grilled to perfection and served with garlic mashed potatoes and seasonal vegetables.',
  },
  {
    name: 'Seared Salmon with Mango Salsa',
    price: 21.99,
    category: 'Dinner',
    description:
      'Fresh salmon filet seared and topped with a sweet and spicy mango salsa. Served with wild rice pilaf and steamed asparagus.',
  },
  {
    name: 'Vegetarian Pasta Primavera',
    price: 18.99,
    category: 'Dinner',
    description:
      'Sautéed zucchini, bell peppers, onions, and mushrooms tossed with penne in a light garlic herb sauce. Topped with Parmesan and basil.',
  },
  {
    name: 'Chicken Quesadilla',
    price: 10.99,
    category: 'Misc',
    description:
      'A warm flour tortilla stuffed with grilled chicken, cheddar, tomatoes, and green onions. Served with sour cream and salsa.',
  },
  {
    name: 'Sweet Potato Fries',
    price: 6.99,
    category: 'Misc',
    description: 'A generous portion of crispy sweet potato fries, lightly salted, with chipotle aioli for dipping.',
  },
  {
    name: 'Classic Vanilla Milkshake',
    price: 5.99,
    category: 'Misc',
    description: 'Thick and creamy, made with premium vanilla ice cream and topped with whipped cream and a cherry.',
  },
]
