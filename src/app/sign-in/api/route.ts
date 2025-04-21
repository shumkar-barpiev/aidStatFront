import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

function toCamelCase(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1).replace(/[-](\w)/g, (_, c) => c.toUpperCase());
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  try {
    const body = await request.json();
    const { username, password } = body;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/aidstat/callback`;
    const response = NextResponse.json({});

    const authReq = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!authReq.ok) {
      return NextResponse.json(
        {
          status: -1,
          data: {
            message: "Authentication failed",
          },
        },
        { status: authReq.status }
      );
    }

    const cookies = authReq.headers.getSetCookie();
    cookies.map((cookie) => {
      const parts = cookie.split(";").map((part) => part.trim());
      const [namePart, ...attributeParts] = parts;

      const [name, value] = namePart.split("=");

      const result: ResponseCookie & Record<string, string | boolean> = {
        name,
        value,
      };

      attributeParts.forEach((part) => {
        const [key, val] = part.split("=");
        result[toCamelCase(key)] = val !== undefined ? val : true;
      });

      cookieStore.set(result);
    });

    const csrf = cookieStore.get("CSRF-TOKEN");
    const session = cookieStore.get("JSESSIONID");
    const remember = cookieStore.get("rememberMe");
    csrf ? response.cookies.set({ ...csrf, path: "/" }) : null;
    session ? response.cookies.set({ ...session, path: "/" }) : null;
    remember ? response.cookies.set({ ...remember, path: "/" }) : null;

    return response;
  } catch (error: any) {
    return NextResponse.json({
      status: -1,
      data: {
        message: error?.message || "Internal Server Error",
      },
    });
  }
}
