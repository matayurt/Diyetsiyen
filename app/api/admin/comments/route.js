// app/api/admin/comments/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET() {
  try {
    await dbConnect();
    const comments = await Comment.find({ status: { $ne: "rejected" } }) // rejected olmayanları getir
      .select("name email comment rating status createdAt")
      .sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    if (!body._id) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    if (body.status === "rejected") {
      const deletedComment = await Comment.findByIdAndDelete(body._id);
      if (!deletedComment) {
        return NextResponse.json(
          { error: "Comment not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: "Comment deleted successfully" });
    }

    const comment = await Comment.findByIdAndUpdate(
      body._id,
      { status: body.status },
      { new: true }
    );

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
