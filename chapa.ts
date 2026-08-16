const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || ''
const CHAPA_API_URL = 'https://api.chapa.co/v1'

export interface ChapaInitiateRequest {
  amount: number
  currency: string
  email: string
  first_name: string
  last_name: string
  tx_ref: string
  callback_url?: string
  return_url?: string
  customization?: {
    title?: string
    description?: string
    logo?: string
  }
}

export interface ChapaInitiateResponse {
  message: string
  status: string
  data: {
    checkout_url: string
  }
}

export async function initiatePayment(data: ChapaInitiateRequest): Promise<ChapaInitiateResponse> {
  const response = await fetch(`${CHAPA_API_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Payment initiation failed')
  }

  return response.json()
}

export async function verifyPayment(txRef: string) {
  const response = await fetch(`${CHAPA_API_URL}/transaction/verify/${txRef}`, {
    headers: {
      'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error('Payment verification failed')
  }

  return response.json()
}
