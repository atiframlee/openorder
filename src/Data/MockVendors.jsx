// // src/Data/mockVendors.js

// // Helper to auto-generate label from time
// const generateLabelFromTime = (time24) => {
//   if (!time24) return '';
//   const [hours, minutes] = time24.split(':').map(Number);
//   const period = hours >= 12 ? 'pm' : 'am';
//   let displayHours = hours % 12;
//   if (displayHours === 0) displayHours = 12;
//   return `${displayHours}${period}`;
// };

// // Helper to get next available date based on opening days
// const getNextAvailableDate = (openingDays, startDate = new Date()) => {
//   const date = new Date(startDate);
//   const today = new Date();
  
//   // Start from tomorrow if today is not available
//   if (openingDays.includes(today.toLocaleDateString('en-US', { weekday: 'short' }))) {
//     date.setDate(date.getDate() + 1);
//   } else {
//     date.setDate(date.getDate() + 1);
//   }
  
//   for (let i = 0; i < 30; i++) { // Prevent infinite loop
//     const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
//     if (openingDays.includes(dayName)) {
//       return date.toISOString().split('T')[0];
//     }
//     date.setDate(date.getDate() + 1);
//   }
  
//   return null; // No available date found
// };

// export const mockVendors = [
//   // 🍚 VENDOR 1: Vendor Nasi Kerabu
//   {
//     id: 'v001',
//     name: 'Vendor Nasi Kerabu',
//     location: 'Taman Sri Muda, Shah Alam',
//     lat: 3.0201,
//     lng: 101.5309,
//     distance: 8.2,
//     rating: { avg: 4.8, count: 124 },
//     delivery: { self: true, radius_km: 5, fee: { base: 4.0, min_order_free: 35.0 } },
//     pickup: true,
//     status: 'active',
    
//     menus: [
//       {
//         id: 'm001',
//         name: 'Nasi Kerabu',
//         description: 'Blue rice with shredded chicken, solok lada, budu, ulam',
//         basePrice: 12.0,
//         image: 'nasikerabu.jpg',
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Good description, approved for sale',
        
//         openSlots: [
//           { 
//             id: 'slot_0800_mon', 
//             day: 'Mon', 
//             time: '08:00', 
//             // label: '8am',  // ✅ REMOVED - Auto-generated
//             cutoff: '07:00',
//             inventory: 15,
//             date: '2025-12-08',
//             status: 'active'
//           },
//           { 
//             id: 'slot_0900_mon', 
//             day: 'Mon', 
//             time: '09:00', 
//             // label: '9am',  // ✅ REMOVED - Auto-generated
//             cutoff: '08:00',
//             inventory: 12,
//             date: '2025-12-08',
//             status: 'active'
//           },
//           { 
//             id: 'slot_1200_mon', 
//             day: 'Mon', 
//             time: '12:00', 
//             // label: '12pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '11:00',
//             inventory: 10,
//             date: '2025-12-08',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.9, count: 89 },
//         soldCount: 156,
//         customizationGroups: [
//           {
//             id: 'protein',
//             name: 'Protein',
//             type: 'single',
//             required: true,
//             options: [
//               { id: 'ayam', name: 'Ayam (Shredded)', price: 0.0, isDefault: true },
//               { id: 'ikan', name: 'Ikan (Grilled Fish)', price: 3.0 },
//               { id: 'telur', name: 'Hard Boiled Egg', price: 2.0 }
//             ]
//           }
//         ]
//       },
//       {
//         id: 'm002',
//         name: 'Nasi Dagang',
//         description: 'Steamed rice with fish curry, pickled vegetables, and sambal',
//         basePrice: 14.0,
//         image: null,
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_0800_mon', 
//             day: 'Mon', 
//             time: '08:00', 
//             // label: '8am',  // ✅ REMOVED - Auto-generated
//             cutoff: '07:00',
//             inventory: 10,
//             date: '2025-12-08',
//             status: 'active'
//           },
//           { 
//             id: 'slot_0900_mon', 
//             day: 'Mon', 
//             time: '09:00', 
//             // label: '9am',  // ✅ REMOVED - Auto-generated
//             cutoff: '08:00',
//             inventory: 8,
//             date: '2025-12-08',
//             status: 'active'
//           },
//           { 
//             id: 'slot_1200_mon', 
//             day: 'Mon', 
//             time: '12:00', 
//             // label: '12pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '11:00',
//             inventory: 12,
//             date: '2025-12-08',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.7, count: 67 },
//         soldCount: 98
//       },
//       {
//         id: 'm003',
//         name: 'Nasi Berlauk Ayam',
//         description: 'Steamed rice with chicken lauk, vegetables, and sambal',
//         basePrice: 10.0,
//         image: 'nasiberlauk.jpg',
//         status: 'pending',
        
//         openSlots: [],
        
//         menuRating: { avg: 4.6, count: 54 },
//         soldCount: 134,
//         customizationGroups: [
//           {
//             id: 'spicy',
//             name: 'Spicy Level',
//             type: 'single',
//             required: false,
//             options: [
//               { id: 'mild', name: 'Mild', price: 0.0, isDefault: true },
//               { id: 'medium', name: 'Medium', price: 0.0 },
//               { id: 'hot', name: 'Hot', price: 0.0 }
//             ]
//           }
//         ]
//       },
//       {
//         id: 'm004',
//         name: 'Nasi Berlauk Ikan',
//         description: 'Steamed rice with fish lauk, vegetables, and sambal',
//         basePrice: 11.0,
//         image: null,
//         status: 'rejected',
        
//         openSlots: [],
        
//         menuRating: { avg: 4.8, count: 72 },
//         soldCount: 89
//       }
//     ]
//   },

//   // 🥟 VENDOR 2: Capatees Brother (Weekend only)
//   {
//     id: 'v002',
//     name: 'Capatees Brother',
//     location: 'Bukit Rahman Putra',
//     lat: 3.245,
//     lng: 101.5921,
//     distance: 5.3,
//     rating: { avg: 4.7, count: 89 },
//     delivery: { self: true, radius_km: 6, fee: { base: 5.0, min_order_free: 50.0 } },
//     pickup: true,
//     status: 'active',
    
//     menus: [
//       {
//         id: 'm005',
//         name: 'Beef Curry Capati',
//         description: 'Whole wheat chapati with rich beef curry',
//         basePrice: 28.0,
//         image: 'capatibeef.jpeg',
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_0900_sat', 
//             day: 'Sat', 
//             time: '09:00', 
//             // label: '9am',  // ✅ REMOVED - Auto-generated
//             cutoff: '08:00',
//             inventory: 8,
//             date: '2025-12-13',
//             status: 'active'
//           },
//           { 
//             id: 'slot_1400_sat', 
//             day: 'Sat', 
//             time: '14:00', 
//             // label: '2pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '13:00',
//             inventory: 6,
//             date: '2025-12-13',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.9, count: 45 },
//         soldCount: 78
//       },
//       {
//         id: 'm006',
//         name: 'Mutton Curry Capati',
//         description: 'Whole wheat chapati with aromatic mutton curry',
//         basePrice: 32.0,
//         image: null,
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_0900_sat', 
//             day: 'Sat', 
//             time: '09:00', 
//             // label: '9am',  // ✅ REMOVED - Auto-generated
//             cutoff: '08:00',
//             inventory: 6,
//             date: '2025-12-13',
//             status: 'active'
//           },
//           { 
//             id: 'slot_1400_sat', 
//             day: 'Sat', 
//             time: '14:00', 
//             // label: '2pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '13:00',
//             inventory: 5,
//             date: '2025-12-13',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.8, count: 38 },
//         soldCount: 65
//       },
//       {
//         id: 'm007',
//         name: 'Chicken Keema Capati',
//         description: 'Minced chicken curry with chapati',
//         basePrice: 25.0,
//         image: 'capatikeema.webp',
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_0900_sat', 
//             day: 'Sat', 
//             time: '09:00', 
//             // label: '9am',  // ✅ REMOVED - Auto-generated
//             cutoff: '08:00',
//             inventory: 12,
//             date: '2025-12-13',
//             status: 'active'
//           },
//           { 
//             id: 'slot_1400_sat', 
//             day: 'Sat', 
//             time: '14:00', 
//             // label: '2pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '13:00',
//             inventory: 10,
//             date: '2025-12-13',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.6, count: 52 },
//         soldCount: 91,
//         customizationGroups: [
//           {
//             id: 'spicy',
//             name: 'Spicy Level',
//             type: 'single',
//             required: false,
//             options: [
//               { id: 'mild', name: 'Mild', price: 0.0, isDefault: true },
//               { id: 'spicy', name: 'Extra Spicy', price: 0.0 }
//             ]
//           }
//         ]
//       },
//       {
//         id: 'm008',
//         name: 'Beef Keema Capati',
//         description: 'Minced beef curry with chapati',
//         basePrice: 28.0,
//         image: null,
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_0900_sat', 
//             day: 'Sat', 
//             time: '09:00', 
//             // label: '9am',  // ✅ REMOVED - Auto-generated
//             cutoff: '08:00',
//             inventory: 9,
//             date: '2025-12-13',
//             status: 'active'
//           },
//           { 
//             id: 'slot_1400_sat', 
//             day: 'Sat', 
//             time: '14:00', 
//             // label: '2pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '13:00',
//             inventory: 7,
//             date: '2025-12-13',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.7, count: 41 },
//         soldCount: 73
//       }
//     ]
//   },

//   // 🍔 VENDOR 3: Smashing Burger (Fri-Sat)
//   {
//     id: 'v003',
//     name: 'Smashing Burger',
//     location: 'Section 17, Petaling Jaya',
//     lat: 3.1167,
//     lng: 101.6333,
//     distance: 3.1,
//     rating: { avg: 4.6, count: 156 },
//     delivery: { self: true, radius_km: 4, fee: { base: 3.5 } },
//     pickup: true,
//     status: 'active',
    
//     menus: [
//       {
//         id: 'm009',
//         name: 'Smash Burger Regular',
//         description: 'Single patty smash burger with cheese, pickles, special sauce',
//         basePrice: 12.0,
//         image: 'smashburger.jpg',
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_1800_fri', 
//             day: 'Fri', 
//             time: '18:00', 
//             // label: '6pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '17:00',
//             inventory: 25,
//             date: '2025-12-05',
//             status: 'active'
//           },
//           { 
//             id: 'slot_2100_fri', 
//             day: 'Fri', 
//             time: '21:00', 
//             // label: '9pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '20:00',
//             inventory: 20,
//             date: '2025-12-05',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.5, count: 87 },
//         soldCount: 145,
//         customizationGroups: [
//           {
//             id: 'sauce',
//             name: 'Sauce',
//             type: 'single',
//             required: true,
//             options: [
//               { id: 'special', name: 'Special Sauce', price: 0.0, isDefault: true },
//               { id: 'sambal', name: 'Sambal Mayo', price: 1.0 },
//               { id: 'bbq', name: 'BBQ Sauce', price: 0.0 }
//             ]
//           }
//         ]
//       },
//       {
//         id: 'm010',
//         name: 'Double Patty Smash Burger',
//         description: 'Double patty smash burger with double cheese, pickles, special sauce',
//         basePrice: 18.0,
//         image: null,
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_1800_fri', 
//             day: 'Fri', 
//             time: '18:00', 
//             // label: '6pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '17:00',
//             inventory: 20,
//             date: '2025-12-05',
//             status: 'active'
//           },
//           { 
//             id: 'slot_2100_fri', 
//             day: 'Fri', 
//             time: '21:00', 
//             // label: '9pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '20:00',
//             inventory: 15,
//             date: '2025-12-05',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.7, count: 76 },
//         soldCount: 123
//       },
//       {
//         id: 'm011',
//         name: 'Special Smash Burger',
//         description: 'Triple patty with bacon, egg, special sauce, premium ingredients',
//         basePrice: 25.0,
//         image: null,
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_1800_fri', 
//             day: 'Fri', 
//             time: '18:00', 
//             // label: '6pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '17:00',
//             inventory: 15,
//             date: '2025-12-05',
//             status: 'active'
//           },
//           { 
//             id: 'slot_2100_fri', 
//             day: 'Fri', 
//             time: '21:00', 
//             // label: '9pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '20:00',
//             inventory: 12,
//             date: '2025-12-05',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.8, count: 65 },
//         soldCount: 98,
//         customizationGroups: [
//           {
//             id: 'topping',
//             name: 'Premium Toppings',
//             type: 'multi',
//             required: false,
//             options: [
//               { id: 'bacon', name: 'Bacon', price: 3.0 },
//               { id: 'egg', name: 'Fried Egg', price: 2.0 },
//               { id: 'avocado', name: 'Avocado', price: 4.0 },
//               { id: 'mushroom', name: 'Grilled Mushroom', price: 2.5 }
//             ]
//           }
//         ]
//       },
//       {
//         id: 'm012',
//         name: 'Benjo Burger',
//         description: 'Our signature burger with special sauce and unique ingredients',
//         basePrice: 22.0,
//         image: null,
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_1800_fri', 
//             day: 'Fri', 
//             time: '18:00', 
//             // label: '6pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '17:00',
//             inventory: 18,
//             date: '2025-12-05',
//             status: 'active'
//           },
//           { 
//             id: 'slot_2100_fri', 
//             day: 'Fri', 
//             time: '21:00', 
//             // label: '9pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '20:00',
//             inventory: 14,
//             date: '2025-12-05',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.9, count: 58 },
//         soldCount: 87
//       }
//     ]
//   },

//   // 🍗 VENDOR 4: Ayam Gepuk Pak Seladang (Tue-Thu-Sat)
//   {
//     id: 'v004',
//     name: 'Ayam Gepuk Pak Seladang',
//     location: 'Plaza Mentari, Sri Damansara',
//     lat: 3.2047,
//     lng: 101.6375,
//     distance: 2.1,
//     rating: { avg: 4.9, count: 78 },
//     delivery: { self: true, radius_km: 5, fee: { base: 3.0, min_order_free: 25.0 } },
//     pickup: true,
//     status: 'active',
    
//     menus: [
//       {
//         id: 'm013',
//         name: 'Ayam Gepuk',
//         description: 'Fried chicken with sambal, rice, and vegetables',
//         basePrice: 15.0,
//         image: 'ayamgepuk.webp',
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_1100_tue', 
//             day: 'Tue', 
//             time: '11:00', 
//             // label: '11am',  // ✅ REMOVED - Auto-generated
//             cutoff: '10:00',
//             inventory: 20,
//             date: '2025-12-09',
//             status: 'active'
//           },
//           { 
//             id: 'slot_1700_tue', 
//             day: 'Tue', 
//             time: '17:00', 
//             // label: '5pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '16:00',
//             inventory: 18,
//             date: '2025-12-09',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.9, count: 92 },
//         soldCount: 201
//       },
//       {
//         id: 'm014',
//         name: 'Ikan Gepuk',
//         description: 'Fried fish with sambal, rice, and vegetables',
//         basePrice: 18.0,
//         image: null,
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_1100_tue', 
//             day: 'Tue', 
//             time: '11:00', 
//             // label: '11am',  // ✅ REMOVED - Auto-generated
//             cutoff: '10:00',
//             inventory: 12,
//             date: '2025-12-09',
//             status: 'active'
//           },
//           { 
//             id: 'slot_1700_tue', 
//             day: 'Tue', 
//             time: '17:00', 
//             // label: '5pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '16:00',
//             inventory: 10,
//             date: '2025-12-09',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.7, count: 67 },
//         soldCount: 145
//       },
//       {
//         id: 'm015',
//         name: 'Nasi Ayam',
//         description: 'Poached chicken with rice, soup, and condiments',
//         basePrice: 12.0,
//         image: null,
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_1100_tue', 
//             day: 'Tue', 
//             time: '11:00', 
//             // label: '11am',  // ✅ REMOVED - Auto-generated
//             cutoff: '10:00',
//             inventory: 22,
//             date: '2025-12-09',
//             status: 'active'
//           },
//           { 
//             id: 'slot_1700_tue', 
//             day: 'Tue', 
//             time: '17:00', 
//             // label: '5pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '16:00',
//             inventory: 20,
//             date: '2025-12-09',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.6, count: 89 },
//         soldCount: 178,
//         customizationGroups: [
//           {
//             id: 'sauce',
//             name: 'Sauce',
//             type: 'single',
//             required: false,
//             options: [
//               { id: 'soy', name: 'Soy Sauce', price: 0.0, isDefault: true },
//               { id: 'chili', name: 'Chili Sauce', price: 0.0 },
//               { id: 'garlic', name: 'Garlic Sauce', price: 0.0 }
//             ]
//           }
//         ]
//       },
//       {
//         id: 'm016',
//         name: 'Soto',
//         description: 'Malay soup with chicken, rice noodles, and herbs',
//         basePrice: 10.0,
//         image: null,
//         status: 'approved',
//         approvalDate: '2025-12-01',
//         approvalNotes: 'Approved',
        
//         openSlots: [
//           { 
//             id: 'slot_1100_tue', 
//             day: 'Tue', 
//             time: '11:00', 
//             // label: '11am',  // ✅ REMOVED - Auto-generated
//             cutoff: '10:00',
//             inventory: 18,
//             date: '2025-12-09',
//             status: 'active'
//           },
//           { 
//             id: 'slot_1700_tue', 
//             day: 'Tue', 
//             time: '17:00', 
//             // label: '5pm',  // ✅ REMOVED - Auto-generated
//             cutoff: '16:00',
//             inventory: 16,
//             date: '2025-12-09',
//             status: 'active'
//           }
//         ],
        
//         menuRating: { avg: 4.5, count: 74 },
//         soldCount: 134
//       }
//     ]
//   }
// ];



// src/Data/mockVendors.js

// 🎛️ CONFIG: Simulate "today" for development
// Change this to test different days!
// e.g., new Date('2025-12-16T15:00:00') → pretend it's Tue, Dec 16, 3pm
const mockNow = new Date(); // ← Keep as real time for now
// const mockNow = new Date('2025-12-16T15:00:00'); // ← Uncomment to simulate

// Helper: Get date string for N days from mockNow (start of day)
const dateInDays = (days) => {
  const d = new Date(mockNow);
  d.setDate(d.getDate() + days);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Helper: Get weekday short name (e.g., 'Mon') from YYYY-MM-DD
const getDayName = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'short' });
};

// Helper: Generate time label from 24h time (e.g., '08:30' → '8:30am')
const generateLabelFromTime = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'pm' : 'am';
  let displayHours = hours % 12;
  if (displayHours === 0) displayHours = 12;
  const mins = minutes === 0 ? '' : `:${minutes.toString().padStart(2, '0')}`;
  return `${displayHours}${mins}${period}`;
};

// Helper: Create slot ID (prevents collision)
let slotCounter = 1;
const makeSlotId = (prefix = 'slot') => `${prefix}_${String(slotCounter++).padStart(4, '0')}`;

// Helper: Build slot with auto day & label
const makeSlot = ({ day, time, cutoff, inventory, date, status = 'active' }) => {
  const dayName = typeof day === 'string' ? day : getDayName(date);
  return {
    id: makeSlotId(),
    day: dayName,
    time,
    cutoff,
    inventory,
    date,
    status,
    // label is NOT stored — use generateLabelFromTime(time) dynamically
  };
};

// Helper: Create recurring slots for given days & times over N weeks
const makeRecurringSlots = ({
  recurringDays = [], // e.g., ['Mon', 'Wed']
  times = [],         // e.g., [{ time: '08:00', cutoff: '07:00', inventory: 15 }]
  weeks = 3,
}) => {
  const slots = [];
  const startDate = new Date(mockNow);
  startDate.setDate(startDate.getDate() + 1); // start from tomorrow

  for (let week = 0; week < weeks; week++) {
    for (let i = 0; i < 7; i++) {
      const candidate = new Date(startDate);
      candidate.setDate(candidate.getDate() + week * 7 + i);
      const dayName = candidate.toLocaleDateString('en-US', { weekday: 'short' });
      if (recurringDays.includes(dayName)) {
        times.forEach(({ time, cutoff, inventory }) => {
          slots.push(makeSlot({
            day: dayName,
            time,
            cutoff,
            inventory,
            date: candidate.toISOString().split('T')[0],
          }));
        });
      }
    }
  }
  return slots;
};

// Reset counter for clean IDs each load
slotCounter = 1;

// —————— VENDORS ——————
export const mockVendors = [
  // 🍚 VENDOR 1: Vendor Nasi Kerabu — Mon/Wed recurring
  // 🍚 VENDOR 1: Vendor Nasi Kerabu — 10 menus
{
  id: 'v001',
  name: 'Vendor Nasi Kerabu',
  location: 'Taman Sri Muda, Shah Alam',
  lat: 3.0201,
  lng: 101.5309,
  distance: 8.2,
  rating: { avg: 4.8, count: 124 },
  delivery: { self: true, radius_km: 5, fee: { base: 4.0, min_order_free: 35.0 } },
  pickup: true,
  status: 'active',
  
  menus: [
    // ✅ m001: Approved — has past, today, tomorrow, future recurring
    {
      id: 'm001',
      name: 'Nasi Kerabu (Classic)',
      description: 'Blue rice with shredded chicken, solok lada, budu, ulam',
      basePrice: 12.0,
      image: 'nasikerabu.jpg',
      status: 'approved',
      approvalDate: '2025-12-01',
      approvalNotes: 'Good description, approved for sale',
      
      openSlots: [
        // ❌ Past (completed)
        makeSlot({ time: '08:00', cutoff: '07:00', inventory: 0, date: dateInDays(-3), status: 'completed' }),
        makeSlot({ time: '12:00', cutoff: '11:00', inventory: 0, date: dateInDays(-1), status: 'completed' }),
        
        // ✅ Today — later slot (e.g. 18:00 if time < 18:00)
        makeSlot({ time: '18:00', cutoff: '17:00', inventory: 6, date: dateInDays(0) }),
        
        // ✅ Tomorrow
        makeSlot({ time: '09:00', cutoff: '08:00', inventory: 15, date: dateInDays(1) }),
        
        // 🔄 Future recurring (Mon only, next 3 weeks)
        ...makeRecurringSlots({
          recurringDays: ['Mon'],
          times: [
            { time: '08:00', cutoff: '07:00', inventory: 20 },
            { time: '12:00', cutoff: '11:00', inventory: 12 },
          ],
          weeks: 3,
        }).slice(0, 4), // just 4 future for brevity
      ],
      
      menuRating: { avg: 4.9, count: 89 },
      soldCount: 156,
      customizationGroups: [
        {
          id: 'protein',
          name: 'Protein',
          type: 'single',
          required: true,
          options: [
            { id: 'ayam', name: 'Ayam (Shredded)', price: 0.0, isDefault: true },
            { id: 'ikan', name: 'Ikan (Grilled Fish)', price: 3.0 },
            { id: 'telur', name: 'Hard Boiled Egg', price: 2.0 }
          ]
        }
      ]
    },

    // ✅ m002: Approved — recurring Wed/Sat, future only
    {
      id: 'm002',
      name: 'Nasi Dagang',
      description: 'Steamed rice with fish curry, pickled vegetables, and sambal',
      basePrice: 14.0,
      image: 'nasidagang.jpg',
      status: 'approved',
      approvalDate: '2025-12-01',
      approvalNotes: 'Approved',
      
      openSlots: makeRecurringSlots({
        recurringDays: ['Wed', 'Sat'],
        times: [
          { time: '10:00', cutoff: '09:00', inventory: 12 },
          { time: '15:00', cutoff: '14:00', inventory: 10 },
        ],
        weeks: 2,
      }).slice(0, 4), // 4 slots
      
      menuRating: { avg: 4.7, count: 67 },
      soldCount: 98
    },

    // ✅ m003: Approved — **only future**, no today/tomorrow (e.g., weekend special)
    {
      id: 'm003',
      name: 'Nasi Kerabu Special (Weekend)',
      description: 'Upgraded with smoked fish, extra ulam, and homemade budu',
      basePrice: 18.0,
      image: null,
      status: 'approved',
      approvalDate: '2025-12-05',
      approvalNotes: 'Premium version, approved',
      
      openSlots: makeRecurringSlots({
        recurringDays: ['Sat', 'Sun'],
        times: [
          { time: '09:00', cutoff: '08:00', inventory: 8 },
          { time: '13:00', cutoff: '12:00', inventory: 6 },
        ],
        weeks: 2,
      }),
      
      menuRating: { avg: 5.0, count: 24 },
      soldCount: 41,
      customizationGroups: [
        {
          id: 'sambal',
          name: 'Sambal Type',
          type: 'single',
          required: true,
          options: [
            { id: 'original', name: 'Original Budu Sambal', price: 0.0, isDefault: true },
            { id: 'spicy', name: 'Extra Spicy Sambal', price: 0.0 },
          ]
        }
      ]
    },

    // ✅ m004: Approved — **sold out today**, future still available
    {
      id: 'm004',
      name: 'Nasi Kerabu Mini',
      description: 'Smaller portion, perfect for kids or light appetite',
      basePrice: 8.0,
      image: null,
      status: 'approved',
      approvalDate: '2025-12-02',
      approvalNotes: 'Approved for trial',
      
      openSlots: [
        // ✅ Today — but sold out
        makeSlot({ time: '12:00', cutoff: '11:00', inventory: 0, date: dateInDays(0), status: 'active' }),
        // ✅ Tomorrow — available
        makeSlot({ time: '12:00', cutoff: '11:00', inventory: 20, date: dateInDays(1) }),
        // ✅ Future
        ...makeRecurringSlots({
          recurringDays: ['Mon', 'Thu'],
          times: [{ time: '12:00', cutoff: '11:00', inventory: 15 }],
          weeks: 2,
        }).slice(0, 2),
      ],
      
      menuRating: { avg: 4.5, count: 32 },
      soldCount: 88
    },

    // ⏳ m005: Pending — no slots (waiting for approval)
    {
      id: 'm005',
      name: 'Nasi Kerabu Vegan',
      description: 'Plant-based version: tempeh, jackfruit, vegan budu',
      basePrice: 14.0,
      image: null,
      status: 'pending',
      // openSlots: [], // intentionally empty
      menuRating: { avg: 0, count: 0 },
      soldCount: 0,
      customizationGroups: [
        {
          id: 'protein',
          name: 'Plant Protein',
          type: 'single',
          required: true,
          options: [
            { id: 'tempeh', name: 'Grilled Tempeh', price: 0.0, isDefault: true },
            { id: 'jackfruit', name: 'Shredded Jackfruit', price: 0.0 },
          ]
        }
      ]
    },

    // ❌ m006: Rejected — with feedback
    {
      id: 'm006',
      name: 'Nasi Kerabu with Seafood',
      description: 'Includes prawns and squid — *needs halal cert*',
      basePrice: 22.0,
      image: null,
      status: 'rejected',
      rejectionDate: '2025-12-06',
      rejectionReason: 'Requires halal certification for seafood sourcing. Resubmit with proof.',
      // openSlots: [],
      menuRating: { avg: 0, count: 0 },
      soldCount: 0
    },

    // ✅ m007: Approved — **only one slot, tomorrow**, no recurrence
    {
      id: 'm007',
      name: 'Nasi Kerabu Trial (One-off)',
      description: 'Test batch — limited to 10 portions',
      basePrice: 10.0,
      image: null,
      status: 'approved',
      approvalDate: '2025-12-07',
      approvalNotes: 'One-time trial, no recurring',
      
      openSlots: [
        makeSlot({ time: '15:00', cutoff: '14:00', inventory: 10, date: dateInDays(1) })
      ],
      
      menuRating: { avg: 0, count: 0 },
      soldCount: 0
    },

    // ✅ m008: Approved — **all past slots** (for analytics/history view)
    {
      id: 'm008',
      name: 'Nasi Kerabu Raya Special',
      description: 'Festive version with rendang and ketupat (Ramadan)',
      basePrice: 25.0,
      image: null,
      status: 'approved',
      approvalDate: '2025-02-01',
      approvalNotes: 'Seasonal item',
      
      openSlots: [
        makeSlot({ time: '10:00', cutoff: '09:00', inventory: 0, date: '2025-03-30', status: 'completed' }),
        makeSlot({ time: '14:00', cutoff: '13:00', inventory: 0, date: '2025-03-31', status: 'completed' }),
        makeSlot({ time: '10:00', cutoff: '09:00', inventory: 0, date: '2025-04-01', status: 'completed' }),
      ],
      
      menuRating: { avg: 4.9, count: 112 },
      soldCount: 298
    },

    // ✅ m009: Approved — **no open slots yet** (menu approved, but vendor hasn’t scheduled)
    {
      id: 'm009',
      name: 'Nasi Kerabu Soup Version',
      description: 'Deconstructed as warm soup with blue rice dumplings',
      basePrice: 13.0,
      image: null,
      status: 'approved',
      approvalDate: '2025-12-08',
      approvalNotes: 'Creative! Approved. Schedule slots when ready.',
      
      openSlots: [], // ✅ valid — vendor may add later
      
      menuRating: { avg: 0, count: 0 },
      soldCount: 0
    },

    // ✅ m010: Approved — **highly customizable**, recurring, future only
    {
      id: 'm010',
      name: 'Build-Your-Own Nasi Kerabu',
      description: 'Choose base, protein, ulam, sambal, and extras',
      basePrice: 15.0,
      image: null,
      status: 'approved',
      approvalDate: '2025-12-09',
      approvalNotes: 'Complex but clear UI — approved',
      
      openSlots: makeRecurringSlots({
        recurringDays: ['Mon', 'Wed', 'Fri'],
        times: [
          { time: '18:00', cutoff: '16:00', inventory: 10 }, // longer prep
          { time: '20:00', cutoff: '18:00', inventory: 8 },
        ],
        weeks: 2,
      }),
      
      menuRating: { avg: 0, count: 0 },
      soldCount: 0,
      customizationGroups: [
        {
          id: 'base',
          name: 'Rice Base',
          type: 'single',
          required: true,
          options: [
            { id: 'blue', name: 'Blue Rice (Traditional)', price: 0.0, isDefault: true },
            { id: 'white', name: 'White Rice', price: 0.0 },
            { id: 'brown', name: 'Brown Rice', price: 1.0 }
          ]
        },
        {
          id: 'protein',
          name: 'Protein (choose up to 2)',
          type: 'multi',
          required: true,
          maxSelection: 2,
          options: [
            { id: 'ayam', name: 'Shredded Chicken', price: 0.0 },
            { id: 'ikan', name: 'Grilled Fish', price: 3.0 },
            { id: 'telur', name: 'Hard Boiled Egg', price: 2.0 },
            { id: 'tofu', name: 'Fried Tofu', price: 1.0 }
          ]
        },
        {
          id: 'ulam',
          name: 'Ulam Mix',
          type: 'multi',
          required: false,
          options: [
            { id: 'cucumber', name: 'Cucumber', price: 0.0 },
            { id: 'bean', name: 'Long Beans', price: 0.0 },
            { id: 'shiso', name: 'Shiso Leaves', price: 0.5 }
          ]
        },
        {
          id: 'sambal',
          name: 'Sambal',
          type: 'single',
          required: true,
          options: [
            { id: 'budu', name: 'Budu Sambal (Classic)', price: 0.0, isDefault: true },
            { id: 'belacan', name: 'Belacan Sambal', price: 0.0 },
            { id: 'sambalhijau', name: 'Green Chili Sambal', price: 0.0 }
          ]
        }
      ]
    }
  ]
},
  // 🥟 VENDOR 2: Capatees Brother — Weekend only
  {
    id: 'v002',
    name: 'Capatees Brother',
    location: 'Bukit Rahman Putra',
    lat: 3.245,
    lng: 101.5921,
    distance: 5.3,
    rating: { avg: 4.7, count: 89 },
    delivery: { self: true, radius_km: 6, fee: { base: 5.0, min_order_free: 50.0 } },
    pickup: true,
    status: 'active',
    
    menus: [
      {
        id: 'm005',
        name: 'Beef Curry Capati',
        description: 'Whole wheat chapati with rich beef curry',
        basePrice: 28.0,
        image: 'capatibeef.jpeg',
        status: 'approved',
        openSlots: [
          // ✅ Show "later today" if Saturday and before 14:00, else next Sat
          (() => {
            const todayStr = dateInDays(0);
            const todayName = getDayName(todayStr);
            if (todayName === 'Sat') {
              const nowHour = mockNow.getHours();
              if (nowHour < 14) {
                return makeSlot({ day: 'Sat', time: '14:00', cutoff: '13:00', inventory: 6, date: todayStr });
              }
            }
            // else fallback: next Sat
            return makeSlot({ day: 'Sat', time: '09:00', cutoff: '08:00', inventory: 8, date: dateInDays(7 - mockNow.getDay() || 7) });
          })(),
          
          // + Recurring future
          ...makeRecurringSlots({
            recurringDays: ['Sat'],
            times: [
              { time: '09:00', cutoff: '08:00', inventory: 8 },
              { time: '14:00', cutoff: '13:00', inventory: 6 },
            ],
            weeks: 3,
          }).slice(2) // skip first 2 to avoid dupes
        ],
        menuRating: { avg: 4.9, count: 45 },
        soldCount: 78
      }
    ]
  },

  // 🍔 VENDOR 3: Smashing Burger — Fri-Sat (show past + future)
  {
    id: 'v003',
    name: 'Smashing Burger',
    location: 'Section 17, Petaling Jaya',
    lat: 3.1167,
    lng: 101.6333,
    distance: 3.1,
    rating: { avg: 4.6, count: 156 },
    delivery: { self: true, radius_km: 4, fee: { base: 3.5 } },
    pickup: true,
    status: 'active',
    
    menus: [
      {
        id: 'm009',
        name: 'Smash Burger Regular',
        basePrice: 12.0,
        image: 'smashburger.jpg',
        status: 'approved',
        openSlots: [
          // ❌ Past completed
          makeSlot({ time: '18:00', cutoff: '17:00', inventory: 0, date: dateInDays(-3), status: 'completed' }),
          makeSlot({ time: '21:00', cutoff: '20:00', inventory: 0, date: dateInDays(-3), status: 'completed' }),
          
          // ✅ Next Fri/Sat
          ...makeRecurringSlots({
            recurringDays: ['Fri', 'Sat'],
            times: [
              { time: '18:00', cutoff: '17:00', inventory: 20 },
              { time: '21:00', cutoff: '20:00', inventory: 15 },
            ],
            weeks: 2,
          })
        ],
        menuRating: { avg: 4.5, count: 87 },
        soldCount: 145
      }
    ]
  }
];