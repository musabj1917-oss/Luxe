import { NextRequest, NextResponse } from 'next/server'
import { verifyPayment } from '@/lib/chapa'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tx_ref = searchParams.get('tx_ref')

    if (!tx_ref) {
      return NextResponse.json({ message: 'Missing transaction reference' }, { status: 400 })
    }

    const result = await verifyPayment(tx_ref)

    if (result.status === 'success') {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/?payment=success`
      )
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/checkout?payment=failed`
    )
  } catch (error: any) {
    console.error('Verification error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/checkout?payment=error`
    )
  }
}
