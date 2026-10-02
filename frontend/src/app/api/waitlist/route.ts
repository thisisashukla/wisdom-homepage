import { captureLead } from '../../../lib/lead-capture.ts'

export async function POST(req: Request) {
  return captureLead(req, 'waitlist')
}
