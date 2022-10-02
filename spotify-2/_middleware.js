import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // Token bude existovat, pokud je uživatel přihlášený 
    const token = await getToken({ req, secret: process.env.JWT_SECRET }); // kontrola tokenu (žádosti uživatele poslané na server)
    const {pathname} = req.nextUrl; // {x} => "destrukce" vlastnosti objektu na proměnné

    // Povolení požadavků, pokud následující podmínky jsou splněny
    // 1) Je to žádost na next-auth session a na provider fetching (autentizovaná žádost)
    // 2) Pokud token existuje
    if (pathname.includes('/api/auth') || token){
        return NextResponse.next(); // bezproblémový průběh => pokračování dál
    }
        
    
    // Přesměřování uživatele na Login page, pokud nemají token a požadují "chráněnou cestu"
    if (!token && pathname !== '/login'){
        return NextResponse.redirect("/login");
    }
        
}