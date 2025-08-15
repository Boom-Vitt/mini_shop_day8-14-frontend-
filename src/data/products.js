// Mock product data for Thai clothing store
export const categories = [
  { id: 'shirts', name: { th: 'เสื้อเชิ้ต', en: 'Shirts' } },
  { id: 'pants', name: { th: 'กางเกง', en: 'Pants' } },
  { id: 'dresses', name: { th: 'ชุดเดรส', en: 'Dresses' } },
  { id: 'skirts', name: { th: 'กระโปรง', en: 'Skirts' } },
  { id: 'traditional', name: { th: 'ชุดไทย', en: 'Traditional Thai' } },
  { id: 'accessories', name: { th: 'เครื่องประดับ', en: 'Accessories' } }
];

export const products = [
  {
    id: '1',
    name: { th: 'เสื้อเชิ้ตผ้าไหมไทย', en: 'Thai Silk Shirt' },
    description: { 
      th: 'เสื้อเชิ้ตผ้าไหมไทยแท้ สีสวย ใส่สบาย เหมาะกับทุกโอกาส',
      en: 'Authentic Thai silk shirt with beautiful colors, comfortable to wear, suitable for all occasions'
    },
    price: 1200,
    category: 'shirts',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['น้ำเงิน', 'แดง', 'เขียว'],
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: { th: 'ชุดผ้าไทยประยุกต์', en: 'Modern Thai Dress' },
    description: { 
      th: 'ชุดผ้าไทยสไตล์โมเดิร์น ผสมผสานความเป็นไทยกับความทันสมัย',
      en: 'Modern Thai dress combining traditional Thai elements with contemporary style'
    },
    price: 2500,
    category: 'traditional',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['ทอง', 'เงิน', 'น้ำเงิน'],
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: { th: 'กางเกงผ้าฝ้าย', en: 'Cotton Pants' },
    description: { 
      th: 'กางเกงผ้าฝ้าย 100% นุ่มสบาย ระบายอากาศดี',
      en: '100% cotton pants, soft and comfortable with good breathability'
    },
    price: 800,
    category: 'pants',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['ขาว', 'ดำ', 'เทา'],
    inStock: true,
    featured: false
  },
  {
    id: '4',
    name: { th: 'เดรสลายดอกไม้', en: 'Floral Dress' },
    description: { 
      th: 'เดรสลายดอกไม้สวย ผ้าเนื้อดี ใส่สบาย เหมาะกับสาวๆ',
      en: 'Beautiful floral dress with quality fabric, comfortable to wear, perfect for ladies'
    },
    price: 1500,
    category: 'dresses',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['ชมพู', 'ฟ้า', 'เหลือง'],
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: { th: 'กระโปรงยีนส์', en: 'Denim Skirt' },
    description: { 
      th: 'กระโปรงยีนส์คุณภาพดี ทรงสวย ใส่ได้หลายโอกาส',
      en: 'High-quality denim skirt with beautiful cut, suitable for various occasions'
    },
    price: 900,
    category: 'skirts',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=400'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['น้ำเงินเข้ม', 'น้ำเงินอ่อน'],
    inStock: false,
    featured: false
  },
  {
    id: '6',
    name: { th: 'สร้อยคอเงินไทย', en: 'Thai Silver Necklace' },
    description: { 
      th: 'สร้อยคอเงินไทยแท้ ลายไทยประยุกต์ สวยงาม',
      en: 'Authentic Thai silver necklace with modern Thai patterns, beautiful design'
    },
    price: 3500,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'
    ],
    sizes: ['One Size'],
    colors: ['เงิน'],
    inStock: true,
    featured: true
  },
  {
    id: '7',
    name: { th: 'เสื้อโปโลผู้ชาย', en: 'Men\'s Polo Shirt' },
    description: { 
      th: 'เสื้อโปโลผู้ชาย ผ้าคุณภาพดี ใส่สบาย เหมาะกับการทำงาน',
      en: 'Men\'s polo shirt with quality fabric, comfortable to wear, suitable for work'
    },
    price: 650,
    category: 'shirts',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['ขาว', 'ดำ', 'น้ำเงิน', 'เทา'],
    inStock: true,
    featured: false
  },
  {
    id: '8',
    name: { th: 'ชุดไทยจิตรลดา', en: 'Thai Chitralada Dress' },
    description: { 
      th: 'ชุดไทยจิตรลดา ผ้าไหมแท้ เหมาะกับงานพิธีการ',
      en: 'Thai Chitralada dress in authentic silk, perfect for formal ceremonies'
    },
    price: 4500,
    category: 'traditional',
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['ทอง', 'น้ำเงิน', 'แดงเข้ม'],
    inStock: true,
    featured: true
  }
];

// Mock API functions
export const mockAPI = {
  // Get all products
  getProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 500);
    });
  },

  // Get product by ID
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find(p => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, 300);
    });
  },

  // Get products by category
  getProductsByCategory: (categoryId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredProducts = products.filter(p => p.category === categoryId);
        resolve(filteredProducts);
      }, 400);
    });
  },

  // Search products
  searchProducts: (query, lang = 'th') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredProducts = products.filter(product => 
          product.name[lang].toLowerCase().includes(query.toLowerCase()) ||
          product.description[lang].toLowerCase().includes(query.toLowerCase())
        );
        resolve(filteredProducts);
      }, 600);
    });
  },

  // Get featured products
  getFeaturedProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featuredProducts = products.filter(p => p.featured);
        resolve(featuredProducts);
      }, 300);
    });
  }
};
