# NextJS-Redux-NodeJS-MongoDB-Ecommerce

+ An Ecommerce Website with Next.JS, Redux, Node.JS and MongoDB

This is a full-stack project implemented using libraries such as NodeMailer, Multer, styled-components, and many more.
Sensitive data such as user address, zip code, and private and public keys will be encrypted upon saving in the database and will be decrypted when needed using the aes-256-gcm cryptography method via cryptr library. Furthermore, the user password will be encrypted using bcrypt one-way encryption library.

The authentication system is more secure and featured than the previous project I've done. It includes google RECAPTCHA and a two-step verification feature that works with the Google Authenticator app. After 5 hours since successful login, the system logs out automatically.

For login with SMS, I used MeliPayamak service which is an Iranian messaging service company. Users have 2 minutes to enter the received code for successful login. 
For login with OTP, the user has 2 minutes to click the received link via email for successful login.

User can filter products by category and search their titles, write reviews and rate each product. Through the dashboard, Admin can manage products, comments, and orders.
I implemented an internal ticketing system so the admin and user can send messages and files to each other.

Admin can set coupon code, tax, and up to 10 shipping methods in the dashboard.

![Features](https://raw.githubusercontent.com/mojtabamoradli/NextJS-Redux-NodeJS-MongoDB-Ecommerce/main/cover.png)

# How to use
```diff
+ Download / Clone Project
+ 🕹 cd to the project folders
+ Enter your keys and ids in .env files
+ 🕹 Run: npm run dev
+ voilà 🤌🏼
```

Enjoy 🚀
