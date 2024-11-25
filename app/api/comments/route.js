// app/api/comments/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET() {
  try {
    await dbConnect();
    const comments = await Comment.find({ status: "approved" })
      .select("name comment rating createdAt")
      .sort({ createdAt: -1 })
      .limit(3);
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
        { status: 400 }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: "reCAPTCHA doğrulaması başarısız" },
        { status: 400 }
      );
    }

    // Rating doğrulama
    const rating = parseInt(body.rating);
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    await dbConnect();
    const comment = await Comment.create({
      name: body.name,
      email: body.email,
      comment: body.comment,
      rating: rating,
      status: "pending",
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
