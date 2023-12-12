import { emojis } from "@/lib/emojis.js";
import { NextResponse } from "next/server.js";

export function GET() {
  return NextResponse.json({ success: true, emojis });
}
//route: http://localhost:3000/api/emojis

//Route for POST: http://localhost:3000/api/emojis
export async function POST(request, response) {
  //need emoji from client
  //access json they sent in the body of their request
  try {
    const { character, name } = await request.json();
    //add code to check that emoji is added in character - chatgpt
    if (!character || !name) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name & character",
      });
    }
    const emoji = { id: emojis.length + 1, character, name };

    emojis.push(emoji);
    return NextResponse.json({ success: true, emoji });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
