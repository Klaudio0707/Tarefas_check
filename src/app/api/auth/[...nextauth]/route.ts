import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Configuração do NextAuth, onde você define os provedores e outras opções
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin", 
  },
});

// Exporta os handlers para os métodos HTTP GET e POST
export { handler as GET, handler as POST };