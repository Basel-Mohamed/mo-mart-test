// import { getUserToken } from "@/components/Helpers/getUserToken";
// import { CartResponse } from "@/interfaces";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const token = await getUserToken();

//   const response = await fetch(`${process.env.URL_API}/cart`, {
//     method: "GET",
//     headers: {
//       token: token + "",
//     },
//   });
//   const data: CartResponse = await response.json();
//   return NextResponse.json(data);
// }

import { getUserToken } from "@/components/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ statusMsg: "fail", message: "No token found" }, { status: 401 });
  }

  const response = await fetch(`${process.env.URL_API}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
