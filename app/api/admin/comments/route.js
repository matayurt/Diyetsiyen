import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";

// Force dynamic
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await dbConnect();

    const comments = await Comment.find({ status: { $ne: "rejected" } })
      .select("name email comment rating status createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json(comments, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      }
    );
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

    // Rejected yorumları sil
    if (body.status === "rejected") {
      const deletedComment = await Comment.findByIdAndDelete(body._id);

      if (!deletedComment) {
        return NextResponse.json(
          { error: "Comment not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Comment deleted successfully" },
        {
          headers: {
            "Cache-Control": "no-store",
            Pragma: "no-cache",
          },
        }
      );
    }

    // Diğer durum güncellemeleri
    const comment = await Comment.findByIdAndUpdate(
      body._id,
      { status: body.status },
      { new: true }
    );

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(comment, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      }
    );
  }
}

// OPTIONS metodu için CORS desteği
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "no-store",
      },
    }
  );
}
