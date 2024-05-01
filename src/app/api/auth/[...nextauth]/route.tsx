import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg";
import {Adapter} from "next-auth/adapters";

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: {
        rejectUnauthorized: false,

    },

})

const handler = NextAuth({

    adapter: PostgresAdapter(pool) as Adapter,
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret : process.env.GOOGLE_CLIENT_SECRET ??"",

        },)
    ],
 secret : process.env.NEXTAUTH_SECRET,


    callbacks: {

        async session({ session, user }: any) {

            // user id is stored in ._id when using google provider
            if (user.id ) session.user.id = user.id;

           // if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
         //   console.log("USER");
        //    console.log(user.id);
            return session;
        },


    }

});
export {handler as GET, handler as POST};