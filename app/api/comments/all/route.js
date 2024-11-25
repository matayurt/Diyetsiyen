// app/api/comments/all/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET() {
  try {
    await dbConnect();
    const comments = await Comment.find({ status: "approved" })
      .select("name comment rating createdAt")
      .sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
