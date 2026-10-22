/* =========================================================
   DYNASTYVAULT — WEBSITE SETTINGS
   Nabu: sirf is file mein apni details bharo. Website, app aur
   Terms/Privacy/Refund pages sab yahin se padhte hain.
   (Quotes '...' ke andar likhna, baaki kuch mat chhedna.)
   ========================================================= */
window.DV_CONFIG = {
  upi: '',                   // apna UPI ID — jaise 'nabu@okicici'  (GPay / PhonePe / Paytm → Profile → UPI ID)
  payee: 'DynastyVault',     // UPI app mein customer ko yeh naam dikhega
  whatsapp: '',              // apna WhatsApp number, 91 ke saath, bina + aur space — jaise '919876543210'
  email: '',                 // support email — jaise 'hello@dynastyvault.in' ya apna Gmail
  owner: '',                 // aapka poora naam (Terms / Refund page pe dikhta hai — payment ke liye zaroori)
  city: '',                  // shehar aur state — jaise 'Dehradun, Uttarakhand'
  server: '',                // Render wale server ka link (SERVER-SETUP.txt) — jaise 'https://dynastyvault.onrender.com'
                             //   isse: customer ke phone pe automatic voice clone + pakke unlock codes (admin page server se code banata hai)
  paypal: '',                // DUNIYA BHAR SE PAYMENT: apna PayPal.me naam — jaise 'naburawat' (paypal.me/naburawat)
                             //   bahar ke customer QR scan karke card/PayPal se apni currency mein pay karte hain, aapko rupaye milte hain
  razorpay: {               // ⭐ EK SCANNER INDIA + DUNIYA: Razorpay Payment Page ke links (PEHLE-PADHO → Step 1)
    royal: '',               //   jaise 'https://rzp.io/rzp/abcd'  — Royal ₹999 wala page
    voicepack: '',           //   Voice Story Pack ₹99
    gift: '',                //   Gift Box ₹1,499
    any: ''                  //   koi bhi amount wala page (baaki sab ke liye)
  },                         //   bahar ke liye alag dollar page ho toh: royal_usd: 'https://rzp.io/rzp/xyz'
  secret: 'dv-change-this-to-any-long-word',   // unlock code ka secret — koi bhi lamba shabd likh do, kisi ko mat batana
  adminPin: '2468',          // admin page (app.html#admin) ka PIN — badal do
  demo: false                // true = "Try Royal free (demo)" button dikhega — sirf testing ke liye
};
