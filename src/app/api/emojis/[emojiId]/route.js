import { emojis } from "@/lib/emojis.js";
//import { request } from "express";
import { NextResponse } from "next/server.js";

export function GET(request, response) {
  const { emojiId } = response.params; //because [emojis] is in bracket folder
  const emoji = emojis.filter((emoji) => emoji.id === +emojiId)[0];
  if (!emoji) {
    return NextResponse.json({
      success: false,
      message: "No emoji with that ID found.",
    });
  }
  return NextResponse.json({ success: true, emoji });
}
//route: http://localhost:3000/api/emojis/1

//delete route: http://localhost:3000/api/emojis/1
export function DELETE(request, response) {
  try {
    //return NextResponse.json({ message: "Hello" });
    const { emojiId } = response.params;
    const emojiIndex = emojis.findIndex((emoji) => emoji.id === +emojiId);

    if (emojiIndex === -1) {
      return NextResponse.json({
        success: false,
        message: "No emoji with that ID found.",
      });
    }
    emojis.splice(emojiIndex, 1);
    return NextResponse.json({ success: true, emojis });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

//update
//PUT Rounte - http://localhost:3000/api/emojis/1
export async function PUT(request, response) {
  try {
    const { emojiId } = response.params;
    const { character, name } = await request.json();
    //const emoji = emojis.findIndex((emoji) => emoji.id === +emojiId);

    const emojiIndex = emojis.findIndex((emoji) => emoji.id === +emojiId);

    if (emojiIndex === -1) {
      return NextResponse.json({
        success: false,
        error: "Emoji not found.",
      });
    }

    if (!character || !name) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name and character to update an emoji.",
      });
    }

    emojis[emojiIndex].name = name;
    emojis[emojiIndex].character = character;

    return NextResponse.json({ success: true, emojis });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
