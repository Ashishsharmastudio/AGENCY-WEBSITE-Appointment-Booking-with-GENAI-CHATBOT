# 📧 Gmail Email Setup Guide

To receive email notifications when someone submits your contact form, you need to set up Gmail SMTP credentials.

## 🔧 Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled

## 🔑 Step 2: Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on **2-Step Verification**
3. Scroll down and click **App passwords**
4. Select **Mail** as the app
5. Select **Other (custom name)** and type "Velosphere Contact Form"
6. Click **Generate**
7. **Copy the 16-character password** (you'll need this)

## 📁 Step 3: Create Environment File

Create a file named `.env.local` in your project root with the following content:

```env
# Gmail Configuration for Contact Form
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password

# Example:
# EMAIL_USER=ishantsaini22@gmail.com
# EMAIL_PASS=abcd efgh ijkl mnop
```

## ⚠️ Important Notes

- **Never commit `.env.local` to git** (it's already in .gitignore)
- Use your **actual Gmail address** for EMAIL_USER
- Use the **16-character app password** (not your regular Gmail password)
- Remove spaces from the app password when pasting

## 🧪 Step 4: Test the Setup

1. Restart your development server: `npm run dev`
2. Go to your contact form and submit a test message
3. Check your Gmail inbox for the notification email
4. The customer will also receive an auto-reply email

## 🎯 What You'll Receive

When someone submits your contact form, you'll get:

1. **Notification Email** - Contains all form details with a "Reply Now" button
2. **Customer Auto-Reply** - Professional thank you email sent to the customer

## 🔍 Troubleshooting

If emails aren't sending:

1. Check that `.env.local` file exists and has correct credentials
2. Verify the app password is correct (no spaces)
3. Make sure 2FA is enabled on your Gmail account
4. Check the server console for error messages
5. Try generating a new app password

## 📱 Alternative: Use a Different Email Service

If you prefer not to use Gmail, you can use:
- **SendGrid** (free tier available)
- **Mailgun** (free tier available)  
- **Amazon SES** (very cheap)
- **Outlook/Hotmail** (similar setup)

Just update the transporter configuration in `src/app/api/contact/route.ts`

