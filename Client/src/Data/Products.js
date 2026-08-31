  // src/data/products.js
  import iPhone13Pro from "../Assests/iPhone13Pro.png"
  import samsungS22 from "../Assests/samsung-s22.png";
  import oneplus11 from "../Assests/oneplus11.jpg";
  import iphone13Screen from "../Assests/iphone13_screen.jpg";
  import galaxys22Battery from "../Assests/galaxys22_battery.jpg";
  import oneplus11Camera from "../Assests/oneplus11_camera.webp";
  import earbuds from "../Assests/earbuds.png";
  import wirelessCharger from "../Assests/wirelessCharger.jpg";
  import iphone13Case from "../Assests/iphone13case.webp";
  import screenProtector from "../Assests/screen-protector.png";


  // Placeholder images should go in src/assets/images folder
  export const phones = [
    {
      name: "iPhone 13 Pro",
      brand: "Apple",
      price: 999,
      condition: "New",
      img: iPhone13Pro,

      specs: {
        storage: "256GB",
        ram: "6GB",
        screen: "6.1 inch",
        battery: "3095 mAh"
      }
    },
    {
      name: "Samsung Galaxy S22",
      brand: "Samsung",
      price: 899,
      condition: "New",
      img: samsungS22,
      specs: {
        storage: "128GB",
        ram: "8GB",
        screen: "6.2 inch",
        battery: "3700 mAh"
      }
    },
    {
      name: "OnePlus 11",
      brand: "OnePlus",
      price: 749,
      condition: "Refurbished",
      img: oneplus11,
      specs: {
        storage: "256GB",
        ram: "12GB",
        screen: "6.7 inch",
        battery: "5000 mAh"
      }
    }
  ];

  export const parts = [
    {
      name: "iPhone 13 Pro Screen",
      brand: "Apple",
      price: 199,
      img: iphone13Screen,
      compatible: ["iPhone 13 Pro"]
    },
    {
      name: "Samsung Galaxy S22 Battery",
      brand: "Samsung",
      price: 49,
      img: galaxys22Battery,
      compatible: ["Samsung Galaxy S22"]
    },
    {
      name: "OnePlus 11 Camera",
      brand: "OnePlus",
      price: 89,
      img: oneplus11Camera,
      compatible: ["OnePlus 11"]
    }
  ];

  export const accessories = [
    {
      name: "iPhone 13 Case",
      brand: "Apple",
      price: 29,
      img: iphone13Case,
      category: "Case"
    },
    {
      name: "Wireless Charger",
      brand: "Generic",
      price: 19,
      img: wirelessCharger,
      category: "Charger"
    },
    {
      name: "Screen Protector",
      brand: "Generic",
      price: 9,
      img: screenProtector,
      category: "Protector"
    },
    {
      name: "Wireless Earbuds",
      brand: "Generic",
      price: 49,
      img: earbuds,
      category: "Audio"
    }
  ];
