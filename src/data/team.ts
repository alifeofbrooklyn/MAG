import type { Text } from "./projects";

/**
 * ข้อมูลทีมผู้บริหาร — หน้า /th/team และ /en/team
 * ไม่ใส่ข้อมูลส่วนตัว (วันเกิด ที่อยู่บ้าน เบอร์/อีเมลส่วนตัว) บนเว็บสาธารณะ
 */
export type ExperienceGroup = {
  period: string;
  company?: string;
  projects: string[];
};
export type Member = {
  name: Text;
  role: Text;
  initials: string;
  education: Text[];
  positions: { period: string; title: string; company: string }[];
  experience: ExperienceGroup[];
};

export const team: Member[] = [
  {
    name: {
      en: "Chkri Jaova-javanil",
      th: "Chkri Jaova-javanil",
    },
    role: {
      en: "Managing Director",
      th: "กรรมการผู้จัดการ",
    },
    initials: "CJ",
    education: [
      {
        en: "Bachelor of Engineering (Civil Engineering), South East Asia University",
        th: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมโยธา มหาวิทยาลัยเอเชียอาคเนย์",
      },
    ],
    positions: [
      {
        period: "2018 – Present",
        title: "Managing Director",
        company: "MAG CONSULTANT Co., Ltd.",
      },
      {
        period: "2012 – Present",
        title: "Managing Director",
        company: "Arkcon Co., Ltd.",
      },
      {
        period: "2006 – 2007",
        title: "Project Manager",
        company: "Northcroft (Thailand) Co., Ltd.",
      },
    ],
    experience: [
      {
        period: "2012 – Present",
        company: "Managing Director / Project Director",
        projects: [
          "House@Sukhumvit Soi 54",
          "Chauvalit Mansion Service Apartment, Sukhumvit Soi 40",
          "Kasikorn Bank – 20 Branches",
          "Happy Condo Ladprao, Bangkok",
          "Serviced Apartment, Soi Nai Lert",
          "Ibis Hotel Krabi",
          "Somerset Lake Point, Sukhumvit Soi 16",
          "Centara Phu Pano Krabi",
          "Sermthai Plaza, Maha Sarakham",
          "Ananda Resort, Hua Hin",
          "The Willoe, Sukhumvit Soi 58",
        ],
      },
      {
        period: "2006 – 2007",
        company: "Northcroft (Thailand)",
        projects: ["Orengery Pattaya", "Amar Garden, Sukhumvit"],
      },
    ],
  },
  {
    name: {
      en: "Witsanu Baikasem",
      th: "Witsanu Baikasem",
    },
    role: {
      en: "Deputy Managing Director",
      th: "รองกรรมการผู้จัดการ",
    },
    initials: "WB",
    education: [
      {
        en: "Bachelor of Engineering (Civil Engineering), Sripatum University (SPU)",
        th: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมโยธา มหาวิทยาลัยศรีปทุม (SPU)",
      },
    ],
    positions: [
      {
        period: "2018 – Present",
        title: "Deputy Managing Director",
        company: "MAG CONSULTANT Co., Ltd.",
      },
      {
        period: "2015 – Present",
        title: "Managing Director",
        company: "WQS Co., Ltd.",
      },
      {
        period: "2009 – 2015",
        title: "Project Manager",
        company: "Cost Plan Co., Ltd.",
      },
    ],
    experience: [
      {
        period: "2015 – Present",
        company: "Quantity Surveyor",
        projects: [
          "Showroom Honda 18,000 m2",
          "Nine Honda",
          "Energy Hua Hin",
          "Wish Condo",
          "Lub.D Siem Reap",
          "Dplus Office",
          "Community mall (20,000 sq.m.)",
          "Dplus Factory",
          "Embassy (Europe) – Confidential",
          "Kluaynamthai Hospital – Learning Centre",
          "Private House (4,000 sq.m.)",
          "Sheraton Phuket",
          "I Sanook Huahin",
          "International School Bangkok (ISB)",
          "Thewphaingram School",
          "Ruamrudee Condo",
          "Float Market Phuket",
          "Condo @ Sriracha 40,000 m2",
          "Townhome 500 unit",
          "Mahanakorn Tower @71st Floor (M&E Cost Estimated)",
          "Condo @ Sukhumvit 23",
          "Sriracha Refinery (ESSO)",
          "Condominium Sukhumvit 23 by Habitat Group",
          "Wyndham Avalon Wongamat by Habitat Group",
          "SAVVI Ari4 Condominium by The Urban Property",
          "AERAS Condominium by The Urban Property",
          "Private House 2,000 m2",
          "SAVVI Phahol 2 Condominium by The Urban Property",
          "Private House (2,000 sq.m.) – Confidential",
          "Private office (1,500 sq.m.) – Confidential",
          "Boutique Hotel @ Ratchawong",
          "Government Marina – Confidential",
          "Lub.D Hostel Samui",
          "Lub.D Hostel Pha-Ngan",
          "Attitude Condominium Bangkok University",
        ],
      },
      {
        period: "2009 – 2015",
        company: "Quantity Surveyor",
        projects: [
          "Bangkok Patana School (2015/2016)",
          "Rai Saeng Ngam, Pak Chong (2014)",
          "Bangkok Patana School (2014/2015)",
          "Lub D, Phuket (2014)",
          "Shinta Mani – Phnom Penh, Cambodia (2014)",
          "Bangkok Patana School (2013/2014)",
          "Tmor Rung, Cambodia (2013)",
          "Royal Bay Inn Hotel, Siem Reap, Cambodia (2013)",
          "Renovation 2012 – Somerset Lake Point, Bangkok",
          "Renovation 2012 – Beverly Plaza Hotel, Pattaya",
          "Villas @ Bamboo Island, Cambodia (2012)",
          "M200 Hotel, Pattaya (2012)",
          "Bangkok Patana School (2012/2013)",
          "Pennsylvania Hotel, Pattaya (2011)",
          "I Sanook, Bangkok (2011)",
          "Renovation 2011 – Shinta Mani, Siem Reap",
          "Uni-Loft @ Chiang Mai (2010)",
          "MI2 Hotel, Bangkok (2010)",
          "The Pavilions, Phuket (2009)",
          "Powerwave Technologies, Chonburi (2009)",
          "Citibank, Bangkok (2009)",
        ],
      },
    ],
  },
  {
    name: {
      en: "Sirichai Prasitsangaree",
      th: "Sirichai Prasitsangaree",
    },
    role: {
      en: "Deputy Managing Director",
      th: "รองกรรมการผู้จัดการ",
    },
    initials: "SP",
    education: [
      {
        en: "Master of Engineering (Engineering Management), University of Technology Sydney, Australia",
        th: "วิศวกรรมศาสตรมหาบัณฑิต สาขาการบริหารงานวิศวกรรม University of Technology Sydney ประเทศออสเตรเลีย",
      },
      {
        en: "Bachelor of Engineering (Civil Engineering), King Mongkut's Institute of Technology Ladkrabang (KMITL)",
        th: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมโยธา สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (สจล.)",
      },
    ],
    positions: [
      {
        period: "2018 – Present",
        title: "Deputy Managing Director",
        company: "MAG CONSULTANT Co., Ltd.",
      },
      {
        period: "2005 – 2011",
        title: "Project Manager",
        company: "Cost Plan Co., Ltd.",
      },
      {
        period: "2003 – 2005",
        title: "Assistant to Vice President",
        company: "Italian-Thai Development PCL",
      },
    ],
    experience: [
      {
        period: "2015 – Present",
        company: "Quantity Surveyor",
        projects: [
          "Showroom Honda 18,000 m2",
          "Nine Honda",
          "Energy Hua Hin",
          "Wish Condo",
          "Lub.D Siem Reap",
          "Dplus Office",
          "Community mall (20,000 sq.m.)",
          "Dplus Factory",
          "Embassy (Europe) – Confidential",
          "Kluaynamthai Hospital – Learning Centre",
          "Private House (4,000 sq.m.)",
          "Sheraton Phuket",
          "I Sanook Huahin",
          "International School Bangkok (ISB)",
          "Thewphaingram School",
          "Ruamrudee Condo",
          "Float Market Phuket",
          "Condo @ Sriracha 40,000 m2",
          "Townhome 500 unit",
          "Mahanakorn Tower @71st Floor (M&E Cost Estimated)",
          "Condo @ Sukhumvit 23",
          "Sriracha Refinery (ESSO)",
          "Condominium Sukhumvit 23 by Habitat Group",
          "Wyndham Avalon Wongamat by Habitat Group",
          "SAVVI Ari4 Condominium by The Urban Property",
          "AERAS Condominium by The Urban Property",
          "Private House 2,000 m2",
          "SAVVI Phahol 2 Condominium by The Urban Property",
          "Private House (2,000 sq.m.) – Confidential",
          "Private office (1,500 sq.m.) – Confidential",
          "Boutique Hotel @ Ratchawong",
          "Government Marina – Confidential",
          "Lub.D Hostel Samui",
          "Lub.D Hostel Pha-Ngan",
          "Attitude Condominium Bangkok University",
        ],
      },
      {
        period: "2007 – 2008",
        company: "Quantity Surveyor",
        projects: [
          "Villa 23 & 35 – Trisara Phase C, Phuket (2008)",
          "Aquaminium Condo B, Royal Phuket Marina (2008)",
          "Luxury Villa, Royal Phuket Marina (2008)",
          "PTTPL Logistic Platform, Map Ta Phut (2008)",
          "Sitara Village, Koh Phangan (2007)",
          "Baan Sandoa, Hua Hin (2007)",
          "Baan Sanpruem, Hua Hin (2007)",
          "Renovation 2007 – The Oriental Hotel, Bangkok",
        ],
      },
      {
        period: "2003 – 2005",
        company: "Technical Engineer – Italian-Thai Development PCL",
        projects: ["Baan Ua-Athorn – 13 projects, Thailand"],
      },
    ],
  },
];
