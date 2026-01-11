// 相机皮套商品数据 - 使用京东CDN图片
// 京东图片CDN格式: https://img{N}.360buyimg.com/n{size}/{jfs路径}

// 产品类型定义
export interface Product {
  id: string
  name: string
  slogan: string
  price: number
  originalPrice?: number
  category: string
  brand: string
  model: string
  material?: string
  caseType?: string
  weight?: string
  colors: string[]
  specs: string[]
  images: string[]
  description: string
  features: {
    title: string
    description: string
    image: string
  }[]
  rating?: number
  reviews?: number
  inStock?: boolean
  stock?: number
}

// 京东图片URL配置
// 说明：请访问京东产品页面，获取真实的图片链接并替换以下URL
const JD_IMAGES = {
  // 京东CDN基础配置
  cdn: {
    base: 'https://img14.360buyimg.com',
    sizes: {
      large: 'n1',      // 800x800
      medium: 'n4',     // 450x450
      small: 'n5',      // 350x350
      detail: 'n0',     // 原图
    }
  },
  
  // 徕卡相机图片
  leica: {
    m11: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/9567/3/24326/89936/65379607Fef552ea8/0ccf4e4725b59d06.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/224173/16/941/89091/65379607Ffd23f3a4/65d0a3669f3b9700.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/182167/29/37088/71930/6537955dF316c91af/814b7f1715719f4b.jpg.avif',
    ],
    m11p: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/257630/19/8904/80315/677bb82eF01e9af56/e09933ed839b8bb2.png.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/224173/16/941/89091/65379607Ffd23f3a4/65d0a3669f3b9700.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/9567/3/24326/89936/65379607Fef552ea8/0ccf4e4725b59d06.jpg.avif',
    ],
    m10p: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/257630/19/8904/80315/677bb82eF01e9af56/e09933ed839b8bb2.png.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/224173/16/941/89091/65379607Ffd23f3a4/65d0a3669f3b9700.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/9567/3/24326/89936/65379607Fef552ea8/0ccf4e4725b59d06.jpg.avif',
    ],
    mev1: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/345669/28/15227/48848/68f72e34Ffc754678/68a454bddf72d44c.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/346716/15/15007/61553/68f72e34F2f317d57/59e32081a8637c06.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/342762/28/15979/44040/68f72e33F1a312ef0/1e7e4b31e86174f5.jpg.avif',
    ],
    q3: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/354820/12/15521/55535/691ecd52F269a931d/fe37baf8cefd3a47.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/368437/13/2857/19335/691ecd51F674e6e95/28adfa4e020dc902.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/361455/25/6977/29087/691ecd51F1677b94c/1571b4c694990b6d.jpg.avif',
    ],
    q2: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/354820/12/15521/55535/691ecd52F269a931d/fe37baf8cefd3a47.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/368437/13/2857/19335/691ecd51F674e6e95/28adfa4e020dc902.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/361455/25/6977/29087/691ecd51F1677b94c/1571b4c694990b6d.jpg.avif',
    ],
    sl3: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/9567/3/24326/89936/65379607Fef552ea8/0ccf4e4725b59d06.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/224173/16/941/89091/65379607Ffd23f3a4/65d0a3669f3b9700.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/182167/29/37088/71930/6537955dF316c91af/814b7f1715719f4b.jpg.avif',
    ],
  },
  
  // 哈苏相机图片
  hasselblad: {
    x2d: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/211494/16/48415/26610/6740484dF6b511f79/8f486c5598ece73f.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/218379/4/47689/26080/6740484cF860dc899/5607ec4e9bf16d8a.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/195523/37/51797/20865/672d7c06F9d243037/8ec722bc182a0fe7.jpg.avif',
    ],
    x1d: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/211494/16/48415/26610/6740484dF6b511f79/8f486c5598ece73f.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/218379/4/47689/26080/6740484cF860dc899/5607ec4e9bf16d8a.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/195523/37/51797/20865/672d7c06F9d243037/8ec722bc182a0fe7.jpg.avif',
    ],
    '907x': [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/250837/26/12897/24466/673c45aaFdb7b33b0/df5bd48adc23fe86.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/107959/30/42076/32024/64dee6edF3498f203/45f0ea53836abba0.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/217910/28/25653/30029/63e4cb08Fbe813423/8c5677a3b0c33c04.jpg.avif',
    ],
  },
  
  // 相机配件图片
  accessories: {
    strap: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/356786/5/13676/34422/691ef201F9997f178/962661c8ef49baef.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/360127/35/7738/46091/691ef201Ffe324f90/994f76251c3e9cef.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/356786/5/13676/34422/691ef201F9997f178/962661c8ef49baef.jpg.avif',
    ],
    wireless: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/385432/22/434/31717/69554bc3F8abc4b99/82d86e79522bff22.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/385432/22/434/31717/69554bc3F8abc4b99/82d86e79522bff22.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/385432/22/434/31717/69554bc3F8abc4b99/82d86e79522bff22.jpg.avif',
    ],
    filter: [
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/385362/24/814/25459/69554bceF3b233f97/9ddf5064d719767d.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/374267/13/21037/28239/69554bd8Fa42a3102/107a769b2d582945.jpg.avif',
      'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/385362/24/814/25459/69554bceF3b233f97/9ddf5064d719767d.jpg.avif',
    ],
  },
  
  // 备用图片（使用真实产品图片作为备用）
  fallback: {
    leica: 'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/9567/3/24326/89936/65379607Fef552ea8/0ccf4e4725b59d06.jpg.avif',
    hasselblad: 'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/211494/16/48415/26610/6740484dF6b511f79/8f486c5598ece73f.jpg.avif',
    camera: 'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/354820/12/15521/55535/691ecd52F269a931d/fe37baf8cefd3a47.jpg.avif',
    leather: 'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/356786/5/13676/34422/691ef201F9997f178/962661c8ef49baef.jpg.avif',
    accessories: 'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/385432/22/434/31717/69554bc3F8abc4b99/82d86e79522bff22.jpg.avif',
    vintage: 'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/257630/19/8904/80315/677bb82eF01e9af56/e09933ed839b8bb2.png.avif',
  },
  
  // 首页大图横幅
  hero: [
    'https://img12.360buyimg.com/cms/jfs/t1/105247/31/32892/151867/6316e966Ea7faeb4a/d16f15849553b36d.jpg',
    'https://img12.360buyimg.com/cms/jfs/t1/105247/31/32892/151867/6316e966Ea7faeb4a/d16f15849553b36d.jpg',
    'https://img12.360buyimg.com/cms/jfs/t1/105247/31/32892/151867/6316e966Ea7faeb4a/d16f15849553b36d.jpg',
    'https://img12.360buyimg.com/cms/jfs/t1/105247/31/32892/151867/6316e966Ea7faeb4a/d16f15849553b36d.jpg',
  ]
}

// 辅助函数：获取图片或使用备用
const getImage = (images: string[], fallback: string) => {
  // 检查是否为示例URL，如果是则使用备用图片
  const hasValidImages = images.every(url => !url.includes('example-'));
  return hasValidImages ? images : [fallback, fallback, fallback];
}

// 配件图片获取函数
const getAccessoryImage = (type: 'strap' | 'wireless' | 'filter', fallback: string) => {
  return getImage(JD_IMAGES.accessories[type], fallback);
}

export const products: Product[] = [
  // ========== 徕卡 M 系列皮套 ==========
  {
    id: '1',
    name: '徕卡 M11 真皮半身皮套',
    slogan: '经典设计，完美贴合',
    price: 1280,
    originalPrice: 1580,
    category: '徕卡 M 系列',
    brand: 'Leica',
    model: 'M11',
    colors: ['经典黑', '复古棕', '大地褐'],
    specs: [
      '意大利进口头层牛皮',
      '手工缝制，精密裁剪',
      '预留电池仓快速开口',
      '不影响三脚架使用',
      '底座防滑设计',
    ],
    images: getImage(JD_IMAGES.leica.m11, JD_IMAGES.fallback.leica),
    description: '专为徕卡 M11 设计的真皮半身皮套，采用意大利进口头层牛皮，手工缝制，完美贴合机身曲线，提供优质的握持手感和全方位保护。',
    features: [
      {
        title: '意大利头层牛皮',
        description: '选用意大利进口头层牛皮，质地柔软细腻，使用越久手感越好',
        image: JD_IMAGES.fallback.leather,
      },
      {
        title: '精密裁剪',
        description: '根据 M11 机身精确开模，所有按键、接口完美露出',
        image: JD_IMAGES.leica.m11[0] || JD_IMAGES.fallback.camera,
      },
      {
        title: '快速更换电池',
        description: '底部预留快速开口，无需取下皮套即可更换电池和存储卡',
        image: JD_IMAGES.fallback.accessories,
      },
    ],
    material: '意大利头层牛皮',
    caseType: '半身皮套',
    weight: '45g',
  },

  {
    id: '2',
    name: '徕卡 M10-P 复古全身皮套',
    slogan: '全方位保护，复古美学',
    price: 1580,
    originalPrice: 1880,
    category: '徕卡 M 系列',
    brand: 'Leica',
    model: 'M10-P',
    colors: ['复古棕', '经典黑', '橄榄绿'],
    specs: [
      '全包围设计，360度保护',
      '植鞣革工艺，天然环保',
      '可调节肩带接口',
      '内衬超细纤维',
      '磁扣快速开合',
    ],
    images: getImage(JD_IMAGES.leica.m10p, JD_IMAGES.fallback.leica),
    description: '为徕卡 M10-P 量身打造的复古全身皮套，采用植鞣革工艺，天然环保，提供全方位保护同时保留经典美学。',
    features: [
      {
        title: '植鞣革工艺',
        description: '采用传统植鞣革工艺，天然环保，使用时间越长色泽越润',
        image: JD_IMAGES.fallback.leather,
      },
      {
        title: '全包围保护',
        description: '360度全方位保护，有效防止碰撞和刮擦',
        image: JD_IMAGES.leica.m10p[0] || JD_IMAGES.fallback.leica,
      },
      {
        title: '磁扣设计',
        description: '磁扣快速开合，方便快速拍摄',
        image: JD_IMAGES.fallback.camera,
      },
    ],
    material: '植鞣革',
    caseType: '全身皮套',
    weight: '68g',
  },

  // ========== 徕卡 Q 系列皮套 ==========
  {
    id: '3',
    name: '徕卡 Q3 轻量半身套',
    slogan: '轻盈便携，随拍随走',
    price: 980,
    originalPrice: 1180,
    category: '徕卡 Q 系列',
    brand: 'Leica',
    model: 'Q3',
    colors: ['午夜黑', '石墨灰', '大地棕'],
    specs: [
      '超轻设计，仅重 35g',
      '高级纳帕真皮',
      '快速拆卸设计',
      '防滑纹理握持',
      '不阻挡任何按键',
    ],
    images: getImage(JD_IMAGES.leica.q3, JD_IMAGES.fallback.camera),
    description: '专为徕卡 Q3 打造的轻量半身套，采用高级纳帕真皮，轻盈便携，完美适配街拍需求。',
    features: [
      {
        title: '超轻设计',
        description: '仅重 35g，几乎感觉不到额外重量',
        image: JD_IMAGES.leica.q3[0] || JD_IMAGES.fallback.camera,
      },
      {
        title: '纳帕真皮',
        description: '选用高级纳帕真皮，柔软舒适，触感细腻',
        image: JD_IMAGES.fallback.leather,
      },
      {
        title: '街拍利器',
        description: '快速拆卸设计，随时应对街拍场景',
        image: JD_IMAGES.fallback.accessories,
      },
    ],
    material: '纳帕真皮',
    caseType: '半身皮套',
    weight: '35g',
  },

  {
    id: '4',
    name: '徕卡 Q2 Monochrom 限量版皮套',
    slogan: '致敬黑白，经典传承',
    price: 1680,
    originalPrice: 1980,
    category: '徕卡 Q 系列',
    brand: 'Leica',
    model: 'Q2 Monochrom',
    colors: ['纯黑', '银灰'],
    specs: [
      '限量编号版本',
      '法国进口小牛皮',
      'Monochrom 徽标雕刻',
      '手工法式车线',
      '赠送同款肩带',
    ],
    images: getImage(JD_IMAGES.leica.q2, JD_IMAGES.fallback.leica),
    description: '为徕卡 Q2 Monochrom 黑白相机特别设计的限量版皮套，每件均有独立编号，采用法国进口小牛皮制作。',
    features: [
      {
        title: '限量编号',
        description: '每件皮套均有独立编号，彰显收藏价值',
        image: JD_IMAGES.leica.q2[0] || JD_IMAGES.fallback.camera,
      },
      {
        title: '法国小牛皮',
        description: '选用法国进口小牛皮，质地细腻，触感奢华',
        image: JD_IMAGES.fallback.leather,
      },
      {
        title: '专属徽标',
        description: 'Monochrom 专属徽标雕刻，致敬黑白摄影',
        image: JD_IMAGES.fallback.vintage,
      },
    ],
    material: '法国小牛皮',
    caseType: '半身皮套',
    weight: '42g',
  },

  // ========== 哈苏 X 系列皮套 ==========
  {
    id: '5',
    name: '哈苏 X2D 100C 专业皮套',
    slogan: '中画幅旗舰，专属守护',
    price: 1880,
    originalPrice: 2280,
    category: '哈苏 X 系列',
    brand: 'Hasselblad',
    model: 'X2D 100C',
    colors: ['玄武黑', '钛金灰', '皇家蓝'],
    specs: [
      '中画幅专业设计',
      '瑞典进口头层牛皮',
      '加厚缓冲保护',
      '可调节手腕带',
      'CFV 100C 背部完美适配',
    ],
    images: getImage(JD_IMAGES.hasselblad.x2d, JD_IMAGES.fallback.hasselblad),
    description: '专为哈苏 X2D 100C 中画幅旗舰相机设计的专业皮套，采用瑞典进口头层牛皮，提供专业级保护。',
    features: [
      {
        title: '中画幅专用',
        description: '根据 X2D 100C 机身精确设计，完美贴合',
        image: JD_IMAGES.hasselblad.x2d[0] || JD_IMAGES.fallback.camera,
      },
      {
        title: '加厚保护',
        description: '内衬加厚缓冲材料，保护贵重的中画幅设备',
        image: JD_IMAGES.fallback.leather,
      },
      {
        title: '专业手腕带',
        description: '可调节专业手腕带，长时间拍摄更轻松',
        image: JD_IMAGES.fallback.hasselblad,
      },
    ],
    material: '瑞典头层牛皮',
    caseType: '半身皮套',
    weight: '85g',
  },

  {
    id: '6',
    name: '哈苏 X1D II 50C 经典皮套',
    slogan: '经典中画幅，优雅保护',
    price: 1680,
    originalPrice: 1980,
    category: '哈苏 X 系列',
    brand: 'Hasselblad',
    model: 'X1D II 50C',
    colors: ['经典黑', '森林绿', '勃艮第红'],
    specs: [
      '经典中画幅设计',
      '意大利植鞣革',
      '铜质按扣',
      '手工缝制',
      '兼容 XCD 镜头系列',
    ],
    images: getImage(JD_IMAGES.hasselblad.x1d, JD_IMAGES.fallback.hasselblad),
    description: '为哈苏 X1D II 50C 打造的经典皮套，采用意大利植鞣革，手工缝制，展现中画幅的优雅气质。',
    features: [
      {
        title: '意大利植鞣革',
        description: '采用意大利植鞣革，随使用时间逐渐形成独特包浆',
        image: JD_IMAGES.fallback.leather,
      },
      {
        title: '铜质按扣',
        description: '精选铜质按扣，经典耐用，彰显品质',
        image: JD_IMAGES.hasselblad.x1d[0] || JD_IMAGES.fallback.camera,
      },
      {
        title: '手工缝制',
        description: '每件皮套均为手工缝制，工艺精湛',
        image: JD_IMAGES.fallback.accessories,
      },
    ],
    material: '意大利植鞣革',
    caseType: '半身皮套',
    weight: '75g',
  },

  // ========== 哈苏 907X 系列皮套 ==========
  {
    id: '7',
    name: '哈苏 907X CFV 100C 套组皮套',
    slogan: '模块化设计，灵活保护',
    price: 2180,
    originalPrice: 2580,
    category: '哈苏 907X 系列',
    brand: 'Hasselblad',
    model: '907X CFV 100C',
    colors: ['经典黑', '太空银'],
    specs: [
      '模块化设计',
      '907X 机身专用',
      'CFV 100C 数码后背适配',
      '磁吸式快拆',
      '超细纤维内衬',
    ],
    images: getImage(JD_IMAGES.hasselblad['907x'], JD_IMAGES.fallback.hasselblad),
    description: '专为哈苏 907X CFV 100C 套组设计的模块化皮套，磁吸式快拆设计，完美适配模块化拍摄需求。',
    features: [
      {
        title: '模块化设计',
        description: '配合 907X 模块化系统，灵活组合使用',
        image: JD_IMAGES.hasselblad['907x'][0] || JD_IMAGES.fallback.camera,
      },
      {
        title: '磁吸快拆',
        description: '磁吸式设计，快速拆装，不耽误拍摄',
        image: JD_IMAGES.fallback.accessories,
      },
      {
        title: '双重保护',
        description: '同时保护 907X 机身和 CFV 100C 数码后背',
        image: JD_IMAGES.fallback.leather,
      },
    ],
    material: '德国小牛皮',
    caseType: '模块化皮套',
    weight: '95g',
  },

  // ========== 徕卡 SL 系列皮套 ==========
  {
    id: '8',
    name: '徕卡 SL3 专业握持套',
    slogan: '专业全幅，稳固握持',
    price: 1380,
    originalPrice: 1680,
    category: '徕卡 SL 系列',
    brand: 'Leica',
    model: 'SL3',
    colors: ['专业黑', '枪灰色'],
    specs: [
      '专业握持设计',
      '橡胶防滑纹理',
      '电池仓快速开口',
      '散热孔位预留',
      '三脚架孔位适配',
    ],
    images: getImage(JD_IMAGES.leica.sl3, JD_IMAGES.fallback.camera),
    description: '为徕卡 SL3 全画幅无反相机设计的专业握持套，增强握持稳定性，适合长时间专业拍摄。',
    features: [
      {
        title: '专业握持',
        description: '根据人体工学设计，长时间拍摄不累手',
        image: JD_IMAGES.leica.sl3[0] || JD_IMAGES.fallback.camera,
      },
      {
        title: '防滑设计',
        description: '橡胶防滑纹理，确保握持稳固',
        image: JD_IMAGES.fallback.accessories,
      },
      {
        title: '快速换电池',
        description: '电池仓快速开口，换电池无需拆套',
        image: JD_IMAGES.fallback.leather,
      },
    ],
    material: '真皮+橡胶',
    caseType: '握持套',
    weight: '55g',
  },

  // ========== 配件类产品 ==========
  {
    id: '9',
    name: '真皮相机肩带 - 徕卡款',
    slogan: '舒适背负，优雅出行',
    price: 580,
    originalPrice: 780,
    category: '相机配件',
    brand: 'Universal',
    model: '通用',
    colors: ['经典黑', '复古棕', '橄榄绿', '海军蓝'],
    specs: [
      '意大利头层牛皮',
      '可调节长度 90-140cm',
      '加宽肩垫设计',
      '快拆扣具',
      '适配所有徕卡相机',
    ],
    images: getAccessoryImage('strap', JD_IMAGES.fallback.leather),
    description: '意大利进口头层牛皮制作的相机肩带，加宽肩垫设计，长时间背负也舒适，适配所有徕卡相机。',
    features: [
      {
        title: '加宽肩垫',
        description: '40mm 加宽肩垫，分散重量，长时间背负更舒适',
        image: JD_IMAGES.fallback.leather,
      },
      {
        title: '可调长度',
        description: '90-140cm 可调节长度，适应不同身高和背负方式',
        image: JD_IMAGES.fallback.camera,
      },
      {
        title: '快拆设计',
        description: '快拆扣具，秒速安装拆卸',
        image: JD_IMAGES.fallback.accessories,
      },
    ],
    material: '意大利头层牛皮',
    caseType: '相机肩带',
    weight: '120g',
  },

  {
    id: '10',
    name: '真皮相机肩带 - 哈苏款',
    slogan: '中画幅专用，稳固舒适',
    price: 680,
    originalPrice: 880,
    category: '相机配件',
    brand: 'Universal',
    model: '通用',
    colors: ['太空银', '经典黑', '森林绿'],
    specs: [
      '加厚真皮材质',
      '中画幅专用加固',
      '可调节长度 85-135cm',
      '快拆金属扣',
      '适配所有哈苏相机',
    ],
    images: getAccessoryImage('strap', JD_IMAGES.fallback.hasselblad),
    description: '专为哈苏中画幅相机设计的加厚真皮肩带，承重更强，背负更稳，适配所有哈苏相机型号。',
    features: [
      {
        title: '加固设计',
        description: '针对中画幅相机重量，特别加固承重结构',
        image: JD_IMAGES.fallback.leather,
      },
      {
        title: '加厚皮革',
        description: '采用加厚真皮，承重能力更强',
        image: JD_IMAGES.fallback.camera,
      },
      {
        title: '金属扣具',
        description: '航空级铝合金扣具，安全可靠',
        image: JD_IMAGES.fallback.hasselblad,
      },
    ],
    material: '加厚头层牛皮',
    caseType: '相机肩带',
    weight: '145g',
  },
]

// 分类数据
export const categories = [
  {
    id: 'leica-m',
    name: '徕卡 M 系列',
    description: '经典旁轴相机皮套',
    models: ['M11', 'M10-P', 'M10-R', 'M10-D', 'M10'],
    image: JD_IMAGES.leica.m11[0] || JD_IMAGES.fallback.leica,
  },
  {
    id: 'leica-q',
    name: '徕卡 Q 系列',
    description: '固定镜头全幅相机皮套',
    models: ['Q3', 'Q2', 'Q2 Monochrom'],
    image: JD_IMAGES.leica.q3[0] || JD_IMAGES.fallback.hasselblad,
  },
  {
    id: 'leica-sl',
    name: '徕卡 SL 系列',
    description: '全画幅无反相机皮套',
    models: ['SL3', 'SL2', 'SL2-S'],
    image: JD_IMAGES.leica.sl3[0] || JD_IMAGES.fallback.camera,
  },
  {
    id: 'hasselblad-x',
    name: '哈苏 X 系列',
    description: '中画幅无反相机皮套',
    models: ['X2D 100C', 'X1D II 50C'],
    image: JD_IMAGES.hasselblad.x2d[0] || JD_IMAGES.fallback.hasselblad,
  },
  {
    id: 'hasselblad-907x',
    name: '哈苏 907X 系列',
    description: '模块化中画幅皮套',
    models: ['907X CFV 100C'],
    image: JD_IMAGES.hasselblad['907x'][0] || JD_IMAGES.fallback.camera,
  },
  {
    id: 'accessories',
    name: '相机配件',
    description: '肩带、手腕带等配件',
    models: ['通用'],
    image: JD_IMAGES.fallback.leather,
  },
]

// 获取所有商品
export const getAllProducts = () => products

// 根据 ID 获取商品
export const getProductById = (id: string) => {
  return products.find((p) => p.id === id)
}

// 根据分类获取商品
export const getProductsByCategory = (category: string) => {
  if (category.toLowerCase() === 'all') return products
  return products.filter((p) => 
    p.category.toLowerCase().includes(category.toLowerCase()) ||
    p.brand.toLowerCase().includes(category.toLowerCase())
  )
}

// 根据品牌获取商品
export const getProductsByBrand = (brand: string) => {
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
}

// 获取推荐商品
export const getFeaturedProducts = (limit: number = 4) => {
  return products.slice(0, limit)
}

// 获取所有品牌
export const getBrands = () => {
  return ['Leica', 'Hasselblad', 'Universal']
}

// 获取所有分类
export const getCategories = () => {
  return categories
}
