// app/api/comments/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";

// Force dynamic
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await dbConnect();

    const comments = await Comment.find({ status: "approved" })
      .select("name comment rating createdAt")
      .sort({ createdAt: -1 })
      .limit(3);

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

async function verifyRecaptcha(token) {
  try {
    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const recaptchaResult = await recaptchaResponse.json();
    return recaptchaResult.success;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // reCAPTCHA doğrulama
    const recaptchaToken = body.recaptchaToken;
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "reCAPTCHA doğrulaması gerekli" },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
            Pragma: "no-cache",
          },
        }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: "reCAPTCHA doğrulaması başarısız" },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
            Pragma: "no-cache",
          },
        }
      );
    }

    // Rating doğrulama
    const rating = parseInt(body.rating);
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
            Pragma: "no-cache",
          },
        }
      );
    }

    await dbConnect();

    // Input validation
    if (!body.name?.trim() || !body.email?.trim() || !body.comment?.trim()) {
      return NextResponse.json(
        { error: "Name, email and comment are required" },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store",
            Pragma: "no-cache",
          },
        }
      );
    }

    const comment = await Comment.create({
      name: body.name.trim(),
      email: body.email.trim(),
      comment: body.comment.trim(),
      rating: rating,
      status: "pending",
    });

    return NextResponse.json(comment, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("POST Error:", error);
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

// OPTIONS metodu için CORS desteği
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "no-store",
      },
    }
  );
}
