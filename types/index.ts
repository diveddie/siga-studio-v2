export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  tokens?: number
  type: string
  response?: {
    usage: {
      total_tokens: number
      input_tokens: number
      output_tokens: number
    }
  }
} 
