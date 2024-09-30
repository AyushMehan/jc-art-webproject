import { NextResponse } from 'next/server';

let comments = []; 


export async function GET() {
  return NextResponse.json(comments);
}

// Handle POST requests
export async function POST(req) {
  const { text, replyTo } = await req.json();
  const newComment = { id: comments.length + 1, text, replies: [] };

  if (replyTo) {
    const parentComment = comments.find(c => c.id === replyTo);
    if (parentComment) {
      parentComment.replies.push(newComment);
    }
  } else {
    comments.push(newComment);
  }

  return NextResponse.json(newComment, { status: 201 });
}
