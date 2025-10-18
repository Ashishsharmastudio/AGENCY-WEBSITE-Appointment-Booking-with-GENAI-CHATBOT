import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      // Allow only specific emails for admin access (configured via environment variables)
      const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
      
      if (account?.provider === "google") {
        return allowedEmails.includes(user.email || "");
      }
      return false;
    },
  },
});

export { handler as GET, handler as POST };
