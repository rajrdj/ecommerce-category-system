// src/lib/utils/api-response.ts
import { NextResponse } from 'next/server';

export function generateApiResponse(
  data: any = null,
  message: string = '',
  status: number = 200
) {
  return NextResponse.json(
    {
      success: status < 400,
      data,
      message,
    },
    { status }
  );
}

